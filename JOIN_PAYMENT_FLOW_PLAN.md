# Plan: Ensure Payment Step in Join Flow

## The problem

1. User fills out the sales page (e.g. Teacher Collective or alignment form).
2. User clicks “Join” and lands on **https://www.flowinfaith.com/join** (Clerk PricingTable).
3. To choose a plan or checkout, Clerk requires sign-in, so the user is sent to **accounts.flowinfaith.com** (Clerk hosted auth).
4. After sign-in/sign-up, Clerk redirects to **dashboard** or **onboarding** (from `ClerkProvider`).
5. The user never returns to `/join` to complete payment.

So: **payment is skipped** because post-auth redirect does not send them back to the join/checkout page.

---

## Goal

**After a user clicks “Join,” they must complete payment before getting access.**  
Either:

- **A)** They pay on `/join` (Clerk PricingTable), then get access; or  
- **B)** They are sent to an external checkout (e.g. ThriveCart/Stripe), pay there, then create an account and get access.

---

## Recommended approach: Return-to-join after auth (Option A)

Keep using **Clerk PricingTable** on `/join`. Fix the redirect so that when someone is sent to sign-in/sign-up **from the join flow**, they come **back to `/join`** after auth to complete payment.

### Steps

1. **Honor `redirect_url` on sign-in and sign-up pages**  
   - Read `redirect_url` from the URL (e.g. `/sign-in?redirect_url=/join`).  
   - Pass it to Clerk’s `<SignIn />` / `<SignUp />` as `fallbackRedirectUrl` (and `signUpUrl`/`signInUrl` if needed).  
   - So: user on `/join` → goes to sign-in with `redirect_url=/join` → after auth → back to `/join` to pay.

2. **Send users to auth with `redirect_url=/join` when they’re in the “join” flow**  
   - From `/join`, any “Sign in” or “Create account” link (in your own UI or in a custom banner above the PricingTable) should point to:
     - `/sign-in?redirect_url=/join`
     - `/sign-up?redirect_url=/join`
   - Teacher Collective (and any other) “Join” buttons already go to `/join`; no change needed for those.

3. **Optional: Banner on `/join` for signed-out users**  
   - If the PricingTable’s own “Sign in” link cannot be overridden to include `redirect_url`, add a short message above the table: “Sign in or create an account to choose a plan,” with buttons that use the URLs above. That way the “canonical” path to auth from `/join` always includes `redirect_url=/join`.

4. **Clerk Dashboard (if using hosted auth)**  
   - Ensure `https://www.flowinfaith.com/join` is in the **Allowed redirect URLs** so Clerk can send users back there after sign-in/sign-up.

Resulting flow: **Sales page → Join → (optional) Sign in/up with return to /join → Back on /join → Choose plan & pay (PricingTable) → Then redirect to onboarding/dashboard.**

---

## Alternative: Payment-first with external checkout (Option B)

If you prefer **payment before account creation** (e.g. ThriveCart or Stripe Checkout):

1. “Join” (and “Join Core” / “Join Pro”) point to **external checkout** (ThriveCart/Stripe link), not to `/join`.
2. User pays on the checkout page; no account required yet.
3. On successful payment, webhook (e.g. `/api/webhooks/thrivecart` or Stripe) creates or flags the member (e.g. in Airtable/Sanity) and optionally sends a “Set your password” or “Create account” link.
4. Checkout “Thank you” or email redirects user to **your sign-up page** (e.g. `/sign-up?redirect_url=/onboarding`) so they create a Clerk account and then land in onboarding/dashboard.

This avoids “sign in first then pay” entirely: **Join → Pay (external) → Create account → Onboarding.**

(Your codebase previously used ThriveCart; the migration guide describes moving to Clerk + Airtable. You can still use Stripe or ThriveCart for payment and Clerk only for auth and access control.)

---

## Implementation checklist (Option A – return-to-join)

- [ ] **Sign-in page**  
  - Read `redirect_url` from `searchParams` (e.g. `?redirect_url=/join`).  
  - Pass to `<SignIn fallbackRedirectUrl={redirectUrl || '/dashboard'} />`.

- [ ] **Sign-up page**  
  - Read `redirect_url` from `searchParams`.  
  - Pass to `<SignUp fallbackRedirectUrl={redirectUrl || '/onboarding'} />`.

- [ ] **Join page**  
  - If you control the “Sign in” / “Create account” entry points on this page, link to:
    - `/sign-in?redirect_url=/join`
    - `/sign-up?redirect_url=/join`
  - If Clerk PricingTable opens Clerk’s hosted UI without a return URL, add a small banner for signed-out users with these two links so the main path from `/join` to auth includes `redirect_url=/join`.

- [ ] **Clerk Dashboard**  
  - Under Redirect URLs (or Paths), allow `https://www.flowinfaith.com/join` (and `http://localhost:3000/join` for dev).

- [ ] **Optional**  
  - After successful payment on `/join`, Clerk Billing may redirect elsewhere; if you want “after first purchase → onboarding,” configure that in Clerk Billing settings or in your success handler.

---

## Summary

| Approach              | Pros                                      | Cons                               |
|-----------------------|-------------------------------------------|------------------------------------|
| **A) Return to /join**| Small code change; keeps current stack    | User may see sign-in before payment |
| **B) Payment-first**   | Payment always before account             | More integration (webhooks, emails) |

Recommendation: implement **Option A** first (redirect_url on sign-in/sign-up and links from `/join` with `redirect_url=/join`), then add the optional banner on `/join` if needed. If you later want strict “pay first, then account,” add **Option B** (external checkout + webhook + sign-up redirect).
