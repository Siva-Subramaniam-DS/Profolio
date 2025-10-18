/**
 * Security configuration for the portfolio application
 */

// Content Security Policy configuration
export const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for Vite in development
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net"
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for styled-components and CSS-in-JS
    "https://fonts.googleapis.com",
    "https://cdnjs.cloudflare.com"
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com",
    "https://cdnjs.cloudflare.com"
  ],
  'img-src': [
    "'self'",
    "data:",
    "https:",
    "blob:"
  ],
  'connect-src': [
    "'self'",
    "https://api.github.com",
    "https://wa.me"
  ],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'", "https://wa.me"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
};

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
};

// Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
  windowMs: 60000, // 1 minute
  maxAttempts: 3,
  skipSuccessfulRequests: true,
  skipFailedRequests: false
};

// Input validation rules
export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s\-'\.]+$/,
    required: true
  },
  email: {
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true
  },
  subject: {
    minLength: 3,
    maxLength: 100,
    required: true
  },
  message: {
    minLength: 10,
    maxLength: 1000,
    required: true
  }
};

// Allowed domains for external links
export const ALLOWED_DOMAINS = [
  'linkedin.com',
  'github.com',
  'twitter.com',
  'x.com',
  'instagram.com',
  'wa.me',
  'mailto:'
];

// Security event types
export const SECURITY_EVENTS = {
  FORM_SUBMISSION: 'form_submission',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  VALIDATION_FAILED: 'validation_failed',
  XSS_ATTEMPT: 'xss_attempt',
  CSRF_VIOLATION: 'csrf_violation',
  BOT_DETECTED: 'bot_detected',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  SECURITY_HEADER_MISSING: 'security_header_missing',
  INSECURE_CONNECTION: 'insecure_connection'
};

// Environment-specific configurations
export const getSecurityConfig = () => {
  const isProduction = import.meta.env.MODE === 'production';
  const isDevelopment = import.meta.env.MODE === 'development';

  return {
    enableCSP: import.meta.env.VITE_ENABLE_CSP !== 'false',
    enableSecurityHeaders: import.meta.env.VITE_ENABLE_SECURITY_HEADERS !== 'false',
    enableRateLimiting: import.meta.env.VITE_ENABLE_RATE_LIMITING !== 'false',
    forceHTTPS: isProduction && import.meta.env.VITE_FORCE_HTTPS !== 'false',
    enableHSTS: isProduction && import.meta.env.VITE_ENABLE_HSTS !== 'false',
    enableConsoleLogs: isDevelopment || import.meta.env.VITE_ENABLE_CONSOLE_LOGS === 'true',
    enableDebugMode: isDevelopment && import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
    maxFormAttempts: parseInt(import.meta.env.VITE_MAX_FORM_ATTEMPTS) || 3,
    rateLimitWindow: parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW) || 60000,
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '919150908294'
  };
};

export default {
  CSP_CONFIG,
  SECURITY_HEADERS,
  RATE_LIMIT_CONFIG,
  VALIDATION_RULES,
  ALLOWED_DOMAINS,
  SECURITY_EVENTS,
  getSecurityConfig
};