import { randomUUID } from 'crypto';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { storageConfig } from '../config/storage-config';
import {
  ConfigurationError,
  type StorageConfig,
  StorageError,
  type StorageProvider,
  UploadError,
  type UploadFileParams,
  type UploadFileResult,
} from '../types';

/**
 * Amazon S3 storage provider implementation using AWS SDK v3
 *
 * This provider works with Amazon S3 and compatible services like Cloudflare R2
 * using the official AWS SDK v3, which has better compatibility than s3mini
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/
 * https://developers.cloudflare.com/r2/api/s3/api/
 */
export class S3AwsSdkProvider implements StorageProvider {
  private config: StorageConfig;
  private s3Client: S3Client | null = null;

  constructor(config: StorageConfig = storageConfig) {
    this.config = config;
  }

  /**
   * Get the provider name
   */
  public getProviderName(): string {
    return 'S3-AWS-SDK';
  }

  /**
   * Get the S3 client instance
   */
  private getS3Client(): S3Client {
    if (this.s3Client) {
      return this.s3Client;
    }

    const { region, endpoint, accessKeyId, secretAccessKey } = this.config;

    if (!region) {
      throw new ConfigurationError('Storage region is not configured');
    }

    if (!accessKeyId || !secretAccessKey) {
      throw new ConfigurationError('Storage credentials are not configured');
    }

    if (!endpoint) {
      throw new ConfigurationError('Storage endpoint is required');
    }

    // AWS SDK v3 client configuration
    this.s3Client = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      // Force path style for Cloudflare R2 compatibility
      forcePathStyle: this.config.forcePathStyle ?? true,
    });

    return this.s3Client;
  }

  /**
   * Generate a unique filename with the original extension
   */
  private generateUniqueFilename(originalFilename: string): string {
    const extension = originalFilename.split('.').pop() || '';
    const uuid = randomUUID();
    return `${uuid}${extension ? `.${extension}` : ''}`;
  }

  /**
   * Upload a file to S3
   */
  public async uploadFile(params: UploadFileParams): Promise<UploadFileResult> {
    try {
      const { file, filename, contentType, folder } = params;
      const s3 = this.getS3Client();
      const { bucketName } = this.config;

      if (!bucketName) {
        throw new ConfigurationError('Storage bucket name is not configured');
      }

      const uniqueFilename = this.generateUniqueFilename(filename);
      const key = folder ? `${folder}/${uniqueFilename}` : uniqueFilename;

      // Convert file to Buffer if needed
      let fileContent: Buffer;
      if (file instanceof Blob) {
        fileContent = Buffer.from(await file.arrayBuffer());
      } else if (file instanceof Buffer) {
        fileContent = file;
      } else if (typeof file === 'string') {
        fileContent = Buffer.from(file);
      } else {
        throw new Error('Unsupported file type');
      }

      // Upload the file using AWS SDK v3
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
        ContentType: contentType,
      });

      await s3.send(command);

      // Generate the URL
      const { publicUrl } = this.config;
      let url: string;

      if (publicUrl) {
        // Use custom domain if provided
        url = `${publicUrl.replace(/\/$/, '')}/${key}`;
        console.log('uploadFile, public url', url);
      } else {
        // Construct URL from endpoint
        const baseUrl = this.config.endpoint?.replace(/\/$/, '') || '';
        url = `${baseUrl}/${bucketName}/${key}`;
        console.log('uploadFile, constructed url', url);
      }

      return { url, key };
    } catch (error) {
      if (error instanceof ConfigurationError) {
        console.error('uploadFile, configuration error', error);
        throw error;
      }

      // Enhanced error handling for network issues
      let message = 'Unknown error occurred during file upload';

      if (error instanceof Error) {
        const errorMessage = error.message;
        const errorCode = (error as any).code;
        const errorName = (error as any).name;

        // AWS SDK specific errors
        if (errorName === 'NetworkingError' || errorCode === 'ENOTFOUND') {
          message =
            'S3 network error: Cannot resolve storage endpoint. Please check your network connection and DNS settings.';
          console.error('uploadFile, DNS resolution failed:', {
            endpoint: this.config.endpoint,
            errorCode,
            errorName,
            errorMessage,
          });
        } else if (errorCode === 'ECONNREFUSED') {
          message =
            'S3 network error: Connection refused. Please check your storage endpoint configuration.';
          console.error('uploadFile, connection refused:', {
            endpoint: this.config.endpoint,
            errorCode,
            errorMessage,
          });
        } else if (
          errorCode === 'ETIMEDOUT' ||
          errorMessage.includes('timeout')
        ) {
          message =
            'S3 network error: Connection timeout. Please check your network connection.';
          console.error('uploadFile, connection timeout:', {
            endpoint: this.config.endpoint,
            errorCode,
            errorMessage,
          });
        } else if (errorName === 'CredentialsProviderError') {
          message =
            'S3 authentication error: Invalid credentials. Please check your access key and secret key.';
          console.error('uploadFile, credentials error:', errorMessage);
        } else if (errorName === 'NoSuchBucket') {
          message =
            'S3 error: Bucket does not exist. Please check your bucket name.';
          console.error('uploadFile, bucket error:', errorMessage);
        } else {
          message = errorMessage;
        }
      }

      console.error('uploadFile, error', message);
      throw new UploadError(message);
    }
  }

  /**
   * Delete a file from S3
   */
  public async deleteFile(key: string): Promise<void> {
    try {
      const s3 = this.getS3Client();
      const { bucketName } = this.config;

      if (!bucketName) {
        throw new ConfigurationError('Storage bucket name is not configured');
      }

      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      await s3.send(command);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown error occurred during file deletion';
      console.error('deleteFile, error', message);
      throw new StorageError(message);
    }
  }
}
