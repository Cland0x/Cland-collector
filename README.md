# 🌟 Cland - Solana Rent Collector Chrome Extension

A powerful, secure Chrome Extension for collecting rent from Solana token accounts. Built with React, TypeScript, and optimized for maximum efficiency and security.

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg)
![Solana](https://img.shields.io/badge/Solana-Blockchain-purple.svg)
![Security](https://img.shields.io/badge/Security-Local%20Only-red.svg)

## 🎯 Overview

Cland is a professional-grade Chrome Extension designed to help Solana users efficiently collect rent from unused token accounts. With its modern interface and robust security model, Cland processes wallets locally, ensuring your private keys never leave your browser.

### ✨ Key Highlights

- 🔒 **100% Local Processing** - Private keys never leave your browser
- ⚡ **High-Speed Processing** - Optimized for batch operations
- 🎨 **Modern UI** - Clean, intuitive interface with dark theme
- 🛡️ **Enterprise Security** - Bank-level security practices
- 📊 **Real-Time Analytics** - Live progress tracking and detailed reports
- 🔄 **Multi-Token Support** - SPL Token and Token-2022 compatibility
- 🎯 **Smart Filtering** - Automatic rent calculation and optimization

---

## 🚀 Features Deep Dive

### 💼 Wallet Management
- **Multi-File Support**: Load multiple `.txt` files containing private keys
- **Format Flexibility**: Supports mixed private/public keys in same file
- **Instant Validation**: Real-time validation of wallet format and structure
- **Batch Processing**: Handle hundreds of wallets simultaneously
- **Error Recovery**: Robust error handling for invalid keys

### 🔧 RPC Configuration
- **Custom Endpoints**: Configure any Solana RPC endpoint
- **Popular Presets**: Quick setup for Helius, QuickNode, and others
- **Connection Testing**: Automatic RPC health checks
- **Fallback Support**: Multiple endpoint configuration for reliability
- **Rate Limit Management**: Smart request throttling

### 💰 Rent Collection Engine
- **Smart Detection**: Automatically identifies rent-eligible accounts
- **Token Burning**: Safely burns remaining tokens before account closure
- **Account Closing**: Recovers rent from closed token accounts
- **SOL Consolidation**: Transfers recovered SOL to designated fee payer
- **Transaction Optimization**: Minimizes fees through intelligent batching

### 📈 Analytics & Reporting
- **Pre-Scan Analysis**: Preview total recoverable rent before processing
- **Real-Time Progress**: Live updates during processing
- **Detailed Breakdowns**: Per-wallet and per-token analysis
- **Success Metrics**: Comprehensive processing statistics
- **Error Logging**: Detailed error reports for troubleshooting

### 🛡️ Security Features
- **Local-Only Processing**: No network transmission of private keys
- **Memory Management**: Secure memory handling and cleanup
- **Chrome Sandboxing**: Leverages Chrome's security model
- **No Data Storage**: Zero persistent storage of sensitive data
- **Audit Trail**: Transaction hash logging for verification

---

## 📦 Installation

### Option 1: Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) *(Coming Soon)*
2. Search for "Cland"
3. Click "Add to Chrome"
4. Confirm installation

### Option 2: Developer Mode (Current)
1. Download the latest release from [GitHub](https://github.com/Cland0x/Cland-collector)
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked"
5. Select the downloaded Cland folder
6. The extension will appear in your Chrome toolbar

### System Requirements
- **Browser**: Chrome 88+ or Edge 88+
- **Memory**: Minimum 4GB RAM recommended
- **Storage**: 50MB free space
- **Network**: Stable internet connection for RPC communication

---

## 🎮 Usage Guide

### Step 1: Initial Setup

#### 📁 Loading Wallet Files
1. Click the Cland extension icon in your toolbar
2. Navigate to the "Setup" tab
3. Click "Select Wallet Files"
4. Choose one or more `.txt` files containing private keys
5. Verify the wallet count matches your expectation

**Supported File Format:**
```txt
4NwwCq5bBmDwkvBkujMV19khLcYwCzLciqB3gJt7jJkX...
5PqR8vN2mK9wL3xJ7hF4tY6uI1oP9sA2dG8fH3jK6l...
7MxS4vL8nR9pK2wQ3tY6uI1oP9sA2dG8fH3jK6lB5c...
```

#### 🌐 RPC Configuration
1. Enter your preferred Solana RPC URL
2. **Recommended endpoints:**
   - Helius: `https://rpc.helius.xyz/?api-key=YOUR_API_KEY`
   - QuickNode: `https://your-endpoint.solana-mainnet.quiknode.pro/`
   - GenesysGo: `https://ssc-dao.genesysgo.net/`
3. Click "Test Connection" to verify
4. Save configuration for future use

#### 💳 Fee Payer Setup
1. Enter the private key for your fee payer wallet
2. Ensure the wallet has sufficient SOL (minimum 0.01 SOL recommended)
3. This wallet will receive all recovered SOL
4. **Security Note**: This key is stored only in browser memory

### Step 2: Analysis Phase

#### 🔍 Pre-Processing Scan
1. Click "Analyze Wallets" to start the scan
2. **Real-time metrics:**
   - Total wallets scanned
   - Token accounts discovered
   - Estimated recoverable rent
   - Processing time estimate
3. Review the detailed breakdown by wallet
4. Identify any problematic accounts

#### 📊 Rent Calculation
The extension calculates rent based on:
- **Account Data Size**: Larger accounts have higher rent
- **Minimum Balance**: Current minimum balance for rent exemption
- **Token Balance**: Remaining tokens that need burning
- **Network Conditions**: Current transaction fees

### Step 3: Processing

#### ⚡ Batch Processing
1. Review analysis results
2. Click "Start Collection" to begin processing
3. **Processing stages:**
   - Token burning (if tokens remain)
   - Account closure
   - SOL transfer to fee payer
   - Transaction confirmation
4. Monitor real-time progress

#### 📈 Live Monitoring
- **Progress Bar**: Visual processing progress
- **Success Count**: Successfully processed wallets
- **Error Count**: Failed operations with reasons
- **SOL Recovered**: Total amount collected
- **Transaction Hashes**: Links to Solana Explorer

### Step 4: Results & Reporting

#### 📋 Comprehensive Results
- **Total Processed**: Number of wallets handled
- **Success Rate**: Percentage of successful operations
- **Total Recovered**: SOL amount transferred to fee payer
- **Transaction Fees**: Total fees paid during processing
- **Net Profit**: Recovered amount minus fees
- **Processing Time**: Total operation duration

#### 🔗 Transaction Verification
- Each operation generates transaction hashes
- Click hashes to view on Solana Explorer
- Verify transfers in fee payer wallet
- Export results for record keeping

---

## ⚙️ Configuration Options

### 🔧 Advanced Settings

#### RPC Configuration
- **Custom Headers**: Add authentication headers
- **Timeout Settings**: Adjust request timeouts
- **Retry Logic**: Configure retry attempts
- **Rate Limiting**: Set requests per second

#### Processing Options
- **Batch Size**: Number of concurrent operations
- **Minimum Rent**: Threshold for processing accounts
- **Token Handling**: Burn vs. transfer options
- **Error Handling**: Continue vs. stop on errors

#### Security Settings
- **Memory Management**: Auto-cleanup intervals
- **Session Timeout**: Automatic key clearing
- **Audit Logging**: Transaction hash storage
- **Safe Mode**: Extra validation steps

---

## 🛡️ Security & Privacy

### 🔒 Security Model

#### Local-Only Processing
- **Zero Network Exposure**: Private keys never transmitted
- **Browser Sandboxing**: Chrome's security isolation
- **Memory Protection**: Secure handling and cleanup
- **No Persistence**: Keys cleared on session end

#### Data Protection
- **Encryption**: Sensitive data encrypted in memory
- **Secure Deletion**: Cryptographic key erasure
- **Audit Trail**: Non-sensitive operation logging
- **Privacy First**: No analytics or tracking

### 🛠️ Best Practices

#### Before Processing
1. **Backup Wallets**: Ensure you have secure backups
2. **Test Small Batch**: Start with 5-10 wallets
3. **Verify RPC**: Use trusted, reliable endpoints
4. **Check Balances**: Ensure fee payer has sufficient SOL

#### During Processing
1. **Stay Connected**: Maintain stable internet
2. **Monitor Progress**: Watch for errors or warnings
3. **Don't Close Browser**: Keep extension active
4. **Avoid Interruption**: Let processing complete

#### After Processing
1. **Verify Results**: Check transaction hashes
2. **Confirm Balances**: Validate fee payer received SOL
3. **Clear Session**: Close extension to clear memory
4. **Export Reports**: Save processing results

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### ❌ "Failed to Load Wallets"
**Symptoms**: Error when selecting wallet files
**Solutions**:
- Verify file format (one key per line)
- Check for empty lines or invalid characters
- Ensure file is UTF-8 encoded
- Try with a smaller test file first

#### ❌ "RPC Connection Failed"
**Symptoms**: Cannot connect to Solana network
**Solutions**:
- Verify internet connection
- Check RPC URL format and credentials
- Try alternative RPC endpoint
- Disable VPN if interfering

#### ❌ "Insufficient Funds"
**Symptoms**: Fee payer wallet lacks SOL
**Solutions**:
- Add more SOL to fee payer wallet
- Reduce batch size to lower fees
- Check current network fee rates
- Verify fee payer key is correct

#### ❌ "Rate Limit Exceeded"
**Symptoms**: Too many requests to RPC
**Solutions**:
- Wait 60 seconds before retrying
- Reduce batch size in settings
- Use premium RPC endpoint
- Switch to different RPC provider

#### ❌ "Transaction Failed"
**Symptoms**: Individual wallet processing errors
**Solutions**:
- Check wallet has sufficient SOL for fees
- Verify token accounts aren't frozen
- Review transaction hash for details
- Try processing wallet individually

### 🚨 Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `E001` | Invalid private key format | Check key format and encoding |
| `E002` | RPC endpoint unreachable | Verify URL and network connection |
| `E003` | Insufficient SOL for fees | Add SOL to fee payer or reduce batch size |
| `E004` | Token account not found | Account may already be closed |
| `E005` | Transaction timeout | Retry with longer timeout setting |
| `E006` | Account frozen/locked | Cannot process restricted accounts |
| `E007` | Network congestion | Wait and retry with higher priority fee |

### 📊 Performance Optimization

#### For Large Wallet Batches
- **Reduce Batch Size**: Process 50-100 wallets at a time
- **Premium RPC**: Use paid endpoints for better reliability
- **Optimal Timing**: Process during low network congestion
- **Memory Management**: Close other browser tabs

#### For Slow Processing
- **Check RPC Speed**: Test endpoint latency
- **Network Stability**: Use wired connection if possible
- **System Resources**: Ensure adequate RAM/CPU
- **Background Apps**: Close unnecessary programs

---

## 🔗 Advanced Features

### 🎯 Smart Filtering

#### Automatic Rent Detection
- **Minimum Thresholds**: Filters accounts below profit threshold
- **Gas Optimization**: Calculates optimal batch sizes
- **Account Analysis**: Identifies highest-value accounts first
- **Risk Assessment**: Flags potentially problematic operations

#### Token Type Handling
- **SPL Tokens**: Standard token program support
- **Token-2022**: Extended token features
- **NFTs**: Safe handling of non-fungible tokens
- **Associated Accounts**: Proper ATA management

### 📈 Analytics Integration

#### Performance Metrics
- **Processing Speed**: Wallets per minute
- **Success Rates**: Historical performance data
- **Network Efficiency**: Transaction success ratios
- **Cost Analysis**: Fee optimization insights

#### Reporting Features
- **CSV Export**: Detailed processing reports
- **JSON Logs**: Machine-readable operation data
- **Dashboard Views**: Visual progress tracking
- **Historical Data**: Previous session summaries

---

## 🌐 Network Support

### Supported Networks
- **Mainnet Beta**: Primary production network
- **Devnet**: Development and testing
- **Testnet**: Stable testing environment
- **Custom**: Any Solana-compatible network

### RPC Providers
| Provider | Performance | Rate Limits | Cost |
|----------|-------------|-------------|------|
| **Helius** | Excellent | High | Paid tiers available |
| **QuickNode** | Excellent | High | Subscription based |
| **GenesysGo** | Good | Medium | Free tier available |
| **Solana Labs** | Basic | Low | Free |
| **Custom** | Varies | Varies | User-configured |

---

## 🤝 Contributing

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Build extension: `npm run build`
4. Load in Chrome developer mode

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent formatting
- **Security**: Regular dependency audits

### Testing
- **Unit Tests**: Core functionality coverage
- **Integration Tests**: End-to-end workflows
- **Security Tests**: Vulnerability scanning
- **Performance Tests**: Load and stress testing

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

## 🆘 Support

### Getting Help
1. **Documentation**: Check this comprehensive guide
2. **GitHub Issues**: Report bugs or request features
3. **Community**: Join our Discord/Telegram
4. **Email**: Direct support for urgent issues

### Reporting Issues
When reporting problems, please include:
- **Chrome Version**: Help → About Chrome
- **Extension Version**: Extension management page
- **Error Messages**: Copy exact error text
- **Steps to Reproduce**: Detailed reproduction steps
- **Network**: RPC endpoint and network conditions

---

## 🔮 Roadmap

### Upcoming Features
- **🏪 Chrome Web Store**: Official store listing
- **📱 Mobile Support**: Progressive Web App version
- **🔄 Auto-Updates**: Seamless update mechanism
- **📊 Enhanced Analytics**: Advanced reporting dashboard
- **🌍 Multi-Language**: Internationalization support
- **🔗 Wallet Integration**: Popular wallet connections
- **⚡ Performance**: Further optimization improvements

### Long-Term Vision
- **🤖 AI Optimization**: Smart processing algorithms
- **🔮 Predictive Analytics**: Rent forecasting
- **🛡️ Advanced Security**: Hardware wallet integration
- **🌐 Cross-Chain**: Multi-blockchain support

---

## 👥 Community

Join our growing community of Solana developers and users:

- **GitHub**: [Cland-collector](https://github.com/Cland0x/Cland-collector)
- **Discord**: *Coming Soon*
- **Telegram**: *Coming Soon*
- **Twitter**: *Follow for updates*

---

*Built with ❤️ for the Solana ecosystem* 
