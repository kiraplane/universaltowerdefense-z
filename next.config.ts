import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * https://nextjs.org/docs/app/api-reference/config/next-config-js
 */
const nextConfig: NextConfig = {
  // Keep dev output separate from production builds so switching between
  // `next dev` and `next build` does not leave mixed server chunks behind.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',

  // Docker standalone output
  ...(process.env.DOCKER_BUILD === 'true' && { output: 'standalone' }),

  /* config options here */
  devIndicators: false,

  // Use in-memory webpack cache in dev to prevent cache file corruption
  // when multiple dev server instances run simultaneously
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: 'memory' };
    }
    return config;
  },

  // Increase body size limit for file uploads (video files)
  // https://nextjs.org/docs/app/api-reference/next-config-js/serverActions
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb', // Allow up to 100MB for video uploads
    },
  },

  // https://nextjs.org/docs/architecture/nextjs-compiler#remove-console
  // Remove all console.* calls in production only
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },

  images: {
    // https://vercel.com/docs/image-optimization/managing-image-optimization-costs#minimizing-image-optimization-costs
    // https://nextjs.org/docs/app/api-reference/components/image#unoptimized
    // vercel has limits on image optimization, 1000 images per month
    unoptimized: process.env.DISABLE_IMAGE_OPTIMIZATION === 'true',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'html.tailus.io',
      },
      {
        protocol: 'https',
        hostname: 'service.firecrawl.dev',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
};

/**
 * You can specify the path to the request config file or use the default one (@/i18n/request.ts)
 *
 * https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#next-config
 */
const withNextIntl = createNextIntlPlugin();

initOpenNextCloudflareForDev();

export default withNextIntl(nextConfig);
