import React, { useState, useEffect } from 'react'
import { Wallet, Settings, Play, FileText, AlertCircle, CheckCircle, Loader2, BarChart3 } from 'lucide-react'
import { WalletInfo, RentCollectionSummary, ProcessingProgress } from '../types'
import { WalletManager } from '../utils/wallet-manager'
import { RentCollector } from '../services/rent-collector'
import { StorageService } from '../services/storage'

function App() {
  const [step, setStep] = useState<'setup' | 'collecting' | 'results'>('setup')
  const [wallets, setWallets] = useState<WalletInfo[]>([])
  const [walletFiles, setWalletFiles] = useState<string[]>([])
  const [rpcUrl, setRpcUrl] = useState('https://api.mainnet-beta.solana.com')
  const [feePayerKey, setFeePayerKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [processingResults, setProcessingResults] = useState<RentCollectionSummary | null>(null)
  const [scanProgress, setScanProgress] = useState<ProcessingProgress | null>(null)
  const [totalCollected, setTotalCollected] = useState<number>(0)

  // Wallet Manager and Rent Collector instances
  const [walletManager] = useState(() => new WalletManager())
  const [rentCollector, setRentCollector] = useState<RentCollector | null>(null)

  // Load saved configuration on app start
  useEffect(() => {
    const loadSavedConfig = async () => {
      try {
        const config = await StorageService.loadConfig()
        if (config.rpcUrl) {
          setRpcUrl(config.rpcUrl)
        }
        if (config.feePayerKey) {
          setFeePayerKey(config.feePayerKey)
        }
      } catch (error) {
        console.error('Failed to load saved config:', error)
      }
    }
    
    loadSavedConfig()
  }, [])

  // Initialize rent collector when RPC URL changes
  useEffect(() => {
    if (rpcUrl) {
      setRentCollector(new RentCollector(rpcUrl, walletManager))
    }
  }, [rpcUrl, walletManager])

  const handleSelectWalletFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const files = event.target.files
      if (!files || files.length === 0) return

      const result = await walletManager.loadWalletsFromFiles(files)
      setWallets(result.wallets)
      setWalletFiles(prev => [...prev, ...result.fileNames])
      
      const fileCount = result.fileNames.length
      const totalCount = result.wallets.length
      
      if (fileCount > 1) {
        setSuccess(`Loaded ${totalCount} wallets from ${fileCount} files`)
      } else {
        setSuccess(`Loaded ${totalCount} wallets from ${result.fileNames[0] || 'file'}`)
      }
      setStep('setup')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load wallets')
    } finally {
      setIsLoading(false)
      // Reset file input
      event.target.value = ''
    }
  }

  const handleClearWallets = () => {
    walletManager.clearWallets()
    setWallets([])
    setWalletFiles([])
    setSuccess('Wallets cleared')
  }

  const handleSetRpcUrl = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      await StorageService.saveRpcUrl(rpcUrl)
      setSuccess('RPC URL set successfully')
    } catch (err) {
      setError('Failed to set RPC URL')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetFeePayer = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      if (!WalletManager.validatePrivateKey(feePayerKey)) {
        setError('Invalid private key format')
        return
      }

      await StorageService.saveFeePayerKey(feePayerKey)
      
      if (rentCollector) {
        rentCollector.setFeePayer(feePayerKey)
      }
      
      setSuccess('Fee payer set successfully')
    } catch (err) {
      setError('Failed to set fee payer')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProcessWallets = async () => {
    try {
      if (!rentCollector) {
        setError('RPC connection not initialized')
        return
      }

      setIsLoading(true)
      setError(null)
      setStep('collecting')
      setScanProgress(null)
      setTotalCollected(0)
      
      // Set fee payer if not already set
      if (feePayerKey) {
        rentCollector.setFeePayer(feePayerKey)
      }
      
      const result = await rentCollector.processAllWallets((progress) => {
        setScanProgress(progress)
        // Extract SOL amount from status if it contains collection info
        if (progress.status.includes('Collected') && progress.status.includes('SOL')) {
          const match = progress.status.match(/Collected ([\d.]+) SOL/)
          if (match) {
            const collectedAmount = parseFloat(match[1])
            setTotalCollected(prev => prev + collectedAmount)
          }
        }
      })
      
      setProcessingResults(result)
      setTotalCollected(result.totalRentCollected / 1e9)
      setSuccess('Rent collection completed!')
      setStep('results')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process wallets')
    } finally {
      setIsLoading(false)
      setScanProgress(null)
    }
  }

  // Check if all required configurations are set
  const isAnalyzeReady = wallets.length > 0 && rpcUrl.trim() && feePayerKey.trim()

  return (
    <div className="container">
      <header className="app-header">
        <div className="header-left">
          <img src="public/cland-logo.png" alt="Cland" className="cland-logo" />
          <h1>Cland</h1>
        </div>
        <div className="tagline">Solana Rent Recovery</div>
      </header>

              <div className="main-content">
          {/* Progress Steps */}
          <div className="progress-steps">
          <div className={`step ${step === 'setup' ? 'active' : step === 'collecting' || step === 'results' ? 'completed' : ''}`}>
            <Settings className="h-5 w-5" />
          </div>
          <div className={`step-connector ${step === 'collecting' || step === 'results' ? 'active' : ''}`}></div>
          <div className={`step ${step === 'collecting' ? 'active' : step === 'results' ? 'completed' : ''}`}>
            <Play className="h-5 w-5" />
          </div>
          <div className={`step-connector ${step === 'results' ? 'active' : ''}`}></div>
          <div className={`step ${step === 'results' ? 'active' : ''}`}>
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="message error">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {success && (
          <div className="message success">
            <CheckCircle className="h-5 w-5" />
            {success}
          </div>
        )}

        {/* Setup Step */}
        {step === 'setup' && (
          <div>
            <div className="grid-2">
              {/* Wallet File Selection */}
              <div className="card">
                <h2>
                  <FileText className="h-5 w-5" />
                  Load Wallets
                </h2>
                <p className="text-dim mb-4">
                  Select text files containing wallet private keys (one per line)
                </p>
                <label className="btn btn-primary w-full cursor-pointer">
                  {isLoading ? <Loader2 className="spinner" /> : <FileText className="h-4 w-4" />}
                  Add Wallet Files
                  <input
                    type="file"
                    multiple
                    accept=".txt,.csv"
                    onChange={handleSelectWalletFile}
                    className="hidden"
                    disabled={isLoading}
                  />
                </label>
                {wallets.length > 0 && (
                  <div className="mt-2">
                    <p className="text-dim text-sm mb-2">
                      Loaded {wallets.length} wallets from {walletFiles.length} file{walletFiles.length !== 1 ? 's' : ''}
                    </p>
                    {walletFiles.length > 0 && (
                      <div className="text-dim text-xs mb-2">
                        Files: {walletFiles.join(', ')}
                      </div>
                    )}
                    <button
                      onClick={handleClearWallets}
                      className="btn btn-secondary text-xs"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {/* RPC Configuration */}
              <div className="card">
                <h2>RPC Configuration</h2>
                {rpcUrl.includes('api.mainnet-beta.solana.com') && (
                  <div className="message error mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <div>
                      <strong>Warning:</strong> The default Solana RPC has very low rate limits and will cause errors when processing many wallets.
                      <br />
                      <strong>Recommendation:</strong> Use <a href="https://helius.xyz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>Helius RPC</a> (free tier available) for better performance.
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <label>RPC URL</label>
                  <input
                    type="text"
                    value={rpcUrl}
                    onChange={(e) => setRpcUrl(e.target.value)}
                    placeholder="https://api.mainnet-beta.solana.com"
                  />
                </div>
                <button
                  onClick={handleSetRpcUrl}
                  disabled={isLoading}
                  className="btn btn-secondary w-full"
                >
                  Set RPC URL
                </button>
              </div>
            </div>

            {/* Fee Payer Configuration */}
            <div className="card">
              <h2>Fee Payer Configuration</h2>
              <p className="text-dim mb-4">
                Set a wallet that will pay transaction fees for all operations
              </p>
              <div className="form-group">
                <label>Fee Payer Private Key</label>
                <input
                  type="password"
                  value={feePayerKey}
                  onChange={(e) => setFeePayerKey(e.target.value)}
                  placeholder="Enter private key"
                />
              </div>
              <button
                onClick={handleSetFeePayer}
                disabled={isLoading}
                className="btn btn-secondary w-full"
              >
                Set Fee Payer
              </button>
            </div>

            {/* Process Button */}
            <div className="text-center">
              <button
                onClick={handleProcessWallets}
                disabled={!isAnalyzeReady || isLoading}
                className="btn btn-primary btn-large"
              >
                {isLoading ? <Loader2 className="spinner" /> : <Play className="h-5 w-5" />}
                Start Rent Collection
              </button>
              {!isAnalyzeReady && (
                <p className="text-dim text-sm mt-2">
                  Please load wallets, set RPC URL, and configure fee payer to continue
                </p>
              )}
            </div>
          </div>
        )}

        {/* Collecting Step */}
        {step === 'collecting' && (
          <div className="text-center">
            <div className="processing-animation">
              <Loader2 className="spinner large" />
            </div>
            <h2>Processing Wallets</h2>
            <p className="text-dim mb-6">Analyzing token accounts and collecting rent...</p>
            
            {scanProgress && (
              <div className="progress-info">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(scanProgress.current / scanProgress.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm">
                  Wallet {scanProgress.current} of {scanProgress.total}
                </p>
                <p className="text-xs text-dim">
                  {scanProgress.status}
                </p>
                {totalCollected > 0 && (
                  <p className="text-sm font-bold" style={{ color: 'var(--success-color)' }}>
                    Total Collected: {totalCollected.toFixed(6)} SOL
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Results Step */}
        {step === 'results' && processingResults && (
          <div>
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--success-color)' }} />
              <h2>Collection Complete!</h2>
              <p className="text-dim">Rent collection process finished</p>
            </div>

            <div className="grid-2">
              <div className="card">
                <h3>
                  <BarChart3 className="h-5 w-5" />
                  Summary
                </h3>
                <div className="stats">
                  <div className="stat">
                    <span className="stat-label">Total Wallets</span>
                    <span className="stat-value">{processingResults.totalWallets}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Successful Collections</span>
                    <span className="stat-value">{processingResults.successfulCollections}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Failed Collections</span>
                    <span className="stat-value">{processingResults.failedCollections}</span>
                  </div>
                  <div className="stat highlight">
                    <span className="stat-label">Total Rent Collected</span>
                    <span className="stat-value">{(processingResults.totalRentCollected / 1e9).toFixed(6)} SOL</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>Next Steps</h3>
                <p className="text-dim mb-4">
                  The rent collection process is complete. All recovered SOL has been sent to your fee payer wallet.
                </p>
                <button
                  onClick={() => {
                    setStep('setup')
                    setProcessingResults(null)
                    setTotalCollected(0)
                    setScanProgress(null)
                  }}
                  className="btn btn-primary w-full"
                >
                  Process More Wallets
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App 