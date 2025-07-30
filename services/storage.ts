import { ExtensionConfig } from '../types';

export class StorageService {
  private static readonly CONFIG_KEY = 'solana_rent_collector_config';

  /**
   * Save configuration to Chrome Extension storage
   */
  static async saveConfig(config: ExtensionConfig): Promise<void> {
    try {
      await chrome.storage.local.set({
        [this.CONFIG_KEY]: config
      });
      console.log('Configuration saved:', config);
    } catch (error) {
      console.error('Failed to save configuration:', error);
      throw new Error('Failed to save configuration');
    }
  }

  /**
   * Load configuration from Chrome Extension storage
   */
  static async loadConfig(): Promise<ExtensionConfig> {
    try {
      const result = await chrome.storage.local.get([this.CONFIG_KEY]);
      const config = result[this.CONFIG_KEY] || {};
      console.log('Configuration loaded:', config);
      return config;
    } catch (error) {
      console.error('Failed to load configuration:', error);
      return {};
    }
  }

  /**
   * Clear all stored configuration
   */
  static async clearConfig(): Promise<void> {
    try {
      await chrome.storage.local.remove([this.CONFIG_KEY]);
      console.log('Configuration cleared');
    } catch (error) {
      console.error('Failed to clear configuration:', error);
      throw new Error('Failed to clear configuration');
    }
  }

  /**
   * Save RPC URL
   */
  static async saveRpcUrl(rpcUrl: string): Promise<void> {
    const config = await this.loadConfig();
    config.rpcUrl = rpcUrl;
    await this.saveConfig(config);
  }

  /**
   * Save fee payer key
   */
  static async saveFeePayerKey(feePayerKey: string): Promise<void> {
    const config = await this.loadConfig();
    config.feePayerKey = feePayerKey;
    await this.saveConfig(config);
  }

  /**
   * Get RPC URL
   */
  static async getRpcUrl(): Promise<string> {
    const config = await this.loadConfig();
    return config.rpcUrl || 'https://api.mainnet-beta.solana.com';
  }

  /**
   * Get fee payer key
   */
  static async getFeePayerKey(): Promise<string> {
    const config = await this.loadConfig();
    return config.feePayerKey || '';
  }
} 