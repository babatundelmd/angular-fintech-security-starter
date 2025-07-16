# Secure Angular Fintech Starter App

This is an Angular application implementing comprehensive security measures specifically designed for fintech applications.

## Security Features Implemented

### ✅ Framework Security
- **Angular 19+** with standalone components and signals
- **Strict TypeScript** configuration with comprehensive type checking
- **Content Security Policy (CSP)** configured in index.html and server configs
- **HTTPS enforcement** in development and production

### ✅ Authentication & Authorization
- **JWT tokens stored in HTTP-only cookies** (never in localStorage)
- **Automatic token refresh** with interceptors
- **Route guards** for authentication and role-based access
- **Session timeout** handling

### ✅ XSS Protection
- **Angular's built-in sanitization** (no dangerous bypasses)
- **CSP headers** preventing inline scripts
- **Input validation** on all forms
- **Output encoding** for user-generated content

### ✅ Form Security
- **Reactive Forms** with comprehensive validation
- **Client and server-side validation** 
- **Input sanitization** and length limits
- **CSRF protection** via custom interceptors

### ✅ HTTP Security
- **Security interceptors** adding protective headers
- **Error handling** without exposing sensitive information
- **Request/response sanitization**
- **API rate limiting** considerations

## Getting Started

### Prerequisites
- Node.js 22+
- Angular CLI 19+

### Installation
```bash
npm install
```

### Development
```bash
# Start with HTTPS (required for security testing)
npm start
```

### Production Build
```bash
npm run build
```

### Security Testing
```bash
npm run audit
npm run security-check
```

## Security Checklist Compliance

| Security Measure | Status | Implementation |
|-----------------|--------|----------------|
| HTTPS Everywhere | ✅ | Enforced in dev/prod configs |
| CSP Headers | ✅ | Configured in index.html + server |
| HSTS | ✅ | Server configuration files |
| XSS Protection | ✅ | Angular sanitization + CSP |
| Input Validation | ✅ | Reactive Forms with validators |
| Secure Token Storage | ✅ | HTTP-only cookies (no localStorage) |
| Route Guards | ✅ | Auth + role-based guards |
| Error Handling | ✅ | Global error handler |
| Dependency Audit | ✅ | npm audit + automated checks |

## Architecture

### Components
- **Standalone Components** (no NgModules)
- **OnPush Change Detection** for performance
- **Signal-based state management**
- **Lazy-loaded routes** for code splitting

### Services
- **AuthService** - Secure authentication management
- **TransactionService** - Financial transaction handling
- **GlobalErrorHandler** - Centralized error management

### Interceptors
- **SecurityInterceptor** - Adds security headers
- **AuthInterceptor** - Handles token refresh
- **ErrorInterceptor** - Global error handling

## Configuration

### Environment Variables
```typescript
// Update src/environments/
export const environment = {
  production: false,
  apiUrl: 'https://your-api.com',
  enableConsoleLogging: false
};
```

### CSP Policy
Customize CSP in `src/index.html` based on your needs:
- Add trusted domains to `connect-src`
- Modify `script-src` for third-party scripts
- Update `img-src` for external images

### Server Configuration
- Use provided `.htaccess` (Apache) or `nginx.conf` (Nginx)
- Implement proper SSL/TLS certificates
- Configure HSTS headers

## Testing Security

### Manual Testing
1. Check CSP compliance: [securityheaders.com](https://securityheaders.com)
2. Test XSS payloads in forms
3. Verify HTTPS redirects
4. Test authentication flows

### Automated Testing
```bash
# Dependency vulnerabilities
npm audit

# TypeScript strict checking
npm run build

# Lint security issues
npm run lint
```

## Security Considerations

### Do NOT:
- Store JWT tokens in localStorage/sessionStorage
- Use `bypassSecurityTrustHtml()` without sanitization
- Include sensitive data in console logs
- Trust frontend-only validations
- Use inline scripts or styles

### DO:
- Validate all inputs server-side
- Implement proper error handling
- Use HTTPS everywhere
- Regular security audits
- Keep dependencies updated

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Angular Security Guide](https://angular.io/guide/security)
- [CSP Policy Generator](https://report-uri.com/home/generate)

## 🤝 Contributing

1. Run security checks before commits
2. Follow TypeScript strict mode
3. Add tests for security-critical features
4. Update documentation for security changes

---

**⚠️ Important**: This is a starter template. Always conduct thorough security reviews and penetration testing before deploying to production.
