import type { NextConfig } from 'next';

/**
 * Detect environment:
 * - When deployed via Kubernetes, ENVIRONMENT is passed via ConfigMap.
 * - When deployed via Vercel, use VERCEL_ENV or NODE_ENV.
 */
const ENVIRONMENT =
  process.env.ENVIRONMENT ||
  process.env.VERCEL_ENV ||
  process.env.NODE_ENV ||
  'development';

/**
 * Select API URLs and environment-specific settings.
 */
const API_URL =
  ENVIRONMENT === 'production'
    ? 'https://my-service-ten.vercel.app'
    : ENVIRONMENT === 'staging'
    ? 'https://stg-my-service-ten.vercel.app'
    : 'http://localhost:3000';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  /**
   * Environment variables exposed to browser (NEXT_PUBLIC_*)
   * and available in server-side runtime.
   */
  env: {
    NEXT_PUBLIC_API_URL: API_URL,
    ENVIRONMENT,
    LOG_LEVEL: ENVIRONMENT === 'production' ? 'info' : 'debug',
  },

  /**
   * For image optimization — adjust based on your CDN or image source domains.
   */
  images: {
    domains: ['assets.vercel.com', 'cdn.mycompany.com'],
  },

  /**
   * Optional: Redirect or rewrite legacy routes.
   */
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
