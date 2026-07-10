import { defineCloudflareConfig } from '@opennextjs/cloudflare';

const cloudflareConfig = defineCloudflareConfig({});

export default {
  ...cloudflareConfig,
  buildCommand: 'pnpm run next:build',
};
