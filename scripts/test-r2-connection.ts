/**
 * R2 Connection Test Script
 *
 * This script tests the connection to Cloudflare R2 storage
 * and helps diagnose upload issues.
 *
 * Usage:
 *   tsx scripts/test-r2-connection.ts
 */

import { resolve } from 'path';
// Load environment variables from .env file
import { config } from 'dotenv';

// Load .env file
config({ path: resolve(process.cwd(), '.env') });

import { storageConfig } from '../src/storage/config/storage-config';
import { S3AwsSdkProvider } from '../src/storage/provider/s3-aws-sdk';

async function testR2Connection() {
  console.log('='.repeat(60));
  console.log('🧪 R2 Connection Test');
  console.log('='.repeat(60));
  console.log();

  // Step 1: Check environment variables
  console.log('📋 Step 1: Checking environment variables...');
  console.log('---');
  console.log('STORAGE_REGION:', storageConfig.region || '❌ NOT SET');
  console.log('STORAGE_BUCKET_NAME:', storageConfig.bucketName || '❌ NOT SET');
  console.log('STORAGE_ENDPOINT:', storageConfig.endpoint || '❌ NOT SET');
  console.log('STORAGE_PUBLIC_URL:', storageConfig.publicUrl || '(optional)');
  console.log(
    'STORAGE_ACCESS_KEY_ID:',
    storageConfig.accessKeyId ? '✅ SET' : '❌ NOT SET'
  );
  console.log(
    'STORAGE_SECRET_ACCESS_KEY:',
    storageConfig.secretAccessKey ? '✅ SET' : '❌ NOT SET'
  );
  console.log();

  // Check for missing required variables
  if (
    !storageConfig.region ||
    !storageConfig.bucketName ||
    !storageConfig.endpoint ||
    !storageConfig.accessKeyId ||
    !storageConfig.secretAccessKey
  ) {
    console.error('❌ ERROR: Missing required environment variables');
    console.error(
      'Please check your .env file and ensure all STORAGE_* variables are set'
    );
    process.exit(1);
  }

  // Step 2: Test DNS resolution
  console.log('🔍 Step 2: Testing DNS resolution...');
  console.log('---');
  try {
    const dns = require('dns').promises;
    const hostname = new URL(storageConfig.endpoint!).hostname;
    console.log(`Resolving: ${hostname}`);

    const addresses = await dns.resolve4(hostname);
    console.log('✅ DNS Resolution successful');
    console.log('IP addresses:', addresses);
  } catch (error: any) {
    console.error('❌ DNS Resolution failed:', error.code || error.message);
    console.error('This may cause upload failures in production');
    console.error();
    console.error('Possible solutions:');
    console.error('1. Check your network connection');
    console.error('2. Try using NODE_OPTIONS="--dns-result-order=ipv4first"');
    console.error(
      '3. Add nodejs_compat flag in wrangler.toml (for Cloudflare Workers)'
    );
  }
  console.log();

  // Step 3: Test HTTP connection
  console.log('🌐 Step 3: Testing HTTP connection...');
  console.log('---');
  try {
    const response = await fetch(storageConfig.endpoint!);
    console.log('HTTP Status:', response.status);
    console.log('✅ HTTP connection successful');
  } catch (error: any) {
    console.error('❌ HTTP connection failed:', error.message);
    console.error('Check if the endpoint URL is correct');
  }
  console.log();

  // Step 4: Test S3 provider initialization
  console.log('🔧 Step 4: Initializing S3 Provider (AWS SDK v3)...');
  console.log('---');
  try {
    const provider = new S3AwsSdkProvider();
    console.log('✅ S3 Provider initialized');
    console.log('Provider name:', provider.getProviderName());
  } catch (error: any) {
    console.error('❌ Failed to initialize S3 Provider:', error.message);
    process.exit(1);
  }
  console.log();

  // Step 5: Test file upload
  console.log('📤 Step 5: Testing file upload...');
  console.log('---');
  try {
    const provider = new S3AwsSdkProvider();
    const testContent = Buffer.from(
      `Test upload at ${new Date().toISOString()}`
    );
    const testFilename = `test-${Date.now()}.txt`;

    console.log('Uploading test file:', testFilename);
    const result = await provider.uploadFile({
      file: testContent,
      filename: testFilename,
      contentType: 'text/plain',
      folder: 'connection-test',
    });

    console.log('✅ Upload successful!');
    console.log('File URL:', result.url);
    console.log('File Key:', result.key);
    console.log();
    console.log('🎉 All tests passed! R2 connection is working correctly.');
  } catch (error: any) {
    console.error('❌ Upload failed!');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);

    if (error.code) {
      console.error('Error code:', error.code);
    }

    if (error.cause) {
      console.error('Caused by:', error.cause);
    }

    console.error();
    console.error('💡 Troubleshooting tips:');
    console.error('1. Verify your R2 API credentials are correct');
    console.error('2. Check if the bucket name matches your R2 bucket');
    console.error('3. Ensure the endpoint URL is correct');
    console.error('4. Verify API token has read & write permissions');
    console.error('5. Check network connectivity and DNS resolution');
    console.error();
    console.error('For detailed troubleshooting, see:');
    console.error('- docs/troubleshooting-network.md');
    console.error('- docs/production-upload-issues.md');

    process.exit(1);
  }

  console.log();
  console.log('='.repeat(60));
}

// Run the test
testR2Connection().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
