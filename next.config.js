// woopra and sentry are used by onfido
const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' www.woopra.com;
  child-src 'self';
  connect-src 'self' api.onfido.com www.woopra.com sentry.io ws://sync.onfido.com wss://sync.onfido.com;
  img-src 'self' assets.onfido.com blob: data:;
  style-src 'self' cdn.jsdelivr.net maxcdn.bootstrapcdn.com 'unsafe-inline';
  font-src 'self' maxcdn.bootstrapcdn.com;  
`;

// https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'Access-Control-Expose-Headers',
    value: '*',
  },
  {
    key: 'Access-Control-Max-Age',
    value: '30',
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: '*',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'unsafe-none',
  },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'POST, GET, OPTIONS',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-site',
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: process.env.NEXT_PUBLIC_BASE_URL,
  },
  {
    key: 'Access-Control-Allow-Credentials',
    value: 'false',
  },
];

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
