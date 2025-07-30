import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  AccountInfo
} from '@solana/web3.js';

import { 
  TOKEN_PROGRAM_ID, 
  createCloseAccountInstruction,
  createBurnInstruction
} from '@solana/spl-token';

import bs58 from 'bs58';
import { WalletInfo, RentCollectionResult, RentCollectionSummary, ProcessingProgress } from '../types';
import { WalletManager } from '../utils/wallet-manager';

// Token-2022 Program ID
const TOKEN_2022_PROGRAM_ID = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');

export class RentCollector {
  private connection: Connection;
  private walletManager: WalletManager;
  private readonly BATCH_SIZE = 10; // Helius has high rate limits, so we can process more wallets per batch
  private feePayerKeypair: Keypair | null = null;

  constructor(rpcUrl: string, walletManager: WalletManager) {
    this.connection = new Connection(rpcUrl, 'confirmed');
    this.walletManager = walletManager;
  }

  /**
   * Set the fee payer wallet (should have SOL for transaction fees)
   */
  setFeePayer(feePayerPrivateKey: string): void {
    this.feePayerKeypair = Keypair.fromSecretKey(bs58.decode(feePayerPrivateKey));
    console.log(`Fee payer set to: ${this.feePayerKeypair.publicKey.toString()}`);
  }

