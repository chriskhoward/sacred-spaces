import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'vumbnail.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.google-analytics.com https://*.clerk.accounts.dev https://accounts.clerk.com https://js.clerk.com https://*.clerk.com https://*.sanity-cdn.com https://*.sanity.io https://*.fillout.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://cdn.sanity.io https://img.clerk.com https://img.youtube.com https://i.ytimg.com https://vumbnail.com https://lh3.googleusercontent.com https://*.google-analytics.com https://*.googletagmanager.com",
              "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://*.clerk.accounts.dev https://accounts.clerk.com https://js.clerk.com https://*.clerk.com https://*.fillout.com",
              "connect-src 'self' https://*.clerk.com https://*.clerk.accounts.dev https://*.sanity.io https://*.apicdn.sanity.io https://*.sanity-cdn.com https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://*.fillout.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "worker-src 'self' blob:",
            ].join('; ')
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
