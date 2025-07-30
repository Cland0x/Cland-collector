import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { WalletInfo } from '../types';

export class WalletManager {
  private wallets: WalletInfo[] = [];

  /**
   * Load private keys from file content (adapted for browser file input)
   * Supports multiple formats:
   * 1. Simple format: one private key per line
   * 2. Structured format: PRIVATE KEYS section, WALLET ADDRESSES section, or PRIVATE KEYS / ADDRESS pairs
   * 
   * @param fileContent Content of the wallet file
   * @param fileName Name of the file for logging
   * @param clearExisting If true, clears existing wallets before loading new ones
   */
  async loadWalletsFromContent(fileContent: string, fileName: string, clearExisting: boolean = false): Promise<WalletInfo[]> {
    try {
      if (clearExisting) {
        this.wallets = [];
      }

      const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

      let privateKeys: string[] = [];
      let walletAddresses: string[] = [];

      // Check if this is a structured format
      const hasPrivateKeysSection = fileContent.includes('PRIVATE KEYS:');
      const hasWalletAddressesSection = fileContent.includes('WALLET ADDRESSES:');
      const hasPrivateKeysAddressSection = fileContent.includes('PRIVATE KEYS / ADDRESS:');

      if (hasPrivateKeysSection || hasWalletAddressesSection || hasPrivateKeysAddressSection) {
        // Parse structured format
        let currentSection = '';
        
        for (const line of lines) {
          if (line === 'PRIVATE KEYS:' || line === 'WALLET ADDRESSES:' || line === 'PRIVATE KEYS / ADDRESS:') {
            currentSection = line;
            continue;
          }

          if (currentSection === 'PRIVATE KEYS:') {
            // Add to private keys if it looks like a base58 private key
            if (line.length >= 80 && line.length <= 90) {
              privateKeys.push(line);
            }
          } else if (currentSection === 'WALLET ADDRESSES:') {
            // Add to wallet addresses if it looks like a base58 public key
            if (line.length >= 40 && line.length <= 50) {
              walletAddresses.push(line);
            }
          } else if (currentSection === 'PRIVATE KEYS / ADDRESS:') {
            // Parse lines with format "privateKey publicKey" or similar
            const parts = line.split(/\s+/);
            if (parts.length >= 2) {
              const possiblePrivateKey = parts[0];
              const possiblePublicKey = parts[1];
              
              if (possiblePrivateKey.length >= 80 && possiblePrivateKey.length <= 90) {
                privateKeys.push(possiblePrivateKey);
              }
              if (possiblePublicKey.length >= 40 && possiblePublicKey.length <= 50) {
                walletAddresses.push(possiblePublicKey);
              }
            }
          }
        }
      } else {
        // Simple format - each line is either a private key or public key
        for (const line of lines) {
          // Skip empty lines and comments
          if (!line || line.startsWith('#') || line.startsWith('//')) {
            continue;
          }
          
          // Try to determine if this is a private key or public key by length
          if (line.length >= 80 && line.length <= 90) {
            // Likely a private key
            privateKeys.push(line);
          } else if (line.length >= 40 && line.length <= 50) {
            // Likely a public key
            walletAddresses.push(line);
          }
        }
      }

      // Convert private keys to wallet info
      for (const privateKey of privateKeys) {
        try {
          const keypair = Keypair.fromSecretKey(bs58.decode(privateKey));
          const publicKey = keypair.publicKey.toString();
          
          // Check if this wallet already exists
          const existingWallet = this.wallets.find(w => w.publicKey === publicKey);
          if (!existingWallet) {
            const walletInfo: WalletInfo = {
              privateKey,
              publicKey,
              balance: 0,
              rentExemptBalance: 0,
              rentAmount: 0,
              canClose: false
            };
            this.wallets.push(walletInfo);
          }
        } catch (error) {
          console.error(`Invalid private key format: ${privateKey.substring(0, 10)}...`, error);
        }
      }

      // For public keys without corresponding private keys, we can't do anything
      // but we'll log them
      if (walletAddresses.length > 0) {
        console.log(`Found ${walletAddresses.length} public keys without private keys. These will be skipped.`);
      }

      console.log(`Loaded ${this.wallets.length} valid wallets from ${fileName}`);
      return this.wallets;
    } catch (error) {
      console.error(`Failed to load wallets from ${fileName}:`, error);
      throw new Error(`Failed to load wallets: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Load wallets from multiple files
   */
  async loadWalletsFromFiles(files: FileList): Promise<{ wallets: WalletInfo[]; fileNames: string[] }> {
    const fileNames: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = await this.readFileContent(file);
      await this.loadWalletsFromContent(content, file.name, false); // Don't clear existing
      fileNames.push(file.name);
    }

    return {
      wallets: this.wallets,
      fileNames
    };
  }

  /**
   * Read file content as text
   */
  private readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('File reading error'));
      reader.readAsText(file);
    });
  }

  /**
   * Get all loaded wallets
   */
  getWallets(): WalletInfo[] {
    return this.wallets;
  }

  /**
   * Clear all wallets
   */
  clearWallets(): void {
    this.wallets = [];
  }

  /**
   * Update wallet information (called during analysis)
   */
  updateWalletInfo(
    walletIndex: number,
    balance: number,
    rentExemptBalance: number,
    rentAmount: number,
    canClose: boolean
  ): void {
    if (walletIndex >= 0 && walletIndex < this.wallets.length) {
      this.wallets[walletIndex] = {
        ...this.wallets[walletIndex],
        balance,
        rentExemptBalance,
        rentAmount,
        canClose
      };
    }
  }

  /**
   * Get wallet by index
   */
  getWallet(index: number): WalletInfo | undefined {
    return this.wallets[index];
  }

  /**
   * Get wallets count
   */
  getWalletsCount(): number {
    return this.wallets.length;
  }

  /**
   * Validate a private key
   */
  static validatePrivateKey(privateKey: string): boolean {
    try {
      Keypair.fromSecretKey(bs58.decode(privateKey));
      return true;
    } catch {
      return false;
    }
  }
} 