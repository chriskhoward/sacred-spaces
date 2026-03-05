# Sacred Spaces — Security Audit Report

**Date:** March 2026
**Scope:** Full application — Next.js frontend, API routes, Sanity CMS, Clerk auth, webhooks, third-party integrations
**Classification:** Internal / Confidential

---

## Executive Summary

This audit covers the Sacred Spaces web application built with Next.js (App Router), Sanity CMS, Clerk authentication, and several third-party integrations (Fillout forms, Zoom, Google Calendar, Stripe via Clerk). The application demonstrates solid foundational security practices — Clerk handles authentication well, Sanity provides a managed CMS layer, and the middleware protects most routes. However, several critical and high-severity issues were identified that should be addressed before or shortly after production launch.

**Finding Summary:**

| Severity | Count |
|----------|-------|
| Critical | 4 |
| High | 5 |
| Medium | 10 |
| Low | 8 |

---

## Critical Findings

### C1. Fillout Webhook Has No Authentication

**Location:** `src/app/api/webhooks/fillout/route.ts`
**Risk:** Anyone who discovers or guesses this endpoint URL can send fabricated form submissions.

**Details:** The Fillout webhook endpoint accepts POST requests without verifying the sender's identity. There is no signature verification, no shared secret validation, and no IP allowlist. An attacker could craft requests to:
- Create fake user records or registrations
- Inject arbitrary data into the system
- Trigger downstream actions (email sends, database writes)

**Recommendation:** Implement webhook signature verification using Fillout's webhook signing secret. Validate the signature header on every request before processing.

### C2. Fillout Webhook Allows Arbitrary Field Writes

**Location:** `src/app/api/webhooks/fillout/route.ts`
**Risk:** The endpoint dynamically maps form field names to Clerk metadata keys without validation.

**Details:** The webhook iterates over all fields in the payload and writes them directly to Clerk user metadata using the field `name` as the key. An attacker (or a misconfigured form) could overwrite arbitrary metadata fields, potentially:
- Escalating privileges by setting plan/role fields
- Corrupting user profile data
- Setting fields that control access gating (e.g., summit access flags)

**Recommendation:** Implement an allowlist of expected field names. Only write fields that match the allowlist to user metadata. Reject or ignore unexpected fields.

### C3. Payment Success Page Has No Server-Side Verification

**Location:** `src/app/pay-success/page.tsx`
**Risk:** The payment success page does not verify that a payment actually occurred.

**Details:** The `/pay-success` route appears to grant access or show a success state without verifying the payment with Stripe or Clerk's billing system. A user could navigate directly to this URL without paying. While Clerk's plan-based access gating may prevent actual feature access, the UX flow could be misleading and the page may trigger side effects (welcome emails, metadata updates) without a valid payment.

**Recommendation:** Verify the payment session server-side (via Stripe session ID or Clerk subscription status) before rendering success content or triggering any side effects.

### C4. Missing CLERK_WEBHOOK_SECRET Validation

**Location:** `src/app/api/webhooks/clerk/route.ts`
**Risk:** If the `CLERK_WEBHOOK_SECRET` environment variable is not set, webhook verification may silently fail or be bypassed.

**Details:** The Clerk webhook uses Svix for signature verification, which is good. However, if the environment variable is missing or empty, the behavior depends on Svix's error handling — it may throw (safe) or it may skip verification (unsafe). There is no explicit check that the secret exists before attempting verification.

**Recommendation:** Add an explicit check at the top of the webhook handler that returns a 500 error if `CLERK_WEBHOOK_SECRET` is not configured. This prevents the endpoint from operating in an unverified state.

---

## High Findings

### H1. Zoom Meeting Links Exposed Without Proper Gating

**Location:** `src/sanity/lib/queries.ts`, live class components
**Risk:** Zoom meeting links stored in Sanity may be exposed to unauthorized users.

