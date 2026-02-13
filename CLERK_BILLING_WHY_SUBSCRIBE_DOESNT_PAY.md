# Why Clicking "Subscribe" in Clerk Doesn't Make Users Pay

The `<PricingTable />` on `/join` only **displays** plans. For "Subscribe" to actually open checkout and charge the user, **Clerk Billing** must be fully set up in the Clerk Dashboard. If any step is missing, the button may do nothing, or only redirect to sign-in without showing a payment form.

---

## What has to be true for payment to work

1. **Clerk Billing is enabled** for your application.
2. **Stripe is connected** to Clerk (Clerk uses Stripe for charges).
3. **Subscription plans exist** in Clerk and are what the PricingTable shows.
4. **User is signed in** when they click Subscribe (Clerk ties the subscription to the user).

---

## Checklist in Clerk Dashboard

Do this in **[dashboard.clerk.com](https://dashboard.clerk.com)** for the **Flow in Faith** application.

### 1. Enable Billing

- Go to **Billing** (or **Configure** → **Billing**).
- Turn on **Clerk Billing** for the app if it isn’t already.

### 2. Connect Stripe

- In the same Billing section, **connect your Stripe account**.
- Use a **test** Stripe account for development and a **separate production** Stripe account for live (Clerk/Stripe don’t allow the same Stripe account for both).
- Complete the Stripe connection flow so Clerk can create customers and charge them.

### 3. Create subscription plans

- Open **Subscription plans** (often under Billing or a “Plans” tab).
- Create at least one plan (e.g. **Core** and **Pro** to match your `/join` and `tier.ts`).
- Set:
  - **Name** and **Slug** (e.g. `core`, `pro`).
  - **Price** (e.g. monthly amount in USD).
  - Optionally **annual** pricing.
- Save/publish the plans so they appear in the PricingTable.

### 4. Confirm what PricingTable shows

- The PricingTable component loads **plans from Clerk**, not from your code.
- If no plans exist (or they’re not published), the table can be empty or show nothing clickable.
- Once plans exist and Stripe is connected, **Subscribe** should open Clerk’s checkout (powered by Stripe) and charge the user.

---

## Optional: Redirect after payment

On `/join` you can pass:

```tsx
<PricingTable newSubscriptionRedirectUrl="/onboarding" />
```

so after the user completes checkout they’re sent to onboarding (or dashboard) instead of staying on the pricing page.

---

## References

- [Clerk Billing overview](https://clerk.com/docs/billing/overview)
- [Clerk Billing for B2C SaaS](https://clerk.com/docs/guides/billing/for-b2c)
- [PricingTable (Next.js)](https://clerk.com/docs/nextjs/reference/components/billing/pricing-table) – `newSubscriptionRedirectUrl`, etc.
- [Subscription plans in Clerk Dashboard](https://dashboard.clerk.com) → your app → Billing / Subscription plans

---

## Summary

| Symptom | Likely cause |
|--------|----------------|
| Subscribe does nothing | Billing not enabled, or Stripe not connected |
| No plans in the table | No subscription plans created in Clerk |
| Redirects to sign-in only, no payment | User not signed in; after sign-in they should return to `/join` (with `redirect_url=/join`) and can then click Subscribe again |
| Button appears but no checkout | Stripe not connected or plans have no price / aren’t published |

Fix: enable Billing → connect Stripe → create and publish plans in the Clerk Dashboard. After that, Subscribe should open checkout and charge the user.
