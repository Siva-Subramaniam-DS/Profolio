# Security Implementation Guide

## Overview
This portfolio website has been enhanced with comprehensive security measures to protect against common web vulnerabilities and attacks.

## Security Features Implemented

### 1. Content Security Policy (CSP)
- **Location**: `index.html`, `src/config/security.js`
- **Purpose**: Prevents XSS attacks by controlling resource loading
- **Configuration**: Restricts script, style, font, and image sources to trusted domains

### 2. Security Headers
- **X-Content-Type-Options**: `nosniff` - Prevents MIME type sniffing
- **X-Frame-Options**: `DENY` - Prevents clickjacking attacks
- **X-XSS-Protection**: `1; mode=block` - Enables browser XSS filtering
- **Referrer-Policy**: `strict-origin-when-cross-origin` - Controls referrer information
- **Permissions-Policy**: Restricts access to sensitive browser APIs

### 3. Input Validation & Sanitization
- **Location**: `src/utils/security.js`, `src/components/Contact.jsx`
- **Features**:
  - HTML tag removal
  - Script injection prevention
  - Length validation
  - Email format validation
  - Character filtering

### 4. Rate Limiting
- **Location**: `src/utils/security.js`
- **Configuration**: 3 attempts per minute per user
- **Purpose**: Prevents spam and brute force attacks

### 5. CSRF Protection
- **Location**: `src/components/SecurityProvider.jsx`
- **Features**:
  - Token generation and validation
  - Hidden form fields
  - Request verification

### 6. XSS Protection
- **Location**: `src/utils/security.js`
- **Features**:
  - HTML escaping
  - Script detection
  - Content sanitization

### 7. Bot Detection
- **Location**: `src/components/Contact.jsx`
- **Method**: Honeypot fields invisible to users but visible to bots

### 8. HTTPS Enforcement
- **Location**: `src/components/SecurityProvider.jsx`
- **Features**:
  - Automatic HTTPS redirect in production
  - Secure connection validation

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# Security Settings
VITE_ENABLE_SECURITY_HEADERS=true
VITE_ENABLE_CSP=true
VITE_ENABLE_RATE_LIMITING=true
VITE_FORCE_HTTPS=true
VITE_ENABLE_HSTS=true

# Contact Form Settings
VITE_WHATSAPP_NUMBER=919150908294
VITE_MAX_FORM_ATTEMPTS=3
VITE_RATE_LIMIT_WINDOW=60000

# Development Settings
VITE_ENABLE_CONSOLE_LOGS=false
VITE_ENABLE_DEBUG_MODE=false
```

## Security Event Logging

The application logs various security events:
- Form submissions
- Rate limit violations
- Validation failures
- XSS attempts
- CSRF violations
- Bot detection
- Suspicious activities

## Deployment Security

### Production Checklist
- [ ] HTTPS certificate installed
- [ ] Security headers configured on server
- [ ] Environment variables properly set
- [ ] Source maps disabled
- [ ] Debug mode disabled
- [ ] Console logs disabled

### Server Configuration (Nginx Example)
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # Security Headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    
    # CSP Header
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://wa.me;";
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Testing Security

### Manual Testing
1. **XSS Testing**: Try injecting `<script>alert('xss')</script>` in form fields
2. **Rate Limiting**: Submit forms rapidly to trigger rate limiting
3. **CSRF Testing**: Submit forms without proper tokens
4. **Bot Detection**: Fill honeypot fields to trigger bot detection

### Automated Testing
```bash
# Install security testing tools
npm install --save-dev eslint-plugin-security

# Run security linting
npm run lint:security

# Test CSP compliance
npm run test:csp
```

## Security Monitoring

### Browser Console
- Security events are logged to console in development
- Production logs are minimized for security

### Security Headers Validation
Use online tools to validate security headers:
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

## Incident Response

If a security issue is discovered:
1. Document the issue immediately
2. Assess the impact and scope
3. Implement immediate mitigation
4. Update security measures
5. Review and improve security policies

## Regular Security Maintenance

### Monthly Tasks
- [ ] Review security logs
- [ ] Update dependencies
- [ ] Check for new vulnerabilities
- [ ] Test security measures

### Quarterly Tasks
- [ ] Security audit
- [ ] Penetration testing
- [ ] Update security policies
- [ ] Review access controls

## Contact for Security Issues

For security-related concerns, please contact:
- Email: sivasubramaniam141@gmail.com
- Subject: [SECURITY] Portfolio Security Issue

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Security Headers](https://securityheaders.com/)