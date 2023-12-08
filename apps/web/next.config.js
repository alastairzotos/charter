module.exports = {
  reactStrictMode: false,
  experimental: {
    transpilePackages: ["ui"],
  },
  images: {
    domains: ['d3tr1qr2feu6jb.cloudfront.net']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN: process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN,
    NEXT_PUBLIC_INSTANCE_ID: process.env.NEXT_PUBLIC_INSTANCE_ID,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
};
