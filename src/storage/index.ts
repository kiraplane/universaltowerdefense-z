import { websiteConfig } from '@/config/website';
import { storageConfig } from './config/storage-config';
import { S3Provider } from './provider/s3';
import { S3AwsSdkProvider } from './provider/s3-aws-sdk';
import type { StorageConfig, StorageProvider, UploadFileResult } from './types';

/**
 * Default storage configuration
 */
export const defaultStorageConfig: StorageConfig = storageConfig;

/**
 * Global storage provider instance
 */
let storageProvider: StorageProvider | null = null;

/**
 * Get the storage provider
 * @returns current storage provider instance
 * @throws Error if provider is not initialized
 */
export const getStorageProvider = (): StorageProvider => {
  if (!storageProvider) {
    return initializeStorageProvider();
  }
  return storageProvider;
};

/**
 * Initialize the storage provider
 * @returns initialized storage provider
 */
export const initializeStorageProvider = (): StorageProvider => {
  if (!storageProvider) {
    const provider = websiteConfig.storage.provider;

    if (provider === 's3-aws-sdk' || provider === 'aws-sdk') {
      console.log('[Storage] Using AWS SDK v3 provider (recommended)');
      storageProvider = new S3AwsSdkProvider();
    } else if (provider === 's3' || provider === 's3mini') {
      console.log(
        '[Storage] Using s3mini provider (legacy, may have compatibility issues)'
      );
      storageProvider = new S3Provider();
    } else {
      // Default to AWS SDK v3 for better compatibility
      console.log(
        `[Storage] Unknown provider: ${provider}, using AWS SDK v3 as default`
      );
      storageProvider = new S3AwsSdkProvider();
    }
  }
  return storageProvider;
};

/**
 * Uploads a file to the configured storage provider
 *
 * @param file - The file to upload (Buffer or Blob)
 * @param filename - Original filename with extension
 * @param contentType - MIME type of the file
 * @param folder - Optional folder path to store the file in
 * @returns Promise with the URL of the uploaded file and its storage key
 */
export const uploadFile = async (
  file: Buffer | Blob,
  filename: string,
  contentType: string,
  folder?: string
): Promise<UploadFileResult> => {
  const provider = getStorageProvider();
  return provider.uploadFile({ file, filename, contentType, folder });
};

/**
 * Deletes a file from the storage provider
 *
 * @param key - The storage key of the file to delete
 * @returns Promise that resolves when the file is deleted
 */
export const deleteFile = async (key: string): Promise<void> => {
  const provider = getStorageProvider();
  return provider.deleteFile(key);
};
