# Promotion Codes, Stripe, and Clerk Billing

This doc answers: where “allow promotion codes” lives, how Stripe products relate to Clerk plans, and how to use your Stripe promotion code ID.

---

## 1. “Allow promotion codes” is not a single setting

- **In Stripe alone:** Promotion codes are enabled **per Checkout Session** via the `allow_promotion_codes: true` parameter when creating the session. There is no single dashboard toggle that “turns on promotion codes everywhere.”
- **With Clerk Billing:** Your app does **not** create Stripe Checkout Sessions. Clerk does. So the checkout UI (including whether a “promo code” field appears) is controlled by **Clerk**, not by a setting in your app or in Stripe’s product/catalog screens.

So if a guide says “enable Allow promotion codes in settings,” it may be referring to:

- **Stripe:** [Checkout settings](https://dashboard.stripe.com/settings/checkout) (e.g. default behavior for **Payment Links** or Stripe-hosted Checkout if you used it directly). That does not apply to checkouts that **Clerk** creates.
- **Clerk:** Billing/checkout configuration in the [Clerk Dashboard](https://dashboard.clerk.com) (e.g. under Billing or the Stripe connection). If Clerk doesn’t expose “allow promotion codes” there, you won’t see that option.

**What you can do:**

- In **Clerk Dashboard** → your app → **Billing**: look for any option like “Promotion codes,” “Discounts,” or “Coupons” and enable it if available.
- If Clerk doesn’t offer it yet, the only way to show a promo field would be to stop using Clerk’s checkout and build your own Stripe Checkout (or Payment Link) and pass `allow_promotion_codes: true` when creating the session.

---

## 2. Do Stripe products correlate with Clerk plans?

**Yes.** When Clerk Billing is connected to Stripe:

- Clerk uses **Stripe** to create customers and charge them.
- The **subscription plans** you create in the Clerk Dashboard (e.g. Core, Pro) are backed by **Stripe Products and Prices**. Clerk either creates those in Stripe when you create plans or links to existing ones.

So the products you see in **Stripe** → Product catalog (e.g. “Flow in Faith Teacher Collective Founder Pro Membership,” “Flow in Faith Teachers Collective Core Membership,” etc.) are the Stripe-side representation of what Clerk sells. They **do** correlate with Clerk plans: same underlying products/prices, different UIs (Clerk Dashboard for “plans,” Stripe Dashboard for “products”).

---

## 3. Can you “see Clerk plans” in Stripe?

Not as a separate list labeled “Clerk plans.” You see them **as** the Stripe products and prices that Clerk uses:

- **Stripe Dashboard** → **Product catalog**: those products (and their prices) are what Clerk uses for subscription checkout.
- **Clerk Dashboard** → **Billing** → **Subscription plans**: those are the same offerings, configured for display and behavior in Clerk (names, slugs, which show on the PricingTable, etc.).

So: the plans you create in Clerk **are** reflected in Stripe as products/prices. There’s no extra “Clerk” tab in Stripe; the correlation is “Clerk plan ↔ Stripe product/price.”

---

## 4. Using your promotion code ID

You created a promotion code in Stripe and have the **API ID**: `promo_1T0USwGMTNdOjq9Y3W67oHAS`.

- **In Stripe:** This is the [Promotion Code](https://docs.stripe.com/api/promotion_codes/object) ID. You can use it in the Stripe API (e.g. to pre-apply a discount when creating a Checkout Session with `discounts: [{ promotion_code: 'promo_...' }]`) or for reporting.
- **In Clerk checkout:** Until Clerk supports promotion codes (or passing a promotion code through to Stripe), customers can’t enter a code in the Clerk-hosted flow. The ID is still useful for:
  - **Stripe Dashboard / reporting:** See redemptions, revenue impact.
  - **Future use:** If you later switch to creating your own Stripe Checkout sessions, you can pass this ID (or the customer-facing **code** tied to it) so the discount is applied.

To see the **customer-facing code** (what you’d give to members) and the coupon it’s tied to, open the promotion code in Stripe: **Stripe Dashboard** → **Coupons** (or **Product catalog** → **Coupons**) and click the promotion code, or use the API with that ID.

---

## Summary

| Question | Answer |
|----------|--------|
| Where is “Allow promotion codes”? | Not a single global setting. With Clerk Billing, it would be in Clerk’s Billing/checkout settings if they offer it; otherwise only if you create Stripe Checkout yourself with `allow_promotion_codes: true`. |
| Do Stripe products = Clerk plans? | Yes. Clerk plans are backed by Stripe products/prices. |
| See Clerk plans in Stripe? | Yes — as the products/prices in Stripe’s Product catalog that Clerk uses. |
| Is `promo_1T0USwGMTNdOjq9Y3W67oHAS` useful? | Yes: for API use, reporting, and any future custom Stripe Checkout. The customer-facing code is in Stripe under that promotion code. |
