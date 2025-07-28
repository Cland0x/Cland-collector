# Cland - Solana Rent Collector Chrome Extension

A secure Chrome extension for collecting rent from Solana token accounts efficiently and securely.

## Features

- 🔒 **Secure**: All operations performed locally - private keys never leave your browser
- ⚡ **Fast**: Optimized batch processing for multiple wallets
- 🎨 **Modern UI**: Clean, professional interface
- 🔄 **Token Support**: Both SPL Token and Token-2022 programs
- 📊 **Real-time Progress**: Live updates during rent collection
- 🔧 **Configurable**: Custom RPC endpoints support

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select this folder
5. The Cland extension will appear in your Chrome toolbar

## Usage

1. **Load Wallets**: Upload `.txt` files containing private keys (one per line)
2. **Configure RPC**: Set your Solana RPC URL (Helius recommended)  
3. **Set Fee Payer**: Provide a wallet to pay transaction fees
4. **Collect Rent**: Click "Start Rent Collection" and watch the progress

## File Format

Your wallet file should contain one private key per line:
```
4NwwCq5bBmDwkvBkujMV19khLcYwCzLciqB3gJt7jJkX...
5PqR8vN2mK9wL3xJ7hF4tY6uI1oP9sA2dG8fH3jK6l...
```

## Security

- ✅ All processing happens locally in your browser
- ✅ Private keys are never transmitted over the network
- ✅ Minimal permissions required (only "storage")
- ✅ No data collection or external servers

## Built With

- React + TypeScript
- Solana Web3.js
- Chrome Extension Manifest V3
- Vite build system

## License

MIT License

---

**Note**: This extension is designed for legitimate Solana rent collection purposes. Always verify transactions and use at your own risk.
