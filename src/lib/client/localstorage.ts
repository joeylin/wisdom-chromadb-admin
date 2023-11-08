import type { AppConfig } from '@/lib/types'

const localStorageItemKey = 'chromadb-admin-config'

export function getConfig(): AppConfig {
  const config = window.localStorage.getItem(localStorageItemKey)
  if (config) {
    return JSON.parse(config)
  } else {
    return { connectionString: '', currentCollection: '', embeddingUrl: '' }
  }
}

export function updateConfig(config: AppConfig) {
  const stringValue = JSON.stringify(config)
  return window.localStorage.setItem(localStorageItemKey, stringValue)
}

export function updateConnectionString(connectionString: string) {
  const config = getConfig() || { connectionString: '', currentCollection: '', embeddingUrl: '' }
  const newConfig = {
    ...config,
    connectionString,
  }
  return updateConfig(newConfig)
}

export function updateConfigField(connectionString: string, embeddingUrl: string) {
  const config = getConfig() || { connectionString: '', currentCollection: '', embeddingUrl: '' }
  const newConfig = {
    ...config,
    connectionString,
    embeddingUrl,
  }
  console.log(newConfig)
  return updateConfig(newConfig)
}
