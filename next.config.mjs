/** @type {import('next').NextConfig} */
const nextConfig = {
  // ---------------------------------------------------------------------------
  // Security Headers & Hardening — AppSec scan 2026-09-07.
  // Fix: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
  //      Permissions-Policy, Cross-Origin-Opener-Policy, CORS override,
  //      ETag disabilitato (anti-fingerprinting).
  // ---------------------------------------------------------------------------

  // Disabilita ETag per evitare fingerprinting della versione dei contenuti.
  generateEtags: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // --- CORS: sovrascrive il wildcard (*) impostato dalla piattaforma Vercel ---
          // Il portfolio non ha API pubbliche cross-origin. Il dominio esatto e'
          // l'unica origine autorizzata.
          { key: "Access-Control-Allow-Origin", value: "https://nicolasolazzo.com" },

          // --- Content-Security-Policy: restringe le fonti consentite ---
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },

          // --- Altri security headers ---
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
