export interface WalletInfo {
  privateKey: string;
  publicKey: string;
  balance: number;
  rentExemptBalance: number;
  rentAmount: number;
  canClose: boolean;
}

export interface RentCollectionResult {
  wallet: string;
  success: boolean;
  rentCollected: number;
  error?: string;
  transactionSignature?: string;
}

export interface RentCollectionSummary {
  totalWallets: number;
  successfulCollections: number;
  totalRentCollected: number;
  failedCollections: number;
  results: RentCollectionResult[];
}

export interface ProcessingProgress {
  current: number;
  total: number;
  wallet: string;
  status: string;
}

export interface ExtensionConfig {
  rpcUrl?: string;
  feePayerKey?: string;
} 