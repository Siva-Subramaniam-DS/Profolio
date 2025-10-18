import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateCSRFToken, logSecurityEvent, isProduction } from '../utils/security';

const SecurityContext = createContext();

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};

export const SecurityProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');
  const [securityHeaders, setSecurityHeaders] = useState({});
  const [isSecureConnection, setIsSecureConnection] = useState(false);

  useEffect(() => {
    // Initialize security measures
    initializeSecurity();
    
    // Check for secure connection
    checkSecureConnection();
    
    // Set up security event listeners
    setupSecurityListeners();
    
    // Cleanup on unmount
    return () => {
      cleanupSecurityListeners();
    };
  }, []);

  const initializeSecurity = () => {
    // Generate CSRF token
    const token = generateCSRFToken();
    setCsrfToken(token);
    
    // Set security headers (for client-side validation)
    const headers = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };
    setSecurityHeaders(headers);
    
    // Log security initialization
    logSecurityEvent('Security initialized', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  };

  const checkSecureConnection = () => {
    const isHttps = window.location.protocol === 'https:';
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
    
    setIsSecureConnection(isHttps || isLocalhost);
    
    if (isProduction() && !isHttps) {
      logSecurityEvent('Insecure connection detected', {
        protocol: window.location.protocol,
        hostname: window.location.hostname
      });
      
      // Redirect to HTTPS in production
      if (import.meta.env.VITE_FORCE_HTTPS === 'true') {
        window.location.href = window.location.href.replace('http:', 'https:');
      }
    }
  };

  const setupSecurityListeners = () => {
    // Detect potential XSS attempts
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const errorMessage = args.join(' ');
      if (errorMessage.includes('script') || errorMessage.includes('eval')) {
        logSecurityEvent('Potential XSS attempt detected', { error: errorMessage });
      }
      originalConsoleError.apply(console, args);
    };

    // Detect suspicious navigation attempts
    window.addEventListener('beforeunload', (e) => {
      const currentUrl = window.location.href;
      if (currentUrl.includes('javascript:') || currentUrl.includes('data:')) {
        logSecurityEvent('Suspicious navigation attempt', { url: currentUrl });
        e.preventDefault();
        e.returnValue = '';
      }
    });

    // Monitor for potential clickjacking
    if (window.top !== window.self) {
      logSecurityEvent('Potential clickjacking detected', {
        topOrigin: window.top.location.origin,
        selfOrigin: window.self.location.origin
      });
    }

    // Content Security Policy violation handler
    document.addEventListener('securitypolicyviolation', (e) => {
      logSecurityEvent('CSP violation', {
        violatedDirective: e.violatedDirective,
        blockedURI: e.blockedURI,
        documentURI: e.documentURI,
        originalPolicy: e.originalPolicy
      });
    });
  };

  const cleanupSecurityListeners = () => {
    // Restore original console.error
    // Note: In a real implementation, you'd store the original reference
  };

  const validateCSRFToken = (token) => {
    return token === csrfToken && token.length > 0;
  };

  const refreshCSRFToken = () => {
    const newToken = generateCSRFToken();
    setCsrfToken(newToken);
    return newToken;
  };

  const securityContextValue = {
    csrfToken,
    securityHeaders,
    isSecureConnection,
    validateCSRFToken,
    refreshCSRFToken,
    logSecurityEvent
  };

  return (
    <SecurityContext.Provider value={securityContextValue}>
      {children}
    </SecurityContext.Provider>
  );
};

export default SecurityProvider;