  /**
   * Sleep function for rate limiting
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retry function with exponential backoff
   */
  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error: any) {
        if (attempt === maxRetries) {
          throw error;
        }

        // Check if it's a rate limit error
        if (error.message && (error.message.includes('429') || error.message.includes('Too Many Requests'))) {
          const delay = baseDelay * Math.pow(2, attempt);
          console.log(`Rate limited (attempt ${attempt + 1}/${maxRetries + 1}). Waiting ${delay}ms before retry...`);
          await this.sleep(delay);
          continue;
        }

        // For other errors, throw immediately
        throw error;
      }
    }
    throw new Error('Max retries exceeded');
  }

  /**
   * Calculate rent-exempt balance for an account
   */
  private async calculateRentExemptBalance(accountInfo: AccountInfo<Buffer>): Promise<number> {
    const dataSize = accountInfo.data.length;
    const rentExemptionAmount = await this.connection.getMinimumBalanceForRentExemption(dataSize);
    return rentExemptionAmount;
  }

  /**
   * Check if an account can be closed (has rent to collect)
   */
  private canCloseAccount(balance: number, _rentExemptBalance: number): boolean {
    // For token accounts, we can always close them and recover the full balance
    // The rent calculation is different for token accounts vs regular accounts
    return balance > 1000; // Minimum threshold: 0.000001 SOL to avoid tiny amounts
  }

  /**
   * Calculate rent amount that can be collected
   */
  private calculateRentAmount(balance: number, _rentExemptBalance: number): number {
    // For token accounts, we can recover the full balance when closing
    return balance;
  }

  /**
   * Get all token accounts for a wallet (both SPL and Token-2022)
   */
  private async getTokenAccounts(walletPublicKey: PublicKey): Promise<Array<{
    pubkey: PublicKey;
    account: AccountInfo<Buffer>;
    programId: PublicKey;
  }>> {
    const tokenAccounts: Array<{
      pubkey: PublicKey;
      account: AccountInfo<Buffer>;
      programId: PublicKey;
    }> = [];

    try {
      // Get SPL token accounts
      const splTokenAccounts = await this.retryWithBackoff(async () => {
        return await this.connection.getTokenAccountsByOwner(walletPublicKey, {
          programId: TOKEN_PROGRAM_ID
        });
      });

      for (const tokenAccount of splTokenAccounts.value) {
        tokenAccounts.push({
          pubkey: tokenAccount.pubkey,
          account: tokenAccount.account,
          programId: TOKEN_PROGRAM_ID
        });
      }

      // Get Token-2022 accounts
      const token2022Accounts = await this.retryWithBackoff(async () => {
        return await this.connection.getTokenAccountsByOwner(walletPublicKey, {
          programId: TOKEN_2022_PROGRAM_ID
        });
      });

      for (const tokenAccount of token2022Accounts.value) {
        tokenAccounts.push({
          pubkey: tokenAccount.pubkey,
          account: tokenAccount.account,
          programId: TOKEN_2022_PROGRAM_ID
        });
      }

    } catch (error) {
      console.error('Error fetching token accounts:', error);
    }

    return tokenAccounts;
  }

  /**
   * Close a single token account and recover rent
   */
  private async closeTokenAccount(
    tokenAccountPubkey: PublicKey,
    ownerKeypair: Keypair,
    destinationPubkey: PublicKey
  ): Promise<{ success: boolean; rentRecovered: number; error?: string }> {
    try {
      // Get account info to determine rent and token amount
      const accountInfo = await this.retryWithBackoff(async () => {
        return await this.connection.getAccountInfo(tokenAccountPubkey);
      });

      if (!accountInfo) {
        return {
          success: false,
          rentRecovered: 0,
          error: 'Token account not found'
        };
      }

      const rentRecovered = accountInfo.lamports;
      console.log(`  Token account ${tokenAccountPubkey.toString()} balance: ${rentRecovered / LAMPORTS_PER_SOL} SOL`);

      // Determine which program this account belongs to
      let programId: PublicKey;
      if (accountInfo.owner.equals(TOKEN_PROGRAM_ID)) {
        programId = TOKEN_PROGRAM_ID;
      } else if (accountInfo.owner.equals(TOKEN_2022_PROGRAM_ID)) {
        programId = TOKEN_2022_PROGRAM_ID;
      } else {
        return {
          success: false,
          rentRecovered: 0,
          error: `Account is not owned by a token program. Owner: ${accountInfo.owner.toString()}`
        };
      }

      // Parse token amount from account data
      let tokenAmount = 0;
      if (accountInfo && accountInfo.data.length >= 165) {
        tokenAmount = Number(accountInfo.data.readBigUInt64LE(64));
      }
      
      // Check if account has any tokens - if so, we'll burn them
      if (tokenAmount > 0) {
        console.log(`    Token account ${tokenAccountPubkey.toString()} has ${tokenAmount} tokens - will burn them before closing`);
      }

      // Create transaction with fee payer
      const transaction = new Transaction();
      
      // If account has tokens, burn them first
      if (tokenAmount > 0) {
        console.log(`    Burning ${tokenAmount} tokens from ${tokenAccountPubkey.toString()}`);
        
        // Parse mint from account data
        const mint = new PublicKey(accountInfo!.data.slice(0, 32));
        
        const burnInstruction = createBurnInstruction(
          tokenAccountPubkey,
          mint,
          ownerKeypair.publicKey,
          BigInt(tokenAmount),
          [],
          programId
        );
        transaction.add(burnInstruction);
      }
      
      // Create close account instruction with the correct program ID
      const closeInstruction = createCloseAccountInstruction(
        tokenAccountPubkey,
        destinationPubkey,
        ownerKeypair.publicKey,
        [],
        programId
      );
      
      transaction.add(closeInstruction);
      transaction.feePayer = this.feePayerKeypair!.publicKey;
      
      // Get recent blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      // Sign with both owner and fee payer
      transaction.sign(ownerKeypair, this.feePayerKeypair!);
      
      const signature = await this.retryWithBackoff(async () => {
        return await sendAndConfirmTransaction(
          this.connection,
          transaction,
          [ownerKeypair, this.feePayerKeypair!]
        );
      });

      console.log(`Successfully closed token account ${tokenAccountPubkey.toString()}`);
      console.log(`Transaction signature: ${signature}`);

      return {
        success: true,
        rentRecovered,
        error: undefined
      };
    } catch (error) {
      console.error(`Error closing token account ${tokenAccountPubkey.toString()}:`, error);
      return {
        success: false,
        rentRecovered: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Process a single wallet to find token accounts with rent (without closing them yet)
   */
  private async processSingleWallet(wallet: WalletInfo, walletIndex: number): Promise<WalletInfo> {
    const keypair = Keypair.fromSecretKey(bs58.decode(wallet.privateKey));
    const publicKey = keypair.publicKey;

    // Add small delay to avoid overwhelming the RPC
    await this.sleep(250);

    try {
      // Get wallet balance
      const walletBalance = await this.retryWithBackoff(async () => {
        return await this.connection.getBalance(publicKey);
      });

      console.log(`Wallet ${walletIndex + 1}: Balance = ${walletBalance / LAMPORTS_PER_SOL} SOL`);

      // Get all token accounts for this wallet
      const tokenAccounts = await this.getTokenAccounts(publicKey);
      
      let totalRentToCollect = 0;
      let tokenAccountsWithRent = 0;

      // Check each token account for rent
      for (const tokenAccount of tokenAccounts) {
        const accountInfo = tokenAccount.account;
        const balance = accountInfo.lamports;
        
        if (accountInfo.data) {
          const rentExemptBalance = await this.calculateRentExemptBalance(accountInfo);
          const rentAmount = this.calculateRentAmount(balance, rentExemptBalance);
          
          console.log(`  Token account ${tokenAccount.pubkey.toString()}: Balance=${balance / LAMPORTS_PER_SOL} SOL, Rent exempt=${rentExemptBalance / LAMPORTS_PER_SOL} SOL, Rent amount=${rentAmount / LAMPORTS_PER_SOL} SOL`);
          
          if (this.canCloseAccount(balance, rentExemptBalance)) {
            totalRentToCollect += rentAmount;
            tokenAccountsWithRent++;
            console.log(`  -> This token account has rent to collect: ${rentAmount / LAMPORTS_PER_SOL} SOL`);
          }
        }
      }

      const processedWallet: WalletInfo = {
        ...wallet,
        balance: walletBalance,
        rentExemptBalance: 0, // Not used for token accounts
        rentAmount: totalRentToCollect,
        canClose: totalRentToCollect > 0
      };

      this.walletManager.updateWalletInfo(walletIndex, walletBalance, 0, totalRentToCollect, totalRentToCollect > 0);

      if (totalRentToCollect > 0) {
        console.log(`Wallet ${walletIndex + 1}: ${publicKey.toString()} - ${tokenAccountsWithRent} token accounts with rent: ${totalRentToCollect / LAMPORTS_PER_SOL} SOL`);
      } else {
        console.log(`Wallet ${walletIndex + 1}: No token accounts with rent to collect`);
      }

      return processedWallet;
    } catch (error) {
      console.error(`Error processing wallet ${walletIndex + 1}:`, error);
      return wallet;
    }
  }

  /**
   * Analyze all wallets to find token accounts with rent
   */
  async analyzeWallets(progressCallback?: (progress: ProcessingProgress) => void): Promise<WalletInfo[]> {
    const wallets = this.walletManager.getWallets();
    const analyzedWallets: WalletInfo[] = [];

    console.log(`Analyzing ${wallets.length} wallets for token accounts with rent...`);

    // Process wallets in batches
    for (let i = 0; i < wallets.length; i += this.BATCH_SIZE) {
      console.log(`\n=== Processing batch ${Math.floor(i / this.BATCH_SIZE) + 1}/${Math.ceil(wallets.length / this.BATCH_SIZE)} ===`);
      
      const batch = wallets.slice(i, i + this.BATCH_SIZE);
      
      for (let j = 0; j < batch.length; j++) {
        const walletIndex = i + j;
        const wallet = batch[j];
        
        if (progressCallback) {
          progressCallback({
            current: walletIndex + 1,
            total: wallets.length,
            wallet: wallet.publicKey,
            status: 'Checking balance...'
          });
        }
        
        const result = await this.processSingleWallet(wallet, walletIndex);
        analyzedWallets.push(result);
        
        if (progressCallback) {
          progressCallback({
            current: walletIndex + 1,
            total: wallets.length,
            wallet: wallet.publicKey,
            status: result.canClose ? `Found ${(result.rentAmount || 0) / LAMPORTS_PER_SOL} SOL rent` : 'No rent found'
          });
        }
      }

      // Add delay between batches to avoid rate limiting
      if (i + this.BATCH_SIZE < wallets.length) {
        console.log(`Waiting 1.5 seconds before next batch...`);
        await this.sleep(1500); // 1.5 second delay between batches
      }
    }

    const walletsWithRent = analyzedWallets.filter(w => w.canClose);
    console.log(`\nFound ${walletsWithRent.length} wallets with token accounts that have rent to collect`);

    return analyzedWallets;
  }

  /**
   * Close all token accounts with rent using the fee payer
   */
  async closeAllTokenAccounts(progressCallback?: (progress: ProcessingProgress) => void): Promise<RentCollectionSummary> {
    if (!this.feePayerKeypair) {
      throw new Error('Fee payer not set. Call setFeePayer() first.');
    }

    const wallets = this.walletManager.getWallets();
    const results: RentCollectionResult[] = [];
    let totalRentRecovered = 0;
    let successfulClosures = 0;
    let failedClosures = 0;

    console.log('Starting token account closing process...');

    for (let i = 0; i < wallets.length; i++) {
      const wallet = wallets[i];
      
      if (wallet.canClose && wallet.rentAmount > 0) {
        const keypair = Keypair.fromSecretKey(bs58.decode(wallet.privateKey));
        const publicKey = keypair.publicKey;

        console.log(`\n--- Closing token accounts for Wallet ${i + 1} ---`);
        
        if (progressCallback) {
          progressCallback({
            current: i + 1,
            total: wallets.length,
            wallet: wallet.publicKey,
            status: 'Processing token accounts...'
          });
        }
        
        // Get token accounts for this wallet
        const tokenAccounts = await this.getTokenAccounts(publicKey);
        
        for (const tokenAccount of tokenAccounts) {
          const accountInfo = tokenAccount.account;
          const balance = accountInfo.lamports;
          
          if (accountInfo.data) {
            const rentExemptBalance = await this.calculateRentExemptBalance(accountInfo);
            const rentAmount = this.calculateRentAmount(balance, rentExemptBalance);
            
            if (this.canCloseAccount(balance, rentExemptBalance)) {
              console.log(`  Attempting to close token account ${tokenAccount.pubkey.toString()} (rent: ${rentAmount / LAMPORTS_PER_SOL} SOL)`);
              
              const closeResult = await this.closeTokenAccount(
                tokenAccount.pubkey,
                keypair,
                this.feePayerKeypair!.publicKey // Send rent to fee payer wallet
              );
              
              if (closeResult.success) {
                successfulClosures++;
                totalRentRecovered += closeResult.rentRecovered;
                console.log(`  -> Successfully closed and recovered ${closeResult.rentRecovered / LAMPORTS_PER_SOL} SOL`);
                
                if (progressCallback) {
                  progressCallback({
                    current: i + 1,
                    total: wallets.length,
                    wallet: wallet.publicKey,
                    status: `Collected ${closeResult.rentRecovered / LAMPORTS_PER_SOL} SOL`
                  });
                }
              } else {
                failedClosures++;
                console.log(`  -> Failed to close: ${closeResult.error}`);
              }
              
              // Add delay between closures
              await this.sleep(2000);
            } else {
              console.log(`  Skipping token account ${tokenAccount.pubkey.toString()} - cannot close (balance: ${balance / LAMPORTS_PER_SOL} SOL, rent exempt: ${rentExemptBalance / LAMPORTS_PER_SOL} SOL)`);
            }
          }
        }
      }
    }

    const summary: RentCollectionSummary = {
      totalWallets: wallets.length,
      successfulCollections: successfulClosures,
      totalRentCollected: totalRentRecovered,
      failedCollections: failedClosures,
      results
    };

    console.log('\n=== Token Account Closing Summary ===');
    console.log(`Total wallets processed: ${summary.totalWallets}`);
    console.log(`Successful closures: ${summary.successfulCollections}`);
    console.log(`Failed closures: ${summary.failedCollections}`);
    console.log(`Total rent recovered: ${summary.totalRentCollected / LAMPORTS_PER_SOL} SOL`);

    return summary;
  }

  /**
   * Transfer SOL from a wallet to the fee payer using fee payer for transaction fees
   */
  private async transferSolToFeePayer(
    fromKeypair: Keypair,
    amount: number
  ): Promise<{ success: boolean; amountTransferred: number; error?: string }> {
    try {
      if (!this.feePayerKeypair) {
        return {
          success: false,
          amountTransferred: 0,
          error: 'Fee payer not set'
        };
      }

      // Transfer the full amount since fee payer covers transaction fees
      const transferAmount = amount;
      
      if (transferAmount <= 0) {
        return {
          success: false,
          amountTransferred: 0,
          error: 'No SOL to transfer'
        };
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: this.feePayerKeypair.publicKey,
          lamports: transferAmount,
        })
      );

      transaction.feePayer = this.feePayerKeypair.publicKey;
      
      // Get recent blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      // Sign with both sender and fee payer
      transaction.sign(fromKeypair, this.feePayerKeypair);
      
      const signature = await this.retryWithBackoff(async () => {
        return await sendAndConfirmTransaction(
          this.connection,
          transaction,
          [fromKeypair, this.feePayerKeypair!]
        );
      });

      console.log(`Successfully transferred ${transferAmount / LAMPORTS_PER_SOL} SOL from ${fromKeypair.publicKey.toString()} to fee payer`);
      console.log(`Transaction signature: ${signature}`);

      return {
        success: true,
        amountTransferred: transferAmount,
        error: undefined
      };
    } catch (error) {
      console.error(`Error transferring SOL from ${fromKeypair.publicKey.toString()}:`, error);
      return {
        success: false,
        amountTransferred: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Process all wallets: close token accounts and transfer remaining SOL
   */
  async processAllWallets(progressCallback?: (progress: ProcessingProgress) => void): Promise<RentCollectionSummary> {
    if (!this.feePayerKeypair) {
      throw new Error('Fee payer not set. Call setFeePayer() first.');
    }

    // First, analyze wallets to find rent
    console.log('Step 1: Analyzing wallets for rent collection opportunities...');
    await this.analyzeWallets(progressCallback);

    // Then, close token accounts and collect rent
    console.log('Step 2: Closing token accounts and collecting rent...');
    const summary = await this.closeAllTokenAccounts(progressCallback);

    return summary;
  }
} 