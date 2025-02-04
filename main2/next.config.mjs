//next.config.mjs
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  target: 'serverless',
  experimental: {
    outputStandalone: true, // Standalone mode for Cloudflare workers
  },
};


export default nextConfig;