**Details:** Zoom meeting URLs are fetched from Sanity and rendered on the client side. While the UI conditionally shows/hides content based on auth state, the actual Zoom URLs are included in the page data sent to the browser. A user who inspects the page source or network requests could extract meeting links without having the required membership.

**Recommendation:** Move Zoom link retrieval to server-side only. Only include Zoom URLs in the response when the user's authentication status confirms they have access. Use Next.js Server Components or API routes to gate this data.

### H2. Hardcoded Admin User IDs

**Location:** Multiple files (middleware, API routes)
**Risk:** Admin access is controlled by hardcoded Clerk user IDs rather than role-based access control.

**Details:** Admin checks compare against hardcoded user ID strings. This approach:
- Breaks if user IDs change
- Cannot scale to multiple admins without code changes
- Requires a deployment to add/remove admins
- IDs in source code could be used for targeted attacks

**Recommendation:** Use Clerk's role/permission system (organization roles or user metadata) to define admin access. Check for an `admin` role rather than specific user IDs.

### H3. No Rate Limiting on API Routes

**Location:** All `src/app/api/` routes
**Risk:** API endpoints are vulnerable to abuse, brute force, and denial-of-service attacks.

**Details:** No rate limiting is implemented on any API route, including:
- Webhook endpoints (could be flooded)
- Contact form submission (spam)
- Any authenticated API routes

**Recommendation:** Implement rate limiting using Vercel's built-in rate limiting, or add middleware-based rate limiting (e.g., `upstash/ratelimit` with Redis). Apply stricter limits to unauthenticated endpoints.

### H4. Incomplete Middleware Route Protection

**Location:** `src/middleware.ts`
**Risk:** Some routes that should require authentication may not be covered by the middleware matcher.

**Details:** The Clerk middleware configuration uses a matcher pattern to determine which routes require authentication. Routes not matching this pattern bypass auth checks entirely. A review of the matcher against all defined routes should be performed to ensure complete coverage.

**Recommendation:** Audit all routes against the middleware matcher. Consider using a default-deny approach where all routes require authentication unless explicitly excluded (public routes allowlist).

### H5. No Content Security Policy (CSP)

**Location:** `next.config.ts` / `src/middleware.ts`
**Risk:** The application is vulnerable to XSS attacks via injected scripts.

**Details:** No Content-Security-Policy header is configured. This means:
- Inline scripts can execute without restriction
- Scripts can be loaded from any domain
- If an XSS vulnerability exists elsewhere, there is no CSP to mitigate it
- Google Tag Manager (GTM) script injection in the layout has no CSP boundary

**Recommendation:** Implement a Content-Security-Policy header that:
- Restricts `script-src` to known domains (self, GTM, YouTube, Vimeo)
- Uses nonces for inline scripts
- Sets `frame-src` to allow only known embed domains
- Sets `connect-src` to limit API call destinations

---

## Medium Findings

### M1. Iframe Video URL Validation

**Location:** Summit presentation and yoga class components
**Risk:** Video embed URLs from Sanity are rendered in iframes without domain validation.

**Details:** The `videoUrl` field from Sanity is used directly as an iframe `src`. If a Sanity editor enters a malicious URL, it could:
- Load a phishing page in the iframe
- Attempt clickjacking attacks
- Load unexpected content

**Recommendation:** Validate that video URLs match an allowlist of domains (youtube.com, vimeo.com, player.vimeo.com, youtube-nocookie.com) before rendering the iframe.

### M2. Iframe Sandbox Attributes Missing

**Location:** All iframe embeds (videos, pricing tables)
**Risk:** Embedded iframes have full access to browser features.

**Details:** Video iframes and embedded widgets do not use the `sandbox` attribute, giving embedded content more privileges than necessary.

**Recommendation:** Add appropriate `sandbox` attributes to iframes. For video players: `sandbox="allow-scripts allow-same-origin allow-presentation"`. For payment widgets: include `allow-forms allow-popups` as needed.

### M3. File Upload Validation (Sanity Assets)

