/**
 * Security utilities for portfolio protection
 */

// Input sanitization function
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/script/gi, '') // Remove script references
    .trim()
    .slice(0, 1000); // Limit length
};

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Phone number validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
};

// Rate limiting for form submissions
class RateLimiter {
  constructor(maxAttempts = 3, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    
    return true;
  }

  getRemainingTime(identifier) {
    const userAttempts = this.attempts.get(identifier) || [];
    if (userAttempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...userAttempts);
    const remainingTime = this.windowMs - (Date.now() - oldestAttempt);
    
    return Math.max(0, remainingTime);
  }
}

export const formRateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute

// Generate CSRF token
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Content Security Policy nonce generator
export const generateNonce = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
};

// XSS Protection
export const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Secure URL validation
export const isSecureUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return ['https:', 'mailto:', 'tel:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Environment detection
export const isProduction = () => {
  return import.meta.env.MODE === 'production';
};

// Security headers validation
export const validateSecurityHeaders = () => {
  const requiredHeaders = [
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Referrer-Policy'
  ];
  
  // This would be used server-side to validate headers
  return requiredHeaders;
};

// Honeypot field for bot detection
export const createHoneypot = () => {
  return {
    name: 'website', // Common bot target field
    style: {
      position: 'absolute',
      left: '-9999px',
      opacity: 0,
      pointerEvents: 'none',
      tabIndex: -1
    }
  };
};

// Security event logger
export const logSecurityEvent = (event, details = {}) => {
  if (isProduction()) {
    // In production, you might want to send this to a logging service
    console.warn(`Security Event: ${event}`, details);
  } else {
    console.log(`Security Event: ${event}`, details);
  }
};