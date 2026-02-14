# Portfolio Security Features

## 🔒 Comprehensive Security Implementation

Your portfolio has been secured with enterprise-grade security measures to protect against common web vulnerabilities and attacks.

## 🛡️ Security Features

### 1. **Content Security Policy (CSP)**
- Prevents XSS attacks by controlling which resources can be loaded
- Configured in both HTML meta tags and HTTP headers
- Restricts inline scripts and external resource origins

### 2. **Security Headers**
```
✓ X-Content-Type-Options: nosniff
✓ X-Frame-Options: DENY
✓ X-XSS-Protection: 1; mode=block
✓ Referrer-Policy: strict-origin-when-cross-origin
✓ Permissions-Policy: Restricts camera, microphone, geolocation
✓ Strict-Transport-Security (HSTS)
```

### 3. **Input Validation & Sanitization**
- **Real-time validation** for all form inputs
- **HTML tag removal** to prevent script injection
- **Length limits** on all fields
- **Email format validation**
- **XSS prevention** through HTML escaping

### 4. **Rate Limiting**
- **3 attempts per minute** per user
- Prevents spam and brute force attacks
- User-friendly error messages with countdown timer

### 5. **CSRF Protection**
- Token generation and validation
- Hidden CSRF tokens in forms
- Request verification before submission

### 6. **Bot Detection**
- Honeypot fields invisible to humans
- Automatic bot request blocking
- Security event logging for suspicious activity

### 7. **HTTPS Enforcement**
- Automatic redirect to HTTPS in production
- Secure connection validation
- HSTS header for browser enforcement

### 8. **Developer Tools Protection** 🆕
- **Disables right-click** context menu
- **Blocks keyboard shortcuts** (F12, Ctrl+Shift+I, Ctrl+U, etc.)
- **Detects DevTools** when opened
- **Disables console** in production
- **Prevents text selection** (configurable)
- **Shows warning overlay** when DevTools detected
- Full guide: [DEVTOOLS_PROTECTION.md](DEVTOOLS_PROTECTION.md)

### 9. **Security Event Logging**
- Tracks form submissions
- Logs rate limit violations
- Records validation failures
- Monitors XSS attempts
- Detects bot activity

## 📁 New Files Created

```
src/
├── utils/
│   └── security.js              # Core security utilities
├── config/
│   └── security.js              # Security configuration
└── components/
    └── SecurityProvider.jsx     # Security context provider

.env.example                     # Environment variables template
eslint.security.config.js        # Security-focused linting rules
SECURITY.md                      # Detailed security documentation
```

## 🔧 Modified Files

```
index.html                       # Added security meta tags and CSP
vite.config.js                   # Added security headers and build config
package.json                     # Added security scripts
src/App.jsx                      # Integrated SecurityProvider
src/components/Contact.jsx       # Enhanced with validation and protection
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Security Checks
```bash
npm run security:check
```

### 5. Build with Security Validation
```bash
npm run build:secure
```

## 📝 Available Scripts

```bash
npm run dev                  # Start development server
npm run build               # Build for production
npm run security:check      # Run all security checks
npm run security:audit      # Check for vulnerable dependencies
npm run security:fix        # Fix security vulnerabilities
npm run lint:security       # Run security-focused linting
npm run test:security       # Run security tests
npm run build:secure        # Build with security validation
```

## 🔍 Security Testing

### Manual Testing Checklist

1. **XSS Testing**
   - Try entering `<script>alert('xss')</script>` in form fields
   - Expected: Input is sanitized and script is removed

2. **Rate Limiting**
   - Submit the contact form 4+ times rapidly
   - Expected: See rate limit message after 3 attempts

3. **Validation Testing**
   - Enter invalid email formats
   - Enter very short/long text
   - Expected: See validation error messages

4. **Bot Detection**
   - Use browser DevTools to fill the honeypot field
   - Expected: Form submission is blocked

### Automated Security Checks

```bash
# Run ESLint security rules
npm run lint:security

# Check for vulnerable packages
npm run security:audit

# Run all security validations
npm run security:check
```

## 🌐 Production Deployment

### Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] HTTPS certificate installed
- [ ] Security headers enabled on server
- [ ] Source maps disabled (`vite.config.js`)
- [ ] Console logs disabled in production
- [ ] CSP policy tested and working
- [ ] Rate limiting tested
- [ ] Form validation tested

### Environment Variables for Production

```env
VITE_ENABLE_SECURITY_HEADERS=true
VITE_ENABLE_CSP=true
VITE_ENABLE_RATE_LIMITING=true
VITE_FORCE_HTTPS=true
VITE_ENABLE_HSTS=true
VITE_WHATSAPP_NUMBER=919150908294
VITE_MAX_FORM_ATTEMPTS=3
VITE_RATE_LIMIT_WINDOW=60000
```

## 🔐 Security Features in Action

### Contact Form Protection
```javascript
✓ Input sanitization
✓ Email validation
✓ Rate limiting (3/min)
✓ CSRF token validation
✓ Bot detection (honeypot)
✓ XSS protection
✓ Secure WhatsApp redirect
```

### Security Context
```javascript
✓ CSRF token management
✓ Secure connection validation
✓ Security event logging
✓ CSP violation monitoring
✓ Clickjacking detection
```

## 📊 Security Monitoring

### Browser Console
Development mode shows security events:
```
[Security] Security initialized
[Security] Form submitted successfully
[Security] Rate limit exceeded
[Security] Bot detected
```

### Production Mode
- Minimal console output
- Events logged but not displayed
- Can be integrated with logging services

## 🛠️ Customization

### Adjusting Rate Limits
Edit `.env.local`:
```env
VITE_MAX_FORM_ATTEMPTS=5        # Change to 5 attempts
VITE_RATE_LIMIT_WINDOW=120000   # Change to 2 minutes
```

### Modifying CSP Policy
Edit `src/config/security.js`:
```javascript
export const CSP_CONFIG = {
  "script-src": ["'self'", "your-trusted-domain.com"],
  // Add more directives as needed
};
```

### Custom Validation Rules
Edit `src/config/security.js`:
```javascript
export const VALIDATION_RULES = {
  name: {
    minLength: 3,  // Adjust as needed
    maxLength: 100,
    // Add custom patterns
  }
};
```

## 📚 Additional Resources

- [Full Security Documentation](SECURITY.md)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Web Security Best Practices](https://developer.mozilla.org/en-US/docs/Web/Security)

## 🐛 Reporting Security Issues

If you discover a security vulnerability:
1. **DO NOT** create a public GitHub issue
2. Email: sivasubramaniam141@gmail.com
3. Subject: [SECURITY] Portfolio Vulnerability Report
4. Include detailed description and steps to reproduce

## ✅ Security Compliance

This implementation follows:
- ✓ OWASP Top 10 best practices
- ✓ MDN Web Security guidelines
- ✓ W3C Security recommendations
- ✓ Modern browser security standards

## 📈 Future Enhancements

Potential additions:
- [ ] reCAPTCHA integration
- [ ] Two-factor authentication for admin
- [ ] Security audit logging to external service
- [ ] Automated security scanning in CI/CD
- [ ] Subresource Integrity (SRI) for CDN resources

---

**Your portfolio is now protected with enterprise-grade security! 🎉**