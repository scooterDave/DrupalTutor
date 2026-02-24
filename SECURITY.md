# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities.
2. Email the maintainer directly or use [GitHub Security Advisories](https://github.com/scooterDave/DrupalTutor/security/advisories/new) if you have access.
3. Include a clear description of the vulnerability, steps to reproduce, and potential impact.
4. Allow a reasonable time for a fix before public disclosure.

## Security Considerations

This is a **static, client-side only** application:

- No backend server, database, or API
- No user authentication or persistent storage of personal data
- No collection of PII (personally identifiable information)
- All content (questions, answers) is embedded in the source code

Risks are limited to:

- **Supply chain:** Keep dependencies updated (`npm audit`, `npm update`)
- **XSS:** React escapes output by default; no `dangerouslySetInnerHTML` or raw HTML injection
- **Deployment:** Use HTTPS when hosting; ensure your hosting provider applies security headers (CSP, X-Frame-Options, etc.)
