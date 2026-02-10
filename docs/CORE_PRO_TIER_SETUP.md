# Core vs Pro Tier Setup Guide

This guide walks through implementing the Teachers Collective **Core** and **Pro** membership distinction: storing the correct tier from ThriveCart, treating legacy "professional" as Pro, and gating Pro-only features (Promotion of Offerings, Paid Teaching Opportunities, Contribution to On-Demand Library).

---

## 1. ThriveCart Configuration

1. **Create two products** in ThriveCart (if not already):
   - **Core:** e.g. name "Teachers Collective Core" (or "TC Core"). Note the **product ID** (e.g. `31` for Core).
   - **Pro:** e.g. name "Teachers Collective Pro" (or "TC Pro"). Note the **product ID** (e.g. `34` for Pro).

2. In each product’s **Webhooks** section, ensure your webhook URL is set and sends:
   - `customer[email]` (or `customer.email` in JSON)
   - `order_id`
   - `product_name` (and optionally `product_id` if available)
   - `thrivecart_secret` (same value as in your env).

3. Confirm the webhook secret is set in your app env as `THRIVECART_SECRET`.

---

## 2. Add Tier Helper (Single Source of Truth)

Create a small util so Core/Pro and backward compatibility are consistent.

**File:** `src/lib/tier.ts` (create the file and `src/lib` directory if needed).

```ts
export type MembershipTier = 'free' | 'core' | 'pro' | 'professional';

/**
 * User has paid teacher membership (Core or Pro). Use for: directory, locked resources, live class Zoom.
 */
export function isPaidTier(tier: string | undefined): boolean {
  if (!tier) return false;
  const t = tier.toLowerCase();
  return t === 'core' || t === 'pro' || t === 'professional';
}

/**
 * User has Pro (or legacy "professional") — gets Promotion of Offerings, Paid Teaching Opportunities, Contribution to On-Demand Library.
 */
export function isProTier(tier: string | undefined): boolean {
  if (!tier) return false;
  const t = tier.toLowerCase();
  return t === 'pro' || t === 'professional';
}
```

Use these helpers everywhere you read `userTier`/`tier` for gating (see steps below).

---

## 3. ThriveCart Webhook: Set `tier` to Core or Pro

**File:** `src/app/api/webhooks/thrivecart/route.ts`

1. **Parse product identifier:** In the same place you read `product_name`, also read product id if ThriveCart sends it:
   - JSON: `product_id` or `product_name`
   - Form: `product_id` or `product_name`

2. **Add a mapping function** (in the same file or in `src/lib/tier.ts`):

```ts
// ThriveCart product IDs: Core = 31, Pro = 34 (update if IDs change)
function tierFromThriveCartProduct(productName: string, productId?: string | number): 'core' | 'pro' {
  const name = (productName || '').toLowerCase();
  if (productId != null) {
    const id = String(productId);
    if (id === '34') return 'pro';   // Pro product ID
    if (id === '31') return 'core';   // Core product ID
  }
  if (name.includes('pro')) return 'pro';
  if (name.includes('core')) return 'core';
  return 'pro'; // default existing/unknown to Pro so no one loses access
}
```

3. **Where you update Clerk metadata** (the `updateUserMetadata` call that sets `membershipType: 'teacher'` and `tier: 'professional'`):
   - Replace the hardcoded `tier: 'professional'` with:
     - `tier: tierFromThriveCartProduct(productName, productId)`
   - If you don’t have `product_id` in the payload, call `tierFromThriveCartProduct(productName)` only.

4. **Existing users:** When the webhook runs for an existing user, the new tier is set from the product they just purchased. Users who already have `tier: 'professional'` keep it until their next purchase; the helper `isProTier()` treats `professional` as Pro so they retain full access.

---

## 4. Clerk Webhook: Set `tier` from Sanity `allowedUser.plan`

**File:** `src/app/api/webhooks/clerk/route.ts`

Where you set `tier: 'professional'` when creating/updating a user from `allowedUser`:

- Replace that with the same mapping used in ThriveCart: e.g. call `tierFromThriveCartProduct(planName)` where `planName` is the stored product name from Sanity `allowedUser.plan`. If Sanity stores "Teachers Collective Pro" / "Teachers Collective Core", the same name-based logic works. Default unknown/legacy to `'pro'` so existing signups keep full access.

You can move `tierFromThriveCartProduct` into `src/lib/tier.ts` and import it in both webhooks to avoid duplication.

---

## 5. Use Tier Helpers Everywhere You Gate on Tier

### Resources (locked vs free)

**File:** `src/app/teacher-collective/resources/ResourcesClient.tsx`

- Replace any check like `userTier === 'free'` with `!isPaidTier(userTier)` (import `isPaidTier` from `@/lib/tier`).
- So: free = no access to locked resources; Core and Pro = access.

### Live class Zoom / locked classes

**Files:** `src/app/live-classes/LiveClassesCards.tsx` and `src/app/teacher-collective/calls/LiveClassesCards.tsx`

- Replace `userTier === 'free'` with `!isPaidTier(userTier)` for “is this class locked for this user?” so both Core and Pro can access locked live classes.

### Pro-only: “Submit a Resource” (Contribution to On-Demand Library)

**File:** `src/app/teacher-collective/resources/ResourcesClient.tsx`