**Location:** Sanity Studio configuration
**Risk:** Uploaded files may not be validated for type and size.

**Details:** Sanity handles file uploads for speaker headshots, resources, etc. While Sanity's CDN serves files safely, there should be validation on file types and sizes to prevent abuse of storage.

**Recommendation:** Configure Sanity schema validation rules for file uploads — restrict accepted MIME types and set maximum file sizes.

### M4. Email Address Exposure

**Location:** Contact pages, Summit contact configuration
**Risk:** Email addresses displayed on the site can be harvested by scrapers.

**Details:** Contact email addresses are rendered as plain text in the HTML, making them easy targets for email harvesting bots.

**Recommendation:** Consider obfuscating email addresses (e.g., using a contact form instead of displaying the address, or encoding the email in a way that defeats simple scrapers).

### M5. Error Information Disclosure

**Location:** Various API routes and page error boundaries
**Risk:** Error messages may leak implementation details.

**Details:** Some error responses include stack traces or internal error messages that could help an attacker understand the application structure.

**Recommendation:** Ensure all error responses in production return generic messages. Log detailed errors server-side only. Use Next.js error boundaries that show user-friendly messages.

### M6. Webhook Replay / Retry Handling

**Location:** `src/app/api/webhooks/clerk/route.ts`, `src/app/api/webhooks/fillout/route.ts`
**Risk:** Webhook endpoints may process the same event multiple times.

**Details:** Neither webhook endpoint implements idempotency checks. If a webhook delivery is retried (which is common), the same event could be processed multiple times, leading to duplicate side effects.

**Recommendation:** Implement idempotency by tracking processed webhook event IDs. The Clerk webhook includes an event ID via Svix that can be used for deduplication.

### M7. CSRF Protection

**Location:** Form submissions, API mutations
**Risk:** Cross-site request forgery on state-changing operations.

**Details:** While Clerk's auth tokens provide some CSRF protection for authenticated routes, any unauthenticated form submissions (contact forms, registration) lack explicit CSRF tokens.

**Recommendation:** Implement CSRF tokens for all form submissions, or ensure all mutations go through API routes that validate the `Origin` header.

### M8. NPM Dependency Vulnerabilities

**Location:** `package.json`, `package-lock.json`
**Risk:** Third-party packages may contain known vulnerabilities.

**Details:** A regular `npm audit` should be run to check for known vulnerabilities in the dependency tree.

**Recommendation:** Run `npm audit` and address any critical or high-severity vulnerabilities. Set up automated dependency scanning (e.g., Dependabot, Snyk) for ongoing monitoring.

### M9. Missing Permissions-Policy Header

**Location:** Response headers configuration
**Risk:** Browser features (camera, microphone, geolocation) are not explicitly restricted.

**Details:** Without a Permissions-Policy header, embedded content could potentially access browser features.

**Recommendation:** Add a `Permissions-Policy` header that restricts unnecessary features: `camera=(), microphone=(), geolocation=(), payment=()`.

### M10. URL Parameter Encoding

**Location:** Google Calendar URL generation, various link construction
**Risk:** Special characters in titles or descriptions could break URLs or enable injection.

**Details:** When constructing URLs (e.g., Google Calendar links), user-provided text from Sanity (titles, descriptions) is included in URL parameters. While `URLSearchParams` handles encoding, any manual URL construction should be verified.

**Recommendation:** Audit all URL construction to ensure `URLSearchParams` or `encodeURIComponent` is used consistently. The current Google Calendar helper uses `URLSearchParams` correctly.

---

## Low Findings

### L1. Missing `rel="noopener noreferrer"` on Some External Links
Some external links may be missing `rel="noopener noreferrer"`, which prevents the linked page from accessing `window.opener`.

### L2. Console Logging in Production
Some API routes and components may include `console.log` statements that could leak sensitive information in production logs.

### L3. Missing `X-Content-Type-Options` Header
The `X-Content-Type-Options: nosniff` header should be set to prevent MIME type sniffing.

