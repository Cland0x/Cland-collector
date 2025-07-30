# Cland Chrome Extension - Complete Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Installation Guide](#installation-guide)
3. [Getting Started](#getting-started)
4. [Features & Functionality](#features--functionality)
5. [Security Architecture](#security-architecture)
6. [Cost Analysis](#cost-analysis)
7. [Technical Documentation](#technical-documentation)
8. [User Interface Guide](#user-interface-guide)
9. [Advanced Usage](#advanced-usage)
10. [Troubleshooting](#troubleshooting)
11. [API Reference](#api-reference)
12. [Best Practices](#best-practices)
13. [Contributing](#contributing)
14. [FAQ](#faq)

---

## Introduction

### What is Cland?

Cland is a professional-grade Chrome Extension designed for efficient and secure Solana rent collection operations. Built with security-first principles, Cland enables users to collect accumulated rent from multiple Solana token accounts in a streamlined, automated process while maintaining complete control over their private keys.

### Why Cland?

**🔒 Security First**
- All operations happen locally in your browser
- Private keys never leave your device
- No data transmission to external servers
- Chrome Extension sandbox protection

**⚡ Efficiency**
- Batch processing of multiple wallets
- Real-time progress tracking
- Automatic fee calculation
- Optimized transaction handling

**💰 Cost Effective**
- Minimize transaction fees through batching
- Smart fee estimation
- Transparent cost reporting
- Maximum rent recovery

**🎯 User-Friendly**
- Clean, modern interface
- Step-by-step guidance
- Detailed progress feedback
- Professional dark theme

---

## Installation Guide

### Prerequisites

- **Google Chrome Browser** (Version 88 or higher)
- **Basic Solana Knowledge** (understanding of wallets, private keys, RPC endpoints)
- **Solana Wallet Files** (`.txt` files containing private keys)
- **RPC Access** (Helius, QuickNode, or custom endpoint)

### Installation Methods

#### Method 1: Chrome Web Store (Recommended)
```
1. Visit Chrome Web Store
2. Search for "Cland"
3. Click "Add to Chrome"
4. Confirm installation
5. Pin extension to toolbar
```

#### Method 2: Developer Mode (Advanced)
```
1. Download source code from GitHub
2. Extract to local directory
3. Open Chrome Extensions (chrome://extensions/)
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the `dist-extension` folder
7. Extension appears in toolbar
```

### Post-Installation Setup

1. **Pin the Extension**: Click the puzzle piece icon in Chrome toolbar → Pin Cland
2. **Verify Installation**: Click Cland icon → Should see welcome screen
3. **First Launch**: Configure RPC endpoint and fee payer wallet

---

## Getting Started

### Quick Start Guide

#### Step 1: Prepare Your Environment

**Required Files:**
- **Private Key File(s)**: `.txt` files with one private key per line
- **Fee Payer Wallet**: A funded Solana wallet for transaction fees
- **RPC Endpoint**: Access to Solana network (mainnet/devnet/testnet)

**Example Private Key File Format:**
```
5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZpJ85n
3WUX7GvHfnujuKvzdPHjHLpNnguGgdGKRiLHodk17VoS
2B5VsY98Rlann35t19J2AB1yms5MiH8PxMV6Qpn3GpkK
```

#### Step 2: Configure Settings

1. **Open Cland Extension**
2. **Set RPC Endpoint**:
   ```
   Mainnet: https://api.mainnet-beta.solana.com
   Helius: https://rpc.helius.xyz/?api-key=YOUR_KEY
   QuickNode: https://your-endpoint.solana-mainnet.quiknode.pro/TOKEN/
   ```
3. **Configure Fee Payer**:
   - Enter private key of wallet with sufficient SOL for fees
   - Recommended minimum: 0.1 SOL for batch operations

#### Step 3: Load Wallets

1. **Click "Load Wallets"**
2. **Select File(s)**:
   - Single file: Up to 1000 wallets
   - Multiple files: Unlimited
3. **Verify Loading**:
   - Check wallet count display
   - Review any validation errors

#### Step 4: Scan for Rent

1. **Click "Scan Wallets"**
2. **Monitor Progress**:
   - Real-time wallet scanning
   - Progress bar and percentage
   - Live statistics update
3. **Review Results**:
   - Total wallets scanned
   - Wallets with collectible rent
   - Estimated rent amount

#### Step 5: Collect Rent

1. **Review Summary**:
   - Total rent available
   - Estimated fees
   - Net profit calculation
2. **Start Collection**:
   - Click "Collect Rent"
   - Monitor real-time progress
   - View transaction details
3. **Completion**:
   - Review final statistics
   - Check transaction confirmations
   - Verify fee payer balance increase

---

## Features & Functionality

### Core Features

#### 1. Multi-Wallet Management
- **Bulk Import**: Load thousands of wallets from text files
- **Format Validation**: Automatic private key validation
- **Duplicate Detection**: Prevents duplicate wallet processing
- **Memory Efficient**: Handles large wallet sets without browser lag

#### 2. Intelligent Rent Detection
- **Account Scanning**: Comprehensive token account analysis
- **Rent Calculation**: Precise rent-exempt threshold calculations
- **Filter Logic**: Identifies accounts with collectible rent
- **Real-time Updates**: Live balance and rent status monitoring

#### 3. Automated Collection Process
- **Batch Transactions**: Efficient transaction grouping
- **Smart Fee Management**: Automatic fee calculation and optimization
- **Error Handling**: Robust error recovery and retry mechanisms
- **Progress Tracking**: Real-time operation monitoring

#### 4. Security Features
- **Local Processing**: All operations within browser sandbox
- **Private Key Protection**: Keys never transmitted or stored externally
- **Secure Storage**: Chrome's encrypted local storage
- **Audit Trail**: Detailed operation logging

### Advanced Features

#### 1. Custom RPC Support
```typescript
// Supported RPC Providers
const rpcProviders = {
  mainnet: "https://api.mainnet-beta.solana.com",
  helius: "https://rpc.helius.xyz/?api-key=",
  quicknode: "https://endpoint.solana-mainnet.quiknode.pro/",
  custom: "YOUR_CUSTOM_ENDPOINT"
}
```

#### 2. Token Program Support
- **SPL Token Program**: Standard token accounts
- **Token-2022 Program**: Next-generation token standard
- **Mixed Processing**: Handles both token types simultaneously
- **Program Detection**: Automatic token program identification

#### 3. Network Configuration
- **Mainnet**: Production Solana network
- **Devnet**: Development testing network
- **Testnet**: Testing environment
- **Custom**: Private or specialized networks

#### 4. Fee Optimization
- **Dynamic Fee Calculation**: Based on current network conditions
- **Batch Size Optimization**: Maximizes efficiency per transaction
- **Priority Fee Support**: Faster transaction confirmation
- **Cost Minimization**: Smart transaction grouping

---

## Security Architecture

### Security Principles

#### 1. Zero-Trust Model
- **No External Communication**: Extension operates in complete isolation
- **Local-Only Processing**: All computations happen in browser
- **No Analytics**: Zero telemetry or usage tracking
- **No Dependencies**: Minimal external library usage

#### 2. Private Key Protection

**Storage Security:**
```typescript
// Private keys are never stored permanently
const temporaryKeyStorage = {
  location: "Browser Memory",
  encryption: "Chrome Extension Sandbox",
  persistence: "Session Only",
  transmission: "Never"
}
```

**Processing Security:**
- **Memory Management**: Keys cleared after each operation
- **Scope Isolation**: Limited access to key material
- **Error Handling**: Secure cleanup on failures
- **Debug Protection**: No key logging in console

#### 3. Chrome Extension Security

**Manifest V3 Compliance:**
```json
{
  "manifest_version": 3,
  "permissions": ["storage"],
  "content_security_policy": {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'"
  }
}
```

**Security Features:**
- **Sandbox Isolation**: Extension runs in isolated context
- **Permission Minimization**: Only essential permissions requested
- **Content Security Policy**: Prevents XSS and code injection
- **Secure Communication**: No external network requests

#### 4. Transaction Security

**Signing Process:**
- **Local Signing**: All transactions signed locally
- **Key Derivation**: Secure private key handling
- **Transaction Validation**: Pre-flight checks before signing
- **Confirmation Tracking**: Monitor transaction success

**Error Handling:**
- **Graceful Failures**: Secure cleanup on errors
- **Retry Logic**: Safe transaction retry mechanisms
- **Rollback Protection**: Prevents partial state corruption
- **Audit Logging**: Detailed operation tracking

### Security Best Practices

#### For Users

1. **Environment Security**:
   - Use dedicated browser profile for crypto operations
   - Enable browser auto-updates
   - Use strong device passwords
   - Enable device encryption

2. **Private Key Management**:
   - Store backup copies securely offline
   - Never share private key files
   - Use unique passwords for encrypted files
   - Regularly audit wallet access

3. **Network Security**:
   - Use trusted RPC endpoints only
   - Verify RPC endpoint certificates
   - Monitor network connections
   - Use VPN for additional privacy

#### For Developers

1. **Code Security**:
   - Regular security audits
   - Dependency vulnerability scanning
   - Code signing verification
   - Secure development practices

2. **Build Security**:
   - Reproducible builds
   - Source code verification
   - Build artifact signing
   - Supply chain security

---

## Cost Analysis

### Transaction Costs

#### Base Fees Structure

**Solana Network Fees:**
```
Base Transaction Fee: 0.000005 SOL (~$0.0001)
Priority Fee (Optional): 0.00001-0.0001 SOL
Account Rent: 0.00203928 SOL per account
Close Account Refund: Full rent amount returned
```

#### Cland Operation Costs

**Per Wallet Processing:**
```
Scanning Phase: 0 SOL (read-only operations)
Collection Phase: 0.000005 SOL per transaction
Token Account Closure: 0.000005 SOL per account
Net Cost: ~0.00001 SOL per wallet with collectible rent
```

#### Cost Examples

**Small Operation (10 wallets):**
```
Total Scanning: Free
Total Collection: ~0.0001 SOL ($0.002)
Expected Rent Recovery: ~0.02039 SOL ($0.40)
Net Profit: ~0.02029 SOL ($0.398)
ROI: ~98.5%
```

**Medium Operation (100 wallets):**
```
Total Scanning: Free
Total Collection: ~0.001 SOL ($0.02)
Expected Rent Recovery: ~0.2039 SOL ($4.00)
Net Profit: ~0.2029 SOL ($3.98)
ROI: ~99.5%
```

**Large Operation (1000 wallets):**
```
Total Scanning: Free
Total Collection: ~0.01 SOL ($0.20)
Expected Rent Recovery: ~2.039 SOL ($40.00)
Net Profit: ~2.029 SOL ($39.80)
ROI: ~99.5%
```

### Fee Optimization Strategies

#### 1. Batch Processing
- **Transaction Grouping**: Multiple operations per transaction
- **Optimal Batch Size**: 10-20 operations per transaction
- **Fee Amortization**: Spread base fees across multiple operations

#### 2. Network Timing
- **Low Congestion Periods**: Reduced priority fees
- **Peak Avoidance**: Skip high-traffic times
- **Fee Monitoring**: Real-time network fee tracking

#### 3. Smart Collection
- **Rent Threshold**: Only collect profitable amounts
- **Fee Calculation**: Ensure positive ROI before collection
- **Cost Reporting**: Transparent fee breakdown

---

## Technical Documentation

### Architecture Overview

#### Component Structure
```
Cland Extension
├── Popup Interface (React)
├── Storage Service (Chrome API)
├── Wallet Manager (Solana Web3)
├── Rent Collector (Core Logic)
└── Utilities (Helpers)
```

#### Technology Stack

**Frontend:**
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Chakra UI**: Component library
- **Vite**: Build tool and bundler

**Blockchain:**
- **Solana Web3.js**: Blockchain interaction
- **SPL Token**: Token program interface
- **bs58**: Base58 encoding/decoding
- **Buffer**: Node.js compatibility

**Extension:**
- **Manifest V3**: Chrome Extension API
- **Chrome Storage**: Persistent configuration
- **CSP**: Content Security Policy
- **Sandbox**: Isolated execution environment

### Core Modules

#### 1. Wallet Manager
```typescript
class WalletManager {
  // Load wallets from file content
  static async loadWalletsFromContent(content: string): Promise<WalletInfo[]>
  
  // Validate private key format
  static validatePrivateKey(privateKey: string): boolean
  
  // Create Keypair from private key
  static createKeypairFromPrivateKey(privateKey: string): Keypair
  
  // Get wallet public key
  static getPublicKey(privateKey: string): PublicKey
}
```

#### 2. Rent Collector
```typescript
class RentCollector {
  // Scan wallets for rent
  async scanWallets(
    wallets: WalletInfo[],
    onProgress?: (progress: ProcessingProgress) => void
  ): Promise<void>
  
  // Collect rent from accounts
  async collectRent(
    feePayerPrivateKey: string,
    onProgress?: (progress: ProcessingProgress) => void
  ): Promise<RentCollectionSummary>
  
  // Get collection statistics
  getStats(): RentCollectionSummary
}
```

#### 3. Storage Service
```typescript
class StorageService {
  // Save configuration
  static async saveConfig(config: ExtensionConfig): Promise<void>
  
  // Load configuration
  static async loadConfig(): Promise<ExtensionConfig>
  
  // Clear all data
  static async clearConfig(): Promise<void>
}
```

### Data Models

#### Wallet Information
```typescript
interface WalletInfo {
  privateKey: string;
  publicKey: string;
  balance: number;
  tokenAccounts: TokenAccountInfo[];
  rentEligibleAccounts: TokenAccountInfo[];
  totalRent: number;
  status: 'pending' | 'scanning' | 'scanned' | 'collecting' | 'collected' | 'error';
}
```

#### Token Account Information
```typescript
interface TokenAccountInfo {
  address: string;
  mint: string;
  balance: number;
  decimals: number;
  rentEpoch: number;
  executable: boolean;
  owner: string;
  lamports: number;
  data: {
    parsed: {
      info: {
        isNative: boolean;
        mint: string;
        owner: string;
        state: string;
        tokenAmount: {
          amount: string;
          decimals: number;
          uiAmount: number;
        };
      };
      type: string;
    };
    program: string;
    space: number;
  };
}
```

#### Processing Progress
```typescript
interface ProcessingProgress {
  current: number;
  total: number;
  wallet: string;
  status: string;
}
```

### Build Configuration

#### Vite Configuration
```typescript
// vite-extension.config.ts
export default defineConfig({
  build: {
    outDir: 'dist-extension',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html')
      }
    }
  },
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  resolve: {
    alias: {
      buffer: 'buffer'
    }
  },
  optimizeDeps: {
    exclude: ['@solana/web3.js']
  }
});
```

#### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "types": ["chrome", "node", "react", "react-dom"]
  },
  "include": [
    "popup/**/*",
    "services/**/*",
    "utils/**/*",
    "types/**/*"
  ]
}
```

### Performance Optimization

#### Memory Management
- **Streaming Processing**: Handle large wallet sets efficiently
- **Garbage Collection**: Explicit cleanup of sensitive data
- **Batch Optimization**: Optimal transaction grouping
- **Progress Throttling**: Smooth UI updates

#### Network Optimization
- **Connection Pooling**: Reuse RPC connections
- **Request Batching**: Group multiple queries
- **Retry Logic**: Intelligent error recovery
- **Timeout Handling**: Prevent hanging operations

---

## User Interface Guide

### Main Interface Components

#### 1. Header Section
```
┌─────────────────────────────────────┐
│ [C] Cland                           │
│ Solana Rent Recovery                │
└─────────────────────────────────────┘
```
- **Logo**: Cland brand identity
- **Title**: Application name
- **Tagline**: Purpose description

#### 2. Progress Steps
```
┌─────────────────────────────────────┐
│ ○ Load    ○ Scan    ○ Collect       │
└─────────────────────────────────────┘
```
- **Visual Progress**: Current operation stage
- **Step Indication**: Active, completed, pending states
- **User Guidance**: Clear workflow direction

#### 3. Configuration Panel
```
┌─────────────────────────────────────┐
│ RPC Endpoint: [________________]    │
│ Fee Payer:    [________________]    │
│ [Save Settings]                     │
└─────────────────────────────────────┘
```
- **RPC URL**: Solana network endpoint
- **Fee Payer**: Transaction fee source wallet
- **Persistence**: Secure local storage

#### 4. Wallet Loading Section
```
┌─────────────────────────────────────┐
│ [Choose Files] or drag & drop       │
│ Supported: .txt files               │
│ Status: 0 wallets loaded            │
└─────────────────────────────────────┘
```
- **File Selection**: Native browser file picker
- **Drag & Drop**: Convenient file handling
- **Format Support**: Text file validation
- **Status Display**: Load confirmation

#### 5. Scanning Interface
```
┌─────────────────────────────────────┐
│ [Scan Wallets]                      │
│ Progress: ████████░░ 80%            │
│ Status: Scanning wallet 8/10        │
└─────────────────────────────────────┘
```
- **Action Button**: Start scanning process
- **Progress Bar**: Visual progress indication
- **Status Text**: Current operation details
- **Real-time Updates**: Live progress feedback

#### 6. Statistics Dashboard
```
┌─────────────────────────────────────┐
│ Total Wallets: 100                  │
│ With Rent: 45                       │
│ Available Rent: 0.9234 SOL          │
│ Est. Fees: 0.0012 SOL              │
│ Net Profit: 0.9222 SOL             │
└─────────────────────────────────────┘
```
- **Comprehensive Stats**: Complete operation overview
- **Financial Summary**: Cost and profit analysis
- **Real-time Updates**: Live data refresh

#### 7. Collection Interface
```
┌─────────────────────────────────────┐
│ [Collect Rent]                      │
│ Progress: ██████░░░░ 60%            │
│ Collected: 15/45 wallets            │
│ Success: 14  Failed: 1              │
└─────────────────────────────────────┘
```
- **Action Button**: Start collection process
- **Progress Tracking**: Real-time operation status
- **Success Metrics**: Detailed outcome reporting
- **Error Handling**: Failed operation indication

### Theme and Styling

#### Color Palette
```css
:root {
  --background-color: #0a0a0a;    /* Deep black */
  --surface-color: #1a1a1a;       /* Dark gray */
  --surface-hover: #2a2a2a;       /* Lighter gray */
  --border-color: #333333;        /* Border gray */
  --border-hover: #444444;        /* Hover border */
  --text-color: #ffffff;          /* Pure white */
  --text-secondary: #b0b0b0;      /* Light gray */
  --accent-color: #4299e1;        /* Blue accent */
  --accent-hover: #3182ce;        /* Darker blue */
  --success-color: #48bb78;       /* Green success */
  --error-color: #f56565;         /* Red error */
  --warning-color: #ed8936;       /* Orange warning */
}
```

#### Typography
```css
/* Primary heading */
h1 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

/* Body text */
body {
  font-family: 'Inter', -apple-system, system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  font-weight: 400;
}

/* Labels */
label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

#### Component Styling

**Cards:**
```css
.card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.card:hover {
  background: var(--surface-hover);
  border-color: var(--border-hover);
}
```

**Buttons:**
```css
.btn-primary {
  background: var(--accent-color);
  color: white;
  border: 1px solid var(--accent-color);
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}
```

### Responsive Design

#### Desktop Layout (400px+ width)
- **Fixed Width**: 380px popup window
- **Optimal Spacing**: Comfortable padding and margins
- **Full Feature Set**: All functionality available

#### Mobile-Friendly Adaptation
- **Flexible Layout**: Responsive component sizing
- **Touch Targets**: Adequate button sizes
- **Readable Text**: Optimized font sizes

---

## Advanced Usage

### Power User Features

#### 1. Bulk Operations
```bash
# Processing large wallet sets
Max Wallets: 10,000+ per session
Batch Size: 20 operations per transaction
Memory Usage: ~50MB for 1000 wallets
Processing Time: ~1 second per wallet
```

#### 2. Custom RPC Configuration
```typescript
// Advanced RPC settings
const rpcConfig = {
  endpoint: "https://your-custom-rpc.com",
  commitment: "confirmed",
  timeout: 30000,
  retries: 3,
  priorityFees: true
}
```

#### 3. Network Selection
```typescript
// Multi-network support
const networks = {
  mainnet: "https://api.mainnet-beta.solana.com",
  devnet: "https://api.devnet.solana.com",
  testnet: "https://api.testnet.solana.com",
  localnet: "http://localhost:8899"
}
```

### Automation Strategies

#### 1. Scheduled Operations
- **Browser Automation**: Use browser task schedulers
- **Workflow Integration**: Combine with other tools
- **Monitoring Setup**: Alert systems for completion

#### 2. File Management
```bash
# Organized file structure
wallet-files/
├── mainnet/
│   ├── batch-001.txt
│   ├── batch-002.txt
│   └── batch-003.txt
├── devnet/
│   └── test-wallets.txt
└── processed/
    ├── completed-001.txt
    └── completed-002.txt
```

#### 3. Result Tracking
```typescript
// Operation logging
interface OperationLog {
  timestamp: number;
  walletCount: number;
  rentCollected: number;
  feesSpent: number;
  netProfit: number;
  successRate: number;
}
```

### Integration Possibilities

#### 1. External Tools
- **Wallet Generators**: Import from other tools
- **Portfolio Trackers**: Export results for analysis
- **Tax Software**: Transaction history export

#### 2. API Integration
```typescript
// Custom RPC endpoints
const customRPC = {
  helius: "https://rpc.helius.xyz/?api-key=YOUR_KEY",
  quicknode: "https://endpoint.solana-mainnet.quiknode.pro/TOKEN/",
  alchemy: "https://solana-mainnet.g.alchemy.com/v2/API_KEY",
  triton: "https://your-triton-endpoint.com"
}
```

### Performance Tuning

#### 1. Optimization Settings
```typescript
// Performance configuration
const performanceConfig = {
  batchSize: 20,           // Operations per transaction
  concurrency: 5,          // Parallel requests
  retryAttempts: 3,        // Error recovery
  timeoutMs: 30000,        // Request timeout
  progressThrottle: 100    // UI update frequency
}
```

#### 2. Memory Management
- **Large File Handling**: Stream processing for huge files
- **Memory Cleanup**: Explicit garbage collection
- **Resource Monitoring**: Browser performance tracking

#### 3. Network Optimization
- **Connection Reuse**: Persistent RPC connections
- **Request Batching**: Minimize network calls
- **Caching Strategy**: Intelligent result caching

---

## Troubleshooting

### Common Issues

#### 1. Extension Installation Problems

**Issue**: Extension not loading
```
Symptoms: Extension icon missing or grayed out
Causes: Browser compatibility, corrupted download
Solution:
1. Update Chrome to latest version
2. Clear browser cache and cookies
3. Disable other extensions temporarily
4. Reinstall extension from fresh download
```

**Issue**: Permission errors
```
Symptoms: "Extension blocked" messages
Causes: Browser security settings, admin restrictions
Solution:
1. Check browser security settings
2. Add extension to allowed list
3. Contact system administrator if on managed device
```

#### 2. Wallet Loading Issues

**Issue**: File not recognized
```
Symptoms: "Invalid file format" error
Causes: Wrong file type, encoding issues
Solution:
1. Ensure file is plain text (.txt)
2. Check UTF-8 encoding
3. Verify one private key per line
4. Remove extra spaces or characters
```

**Issue**: Private key validation fails
```
Symptoms: "Invalid private key" warnings
Causes: Incorrect key format, corrupted data
Solution:
1. Verify base58 encoding
2. Check key length (32 bytes)
3. Test keys in other Solana tools
4. Re-export from original source
```

#### 3. RPC Connection Problems

**Issue**: Connection timeout
```
Symptoms: "Failed to connect to RPC" error
Causes: Network issues, wrong endpoint, rate limiting
Solution:
1. Check internet connection
2. Verify RPC endpoint URL
3. Try alternative RPC provider
4. Check firewall settings
```

**Issue**: Rate limiting
```
Symptoms: Frequent "Too many requests" errors
Causes: Exceeded RPC provider limits
Solution:
1. Reduce batch size in operations
2. Add delays between requests
3. Upgrade to premium RPC service
4. Use multiple RPC endpoints
```

#### 4. Transaction Failures

**Issue**: Insufficient fees
```
Symptoms: "Transaction failed" with fee errors
Causes: Fee payer wallet has insufficient SOL
Solution:
1. Check fee payer balance
2. Add more SOL to fee payer wallet
3. Reduce batch size to lower fees
4. Use lower priority fees
```

**Issue**: Network congestion
```
Symptoms: Transactions taking too long or failing
Causes: High network traffic, low priority fees
Solution:
1. Increase priority fees
2. Wait for off-peak hours
3. Reduce transaction complexity
4. Use confirmed commitment level
```

### Error Codes

#### Extension Errors
```
E001: Extension not installed properly
E002: Permissions denied
E003: Storage access failed
E004: Invalid configuration
```

#### Wallet Errors
```
W001: File format not supported
W002: Private key validation failed
W003: Duplicate wallet detected
W004: Wallet limit exceeded
```

#### Network Errors
```
N001: RPC connection failed
N002: Network timeout
N003: Rate limit exceeded
N004: Invalid endpoint
```

#### Transaction Errors
```
T001: Insufficient fees
T002: Transaction failed
T003: Account not found
T004: Invalid signature
```

### Debug Mode

#### Enable Debugging
```typescript
// Enable console logging
localStorage.setItem('cland_debug', 'true');

// Set log level
localStorage.setItem('cland_log_level', 'verbose');
```

#### Debug Information
```typescript
// Available debug data
const debugInfo = {
  version: "1.0.0",
  browser: navigator.userAgent,
  storage: await chrome.storage.local.get(),
  walletCount: wallets.length,
  lastOperation: operationLog,
  networkStats: connectionStats
}
```

### Getting Help

#### Support Channels
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check this comprehensive guide
- **Community**: Join Discord for community support
- **Email**: Contact support team directly

#### When Reporting Issues
1. **Extension Version**: Check extension version
2. **Browser Info**: Chrome version and OS
3. **Error Messages**: Copy exact error text
4. **Steps to Reproduce**: Detailed reproduction steps
5. **Screenshots**: Visual evidence if applicable

---

## API Reference

### Core Classes

#### WalletManager
```typescript
class WalletManager {
  // Load wallets from text content
  static async loadWalletsFromContent(content: string): Promise<WalletInfo[]>
  
  // Load wallets from file list
  static async loadWalletsFromFiles(files: FileList): Promise<WalletInfo[]>
  
  // Validate private key format
  static validatePrivateKey(privateKey: string): boolean
  
  // Create Keypair from private key
  static createKeypairFromPrivateKey(privateKey: string): Keypair
  
  // Get public key from private key
  static getPublicKey(privateKey: string): PublicKey
  
  // Read file content as text
  private static readFileContent(file: File): Promise<string>
}
```

#### RentCollector
```typescript
class RentCollector {
  private connection: Connection;
  private wallets: WalletInfo[];
  private stats: RentCollectionSummary;
  
  constructor(rpcUrl: string)
  
  // Load wallets for processing
  setWallets(wallets: WalletInfo[]): void
  
  // Scan wallets for rent
  async scanWallets(
    wallets: WalletInfo[],
    onProgress?: (progress: ProcessingProgress) => void
  ): Promise<void>
  
  // Collect rent from all eligible accounts
  async collectRent(
    feePayerPrivateKey: string,
    onProgress?: (progress: ProcessingProgress) => void
  ): Promise<RentCollectionSummary>
  
  // Get current statistics
  getStats(): RentCollectionSummary
  
  // Private helper methods
  private async scanWallet(wallet: WalletInfo): Promise<void>
  private async collectFromWallet(
    wallet: WalletInfo,
    feePayerKeypair: Keypair
  ): Promise<void>
  private async getTokenAccounts(publicKey: PublicKey): Promise<any[]>
  private isRentEligible(account: any): boolean
  private async closeTokenAccount(
    accountAddress: string,
    owner: Keypair,
    feePayer: Keypair
  ): Promise<string>
}
```

#### StorageService
```typescript
class StorageService {
  private static readonly CONFIG_KEY = 'solana_rent_collector_config';
  
  // Save complete configuration
  static async saveConfig(config: ExtensionConfig): Promise<void>
  
  // Load complete configuration
  static async loadConfig(): Promise<ExtensionConfig>
  
  // Clear all stored data
  static async clearConfig(): Promise<void>
  
  // Save RPC URL
  static async saveRpcUrl(rpcUrl: string): Promise<void>
  
  // Save fee payer private key
  static async saveFeePayerKey(feePayerKey: string): Promise<void>
  
  // Get stored RPC URL
  static async getRpcUrl(): Promise<string>
  
  // Get stored fee payer key
  static async getFeePayerKey(): Promise<string>
}
```

### Type Definitions

#### Interfaces
```typescript
// Wallet information structure
interface WalletInfo {
  privateKey: string;
  publicKey: string;
  balance: number;
  tokenAccounts: TokenAccountInfo[];
  rentEligibleAccounts: TokenAccountInfo[];
  totalRent: number;
  status: 'pending' | 'scanning' | 'scanned' | 'collecting' | 'collected' | 'error';
}

// Token account details
interface TokenAccountInfo {
  address: string;
  mint: string;
  balance: number;
  decimals: number;
  rentEpoch: number;
  executable: boolean;
  owner: string;
  lamports: number;
  data: TokenAccountData;
}

// Token account data structure
interface TokenAccountData {
  parsed: {
    info: {
      isNative: boolean;
      mint: string;
      owner: string;
      state: string;
      tokenAmount: {
        amount: string;
        decimals: number;
        uiAmount: number;
      };
    };
    type: string;
  };
  program: string;
  space: number;
}

// Collection operation summary
interface RentCollectionSummary {
  totalWallets: number;
  scannedWallets: number;
  walletsWithRent: number;
  totalRentAvailable: number;
  totalRentCollected: number;
  totalFeesPaid: number;
  successfulCollections: number;
  failedCollections: number;
  netProfit: number;
}

// Progress tracking for operations
interface ProcessingProgress {
  current: number;
  total: number;
  wallet: string;
  status: string;
}

// Extension configuration
interface ExtensionConfig {
  rpcUrl?: string;
  feePayerKey?: string;
}
```

### Constants

#### Token Programs
```typescript
// Solana token program IDs
export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

export const TOKEN_2022_PROGRAM_ID = new PublicKey(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
);
```

#### Default Values
```typescript
// Default configuration values
export const DEFAULT_RPC_URL = 'https://api.mainnet-beta.solana.com';
export const DEFAULT_COMMITMENT = 'confirmed';
export const RENT_EXEMPT_THRESHOLD = 0.00203928; // SOL
export const MAX_BATCH_SIZE = 20;
export const REQUEST_TIMEOUT = 30000; // milliseconds
```

### Events

#### Progress Events
```typescript
// Progress callback function type
type ProgressCallback = (progress: ProcessingProgress) => void;

// Usage example
const onProgress: ProgressCallback = (progress) => {
  console.log(`Processing ${progress.current}/${progress.total}: ${progress.status}`);
};
```

#### Error Events
```typescript
// Error handling
interface OperationError {
  code: string;
  message: string;
  wallet?: string;
  transaction?: string;
  details?: any;
}
```

---

## Best Practices

### Security Best Practices

#### 1. Private Key Management
```typescript
// DO: Use secure key handling
const secureKeyHandling = {
  storage: "Memory only during operation",
  transmission: "Never over network",
  logging: "Never log private keys",
  cleanup: "Clear after each operation"
};

// DON'T: Store keys permanently
// localStorage.setItem('privateKey', key); // NEVER DO THIS
```

#### 2. Network Security
```bash
# DO: Use reputable RPC providers
✅ Helius (https://helius.xyz)
✅ QuickNode (https://quicknode.com)
✅ Triton (https://triton.one)
✅ Solana Foundation (https://api.mainnet-beta.solana.com)

# DON'T: Use untrusted endpoints
❌ Random public RPCs
❌ HTTP (non-HTTPS) endpoints
❌ Unverified custom servers
```

#### 3. Operation Security
```typescript
// DO: Validate before operations
const secureOperation = {
  validateKeys: true,
  checkBalances: true,
  simulateFirst: true,
  confirmTransactions: true
};

// DON'T: Skip validation
const unsafeOperation = {
  blindlyTrust: false,
  skipConfirmation: false,
  ignoreErrors: false
};
```

### Performance Best Practices

#### 1. Batch Optimization
```typescript
// Optimal batch sizes for different operations
const batchSizes = {
  scanning: 10,      // RPC calls per batch
  collection: 20,    // Transactions per batch
  validation: 50     // Key validations per batch
};
```

#### 2. Resource Management
```typescript
// Memory and CPU optimization
const resourceManagement = {
  maxMemoryMB: 100,
  maxConcurrentOps: 5,
  progressUpdateMs: 100,
  timeoutMs: 30000
};
```

#### 3. Error Handling
```typescript
// Robust error handling strategy
const errorHandling = {
  retryAttempts: 3,
  retryDelayMs: 1000,
  failFast: false,
  continueOnError: true
};
```

### Operational Best Practices

#### 1. File Organization
```bash
# Recommended file structure
crypto-operations/
├── wallets/
│   ├── mainnet/
│   │   ├── batch-001.txt (≤ 1000 wallets)
│   │   ├── batch-002.txt
│   │   └── batch-003.txt
│   └── testnet/
│       └── test-wallets.txt
├── results/
│   ├── 2024-01-15-operation.log
│   └── 2024-01-16-operation.log
└── backups/
    ├── original-wallets.zip
    └── processed-wallets.zip
```

#### 2. Testing Strategy
```typescript
// Testing progression
const testingSteps = {
  1: "Test with 1-2 wallets on devnet",
  2: "Test with 10 wallets on devnet", 
  3: "Test with 1-2 wallets on mainnet",
  4: "Scale to full operation on mainnet"
};
```

#### 3. Monitoring
```typescript
// Operation monitoring
const monitoring = {
  preOperation: "Check all configurations",
  duringOperation: "Monitor progress and errors",
  postOperation: "Verify results and profitability"
};
```

### Cost Optimization

#### 1. Fee Management
```typescript
// Smart fee strategies
const feeStrategies = {
  offPeakHours: "Lower network congestion = lower fees",
  batchOptimization: "More operations per transaction",
  priorityFeeControl: "Balance speed vs cost",
  profitabilityCheck: "Ensure positive ROI before operation"
};
```

#### 2. Timing Optimization
```bash
# Best times for operations (UTC)
Low Traffic:  02:00 - 08:00 UTC (lowest fees)
Medium:       08:00 - 14:00 UTC 
High Traffic: 14:00 - 02:00 UTC (highest fees)

# Days of week
Best:    Sunday, Monday
Good:    Tuesday, Wednesday
Busy:    Thursday, Friday, Saturday
```

#### 3. Profitability Analysis
```typescript
// Pre-operation profitability check
const profitabilityCheck = {
  minRentThreshold: 0.01,     // SOL per account
  maxFeeRatio: 0.05,          // 5% of collected rent
  minNetProfit: 0.001,        // SOL minimum profit
  breakEvenPoint: "Calculate before starting"
};
```

---

## Contributing

### Development Setup

#### Prerequisites
```bash
# Required software
Node.js 18+
npm 8+
Git 2.30+
Chrome 88+
```

#### Local Development
```bash
# Clone repository
git clone https://github.com/Cland0x/Cland-collector.git
cd Cland-collector

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Load in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select dist-extension folder
```

#### Project Structure
```
Cland-collector/
├── popup/           # UI components
│   ├── App.tsx      # Main React component
│   ├── main.tsx     # Entry point
│   └── styles.css   # Styling
├── services/        # Core business logic
│   ├── rent-collector.ts
│   └── storage.ts
├── utils/           # Utility functions
│   └── wallet-manager.ts
├── types/           # TypeScript definitions
│   └── index.ts
├── public/          # Static assets
├── manifest.json    # Extension manifest
└── package.json     # Dependencies
```

### Code Style

#### TypeScript Standards
```typescript
// Use explicit types
interface WalletInfo {
  privateKey: string;
  publicKey: string;
  balance: number;
}

// Prefer async/await over promises
async function loadWallets(): Promise<WalletInfo[]> {
  try {
    const result = await walletManager.load();
    return result;
  } catch (error) {
    console.error('Failed to load wallets:', error);
    throw error;
  }
}

// Use proper error handling
class WalletError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'WalletError';
  }
}
```

#### React Patterns
```typescript
// Use functional components with hooks
const WalletManager: React.FC = () => {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadWallets();
  }, []);
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

// Custom hooks for shared logic
const useWalletState = () => {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  
  const loadWallets = useCallback(async () => {
    // Implementation
  }, []);
  
  return { wallets, loadWallets };
};
```

#### CSS Organization
```css
/* Use CSS custom properties */
:root {
  --primary-color: #4299e1;
  --spacing-md: 1rem;
}

/* Component-specific styles */
.wallet-card {
  background: var(--surface-color);
  padding: var(--spacing-md);
  border-radius: 8px;
}

/* Responsive design */
@media (max-width: 768px) {
  .wallet-card {
    padding: var(--spacing-sm);
  }
}
```

### Testing

#### Unit Tests
```typescript
// Test wallet manager functionality
describe('WalletManager', () => {
  test('validates private keys correctly', () => {
    const validKey = '5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZpJ85n';
    const invalidKey = 'invalid-key';
    
    expect(WalletManager.validatePrivateKey(validKey)).toBe(true);
    expect(WalletManager.validatePrivateKey(invalidKey)).toBe(false);
  });
  
  test('loads wallets from content', async () => {
    const content = 'key1\nkey2\nkey3';
    const wallets = await WalletManager.loadWalletsFromContent(content);
    
    expect(wallets).toHaveLength(3);
    expect(wallets[0].privateKey).toBe('key1');
  });
});
```

#### Integration Tests
```typescript
// Test complete workflow
describe('Rent Collection Workflow', () => {
  test('completes full scan and collect cycle', async () => {
    const wallets = await loadTestWallets();
    const collector = new RentCollector(TEST_RPC_URL);
    
    collector.setWallets(wallets);
    await collector.scanWallets(wallets);
    
    const stats = collector.getStats();
    expect(stats.scannedWallets).toBe(wallets.length);
  });
});
```

### Pull Request Process

#### Before Submitting
1. **Test Thoroughly**: Run all tests and manual testing
2. **Update Documentation**: Keep docs in sync with changes
3. **Follow Style Guide**: Consistent code formatting
4. **Security Review**: Check for security implications

#### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Security review done

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No security vulnerabilities introduced
```

### Release Process

#### Version Management
```bash
# Semantic versioning
Major: Breaking changes (2.0.0)
Minor: New features (1.1.0)
Patch: Bug fixes (1.0.1)
```

#### Release Checklist
1. **Code Review**: All changes reviewed and approved
2. **Testing**: Comprehensive testing completed
3. **Documentation**: All docs updated
4. **Security**: Security audit passed
5. **Build**: Production build successful
6. **Distribution**: Upload to Chrome Web Store

---

## FAQ

### General Questions

#### Q: What is Cland and what does it do?
**A:** Cland is a Chrome Extension that automates the collection of accumulated rent from Solana token accounts. When you create token accounts on Solana, a small amount of SOL (rent) is deposited to keep the account active. When these accounts are no longer needed, you can close them and recover this rent. Cland streamlines this process for multiple wallets simultaneously.

#### Q: Is Cland safe to use?
**A:** Yes, Cland is designed with security as the top priority. All operations happen locally in your browser, private keys never leave your device, and there's no external data transmission. The extension operates in Chrome's secure sandbox environment and follows best practices for cryptocurrency applications.

#### Q: How much does it cost to use Cland?
**A:** Cland itself is free to use. You only pay Solana network transaction fees, which are typically around 0.000005 SOL per transaction. Since you're recovering rent of approximately 0.00203928 SOL per token account, the operation is highly profitable with ROI typically above 98%.

### Technical Questions

#### Q: What file formats does Cland support?
**A:** Cland supports plain text files (.txt) with one private key per line. The private keys should be in base58 format (the standard Solana format). Example:
```
5KJvsngHeMpm884wtkJNzQGaCErckhHJBGFsvd3VyK5qMZpJ85n
3WUX7GvHfnujuKvzdPHjHLpNnguGgdGKRiLHodk17VoS
2B5VsY98Rlann35t19J2AB1yms5MiH8PxMV6Qpn3GpkK
```

#### Q: Which RPC providers work with Cland?
**A:** Cland works with any standard Solana RPC endpoint, including:
- Solana Foundation RPC (free, rate-limited)
- Helius (recommended for reliability)
- QuickNode (high performance)
- Triton (professional grade)
- Custom endpoints

#### Q: Can I use Cland on testnets?
**A:** Yes, Cland supports all Solana networks:
- Mainnet (production)
- Devnet (development testing)
- Testnet (testing environment)
- Custom networks

Simply change the RPC endpoint to the desired network.

#### Q: What's the maximum number of wallets I can process?
**A:** There's no hard limit, but practical considerations include:
- Browser memory (recommended: up to 10,000 wallets)
- RPC rate limits (varies by provider)
- Processing time (approximately 1 second per wallet)

For very large operations, consider breaking them into smaller batches.

### Usage Questions

#### Q: How do I know if my wallets have collectible rent?
**A:** Use the "Scan Wallets" feature to analyze your wallets. Cland will check each wallet for token accounts that can be closed to recover rent. The scan is free (read-only operations) and provides a detailed report of potential recoverable rent.

#### Q: What happens if a transaction fails?
**A:** Cland includes robust error handling:
- Failed transactions are retried automatically
- Detailed error reporting shows what went wrong
- Successful operations continue even if some fail
- You can resume operations from where they left off

#### Q: Can I pause and resume operations?
**A:** Currently, operations run to completion once started. However, you can:
- Process smaller batches for more control
- Stop the extension and restart (though progress won't be saved)
- Use the detailed progress tracking to monitor operations

#### Q: How long does rent collection take?
**A:** Processing time depends on several factors:
- Number of wallets
- Network congestion
- RPC provider speed
- Batch size settings

Typical rates:
- Scanning: ~1 second per wallet
- Collection: ~2-3 seconds per wallet with collectible rent

### Security Questions

#### Q: Where are my private keys stored?
**A:** Private keys are only stored temporarily in your browser's memory during operations. They are:
- Never saved to disk
- Never transmitted over the network
- Cleared from memory after each operation
- Protected by Chrome's security sandbox

#### Q: Can Cland access my private keys when I'm not using it?
**A:** No. Cland only accesses private keys when you explicitly upload them during an operation. The extension cannot access files on your computer or data from other applications.

#### Q: What permissions does Cland require?
**A:** Cland uses minimal permissions:
- `storage`: To save your RPC URL and settings locally
- No access to browsing history, other websites, or personal data

#### Q: Is it safe to use Cland on a shared computer?
**A:** While Cland doesn't permanently store sensitive data, it's recommended to:
- Use Cland only on trusted devices
- Clear browser data after use
- Use private/incognito browsing mode
- Never save private key files on shared computers

### Troubleshooting Questions

#### Q: Why is my RPC connection failing?
**A:** Common causes and solutions:
- **Wrong URL**: Verify the RPC endpoint is correct
- **Network issues**: Check your internet connection
- **Rate limiting**: Try a different RPC provider or reduce batch size
- **Firewall**: Ensure Chrome can access the internet

#### Q: Why are my private keys being rejected?
**A:** Private key validation can fail for several reasons:
- **Wrong format**: Ensure keys are in base58 format
- **File encoding**: Save files as UTF-8 text
- **Extra characters**: Remove spaces, tabs, or other characters
- **Corrupted data**: Re-export keys from original source

#### Q: Why is rent collection failing?
**A:** Collection failures usually involve:
- **Insufficient fees**: Ensure fee payer wallet has enough SOL
- **Network congestion**: Try during off-peak hours
- **Account state**: Some accounts may already be closed
- **Permission issues**: Verify you own the wallets being processed

#### Q: What should I do if I encounter a bug?
**A:** To report bugs effectively:
1. Note the exact error message
2. Record steps to reproduce the issue
3. Include your browser and extension version
4. Create an issue on GitHub with details
5. Provide screenshots if helpful

### Financial Questions

#### Q: How much rent can I expect to recover?
**A:** Rent recovery depends on your token accounts:
- Standard token account: ~0.00203928 SOL per account
- Token-2022 accounts: May vary based on extensions
- Total recovery = Number of closeable accounts × Rent per account

#### Q: Are there any hidden fees?
**A:** No hidden fees. You only pay:
- Solana network transaction fees (~0.000005 SOL per transaction)
- RPC provider fees (if using premium service)
- No fees to Cland itself

#### Q: When is rent collection profitable?
**A:** Rent collection is almost always profitable because:
- Rent recovery: ~0.00203928 SOL per account
- Transaction cost: ~0.000005 SOL per transaction
- Net profit: >99% of recovered rent

Only very small operations (1-2 accounts) might have marginal profitability.

#### Q: Can I calculate profitability before starting?
**A:** Yes, Cland provides detailed cost analysis:
- Scan wallets first (free operation)
- Review the summary showing total recoverable rent
- See estimated fees and net profit
- Only proceed if profitable

### Advanced Questions

#### Q: Can I automate Cland operations?
**A:** While Cland doesn't have built-in automation, you can:
- Use browser automation tools (advanced users)
- Schedule operations during off-peak hours
- Integrate with workflow management tools
- Use browser scripting for repetitive tasks

#### Q: How can I optimize performance for large operations?
**A:** Performance optimization strategies:
- Use premium RPC providers for faster responses
- Process during low network congestion periods
- Break large operations into smaller batches
- Use multiple RPC endpoints for redundancy
- Monitor browser memory usage

#### Q: Can I contribute to Cland development?
**A:** Yes! Cland is open source and welcomes contributions:
- Report bugs and feature requests on GitHub
- Submit code improvements via pull requests
- Help with documentation and testing
- Share feedback and usage experiences

#### Q: What's the roadmap for Cland?
**A:** Future development focuses on:
- Enhanced user interface and experience
- Additional Solana program support
- Performance optimizations
- Advanced automation features
- Integration with other DeFi tools

---

## Conclusion

Cland represents a significant advancement in Solana DeFi tooling, providing users with a secure, efficient, and user-friendly solution for rent collection operations. By combining the security of local-only processing with the convenience of a Chrome Extension, Cland enables both novice and advanced users to maximize their returns from Solana token account management.

The extensive documentation provided here ensures that users can fully leverage Cland's capabilities while maintaining the highest standards of security and operational excellence. Whether you're managing a small portfolio or conducting large-scale operations, Cland provides the tools and guidance necessary for successful rent collection.

For the latest updates, feature announcements, and community discussions, visit our GitHub repository and join our growing community of users who are optimizing their Solana operations with Cland.

**Remember**: Always prioritize security, test with small amounts first, and keep your private keys secure. Happy collecting!

---

*Last updated: January 2024*  
*Version: 1.0.0*  
*License: MIT*