- Find the “Submit a Resource” link/button (or the block that links to `/apply` or a submit flow).
- If the CTA is “Submit a Resource”:
  - Show the normal CTA only when `isProTier(userTier)`.
  - When `!isProTier(userTier)` but user is paid (Core), show a short message: *“Contribution to the library is a Pro benefit. Upgrade to Pro to submit resources.”* and optionally a link to `/join?plan=pro`.
- Import `isProTier` from `@/lib/tier`.

### Future Pro-only features

- **Promotion of Offerings:** When you add a “promote your offering” or similar section (dashboard/community), wrap it in `isProTier(tier)` and show an upgrade message for Core.
- **Paid Teaching Opportunities:** When you add “apply to teach” or paid teaching opportunities, gate that flow with `isProTier(tier)` and an upgrade CTA for Core.

---

## 6. Teacher-Collective Pricing Cards: CTAs to Join

**File:** `src/app/teacher-collective/page.tsx`

- In the **Core** card footer (next to “$47/monthly” / “$470/annually”):
  - Add a link or button, e.g. “Join Core” or “Get Core”, linking to `/join?plan=core`.

- In the **Pro** card footer:
  - Add a link or button, e.g. “Join Pro” or “Get Pro”, linking to `/join?plan=pro`.

Use the same button style as your other primary CTAs for consistency.

---

## 7. Join Page: Use `plan` to Select Core vs Pro Checkout

**File:** `src/app/join/page.tsx`

**Option A – Two ThriveCart product IDs (recommended)**

1. Read `searchParams.plan` (e.g. `plan=core` or `plan=pro`).
2. Render the correct ThrivecartEmbed for that plan:
   - If `plan === 'pro'` (or no plan), render the Pro embed (product ID for Pro, e.g. `32`).
   - If `plan === 'core'`, render the Core embed (product ID for Core, e.g. `31`).
3. Update `ThrivecartEmbed` to accept an optional prop like `productId` (e.g. `31` or `32`) and set `data-thrivecart-product` to that value so the correct ThriveCart product loads.
4. Default: if `plan` is missing or invalid, default to one of them (e.g. Pro) so the page always shows a valid checkout.

**Suggested implementation for Option A**

- In `join/page.tsx`:  
  `const plan = searchParams?.plan === 'core' ? 'core' : 'pro';`  
  Pass the corresponding product ID to the embed:  
  `<ThrivecartEmbed productId={plan === 'core' ? '31' : '32'} />`
- In `ThrivecartEmbed.tsx`: Add prop `productId?: string` (default e.g. `'32'` for Pro) and use it in `data-thrivecart-product={productId}`.
- Ensure the embed script/ID is correct for both products (ThriveCart may give one script per product or one script with multiple targets).

**Option B – Single product with plan in cart**

If ThriveCart supports passing a plan/variant via URL or embed config, use `plan=core` / `plan=pro` to set that when initializing the embed. Implementation depends on ThriveCart’s docs.

---

## 8. Verification and Testing

### ThriveCart

- Send a test webhook (or make a test purchase) for the **Core** product and confirm in Clerk that the user’s `publicMetadata.tier` is `core`.
- Same for **Pro** product → `tier` should be `pro`.
- Check logs for `[Thrivecart] Upgraded existing user ...` and that the tier in the log matches the product.

### Clerk

- In Dashboard → Users → select a user → Public metadata: confirm `tier` is `core` or `pro` (or `professional` for legacy).
- Sign in as a Core user and a Pro user and verify behavior below.

### Gating

- **Free:** Cannot access locked resources or locked live class Zoom.
- **Core:** Can access locked resources and live class Zoom; sees “upgrade to Pro” for Submit a Resource (and any future Pro-only feature).
- **Pro:** Can access everything including Submit a Resource.
- **Legacy `professional`:** Behaves as Pro (access to everything including Submit a Resource).

### Join flow

- Open `/join?plan=core` and confirm the embed shows Core pricing/checkout (product 31).
- Open `/join?plan=pro` (or `/join` with no param if you default to Pro) and confirm Pro checkout (product 34).
- Click “Join Core” and “Join Pro” from the teacher-collective pricing cards and confirm they land on the correct join URL and embed.

---

## 9. Optional: Document Product IDs

In a comment or config (e.g. in `src/lib/tier.ts` or next to the webhook mapping), document your ThriveCart product IDs:

```ts
// ThriveCart product IDs: Core = 31, Pro = 34 (update if IDs change)
```

Update the IDs in this doc and in code when you create or change products in ThriveCart.

---

## Summary

| Area | Action |
|------|--------|
| **ThriveCart** | Two products (Core + Pro), webhook sends `product_name` and optionally `product_id`. |
| **Clerk** | `publicMetadata.tier` = `'core'` or `'pro'` from webhooks; legacy `'professional'` treated as Pro via `isProTier()`. |
| **Tier helper** | `src/lib/tier.ts`: `isPaidTier()`, `isProTier()`, and optionally `tierFromThriveCartProduct()`. |
| **Premium access** | Use `isPaidTier(tier)` for locked resources and live class Zoom (Core + Pro). |
| **Pro-only** | Use `isProTier(tier)` for Submit a Resource, and future Promotion of Offerings and Paid Teaching Opportunities. |
| **Join** | Teacher-collective CTAs → `/join?plan=core` and `/join?plan=pro`; join page passes `productId` to ThrivecartEmbed. |

After this, the Core vs Pro distinction is in place: ThriveCart product drives Clerk tier, and Pro-only features are gated with upgrade messaging for Core users.