### L4. Missing `X-Frame-Options` Header
While CSP's `frame-ancestors` is preferred, adding `X-Frame-Options: DENY` provides defense-in-depth against clickjacking for older browsers.

### L5. Cookie Security Attributes
Verify that all cookies (especially Clerk session cookies) have `Secure`, `HttpOnly`, and `SameSite` attributes properly set. Clerk handles this by default, but it should be verified.

### L6. Subresource Integrity (SRI)
External scripts (GTM, analytics) should use SRI hashes to ensure they haven't been tampered with.

### L7. Source Map Exposure
Ensure source maps are not served in production, as they reveal original source code.

### L8. Environment Variable Validation
Add startup validation that all required environment variables are present and properly formatted, failing fast if any are missing.

---

## Positive Findings

The following security practices are already well-implemented:

1. **Clerk Authentication** — Robust authentication system with proper session management
2. **Svix Webhook Verification** — The Clerk webhook properly uses Svix for signature verification
3. **Server Components** — Good use of Next.js Server Components to keep sensitive logic server-side
4. **HTTPS Enforced** — Vercel enforces HTTPS on all routes
5. **Sanity CMS** — Content is managed through a CMS with role-based access, not direct database access
6. **No SQL Injection Surface** — Using Sanity's GROQ query language with parameterized queries eliminates SQL injection
7. **TypeScript** — Strong typing reduces runtime errors and type confusion vulnerabilities
8. **Environment Variables** — Secrets are stored in environment variables, not hardcoded in source
9. **Middleware Auth Gating** — Clerk middleware provides route-level authentication

---

## Priority Remediation Roadmap

### Immediate (Before Production Launch)

| # | Finding | Effort | Impact |
|---|---------|--------|--------|
| 1 | C1 — Add Fillout webhook authentication | Medium | Prevents arbitrary data injection |
| 2 | C2 — Add field name allowlist to Fillout webhook | Low | Prevents metadata corruption |
| 3 | C3 — Add payment verification to success page | Medium | Prevents access without payment |
| 4 | C4 — Add CLERK_WEBHOOK_SECRET existence check | Low | Prevents silent auth bypass |
| 5 | H2 — Move admin IDs to role-based system | Medium | Scalable admin management |

### Short-Term (Within 30 Days)

| # | Finding | Effort | Impact |
|---|---------|--------|--------|
| 6 | H1 — Gate Zoom links server-side | Medium | Prevents link leakage |
| 7 | H3 — Add rate limiting | Medium | Prevents abuse |
| 8 | H5 — Implement CSP headers | High | XSS mitigation |
| 9 | M1 — Validate iframe URLs | Low | Prevents malicious embeds |
| 10 | M6 — Add webhook idempotency | Medium | Prevents duplicate processing |

### Medium-Term (Within 90 Days)

| # | Finding | Effort | Impact |
|---|---------|--------|--------|
| 11 | H4 — Audit middleware coverage | Medium | Complete route protection |
| 12 | M2 — Add iframe sandbox attributes | Low | Defense in depth |
| 13 | M7 — Implement CSRF protection | Medium | Prevents cross-site attacks |
| 14 | M8 — Set up dependency scanning | Low | Ongoing vulnerability monitoring |
| 15 | M9 — Add Permissions-Policy header | Low | Feature restriction |
| 16 | L3-L4 — Add security headers | Low | Defense in depth |
| 17 | L8 — Add env var validation | Low | Fail-fast on misconfiguration |

---

## Methodology

This audit was conducted through static analysis of the application source code, including:
- Review of all API routes and webhook handlers
- Analysis of authentication and authorization flows
- Examination of middleware configuration and route protection
- Assessment of third-party integration security
- Review of client-side data exposure
- Evaluation of security headers and browser protections
- Analysis of input validation and output encoding

No dynamic testing (penetration testing) was performed. A follow-up dynamic assessment is recommended for production deployment.
