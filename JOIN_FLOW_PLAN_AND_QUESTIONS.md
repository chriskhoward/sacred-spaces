# Join Flow – Locked Plan

## Scope

- **Fillout form** – Not part of this. Only the /join page and flow are in scope.
- **Payment** – All in **Clerk** (Clerk Billing / PricingTable).
- **Account** – User creates their account during the process (when Clerk prompts on Subscribe) so they are **already signed in** after payment.
- **After payment** – Redirect to **dashboard**. User sees **teacher dashboard** with **tier** (Core or Pro) from the plan they bought.

---

## Flow

1. User lands on **/join** (from anywhere – no Fillout wiring in this scope).
2. User **selects subscription** (Core or Pro) and clicks **Subscribe**.
3. If not signed in → Clerk sends them to **sign-in/sign-up**; they create account (or sign in). They are sent **back to /join** so they can complete the step.
4. User completes **payment** in Clerk’s payment screen.
5. **After payment** → redirect to **dashboard**. User is already signed in and should see teacher dashboard with correct tier.

---

## Implementation (done)

- **/join** – Shows Clerk PricingTable. When not signed in, a short “Sign in to choose your plan” card with links to sign-in/sign-up using `redirect_url=/join` so they return to /join after creating an account. When signed in, the PricingTable is shown.
- **Post-payment redirect** – `newSubscriptionRedirectUrl="/dashboard"` so after payment they go to the dashboard.
- **Sign-in/sign-up** – Already support `?redirect_url=/join` so returning to /join after account creation works.

---

## Clerk Billing / dashboard and tier

- The app’s **dashboard** and **teacher** views use `user.publicMetadata.membershipType` (e.g. `teacher`) and `user.publicMetadata.tier` (e.g. `core`, `pro`).
- **You need to ensure** that when a user completes a subscription in Clerk Billing, their Clerk user gets:
  - `membershipType: 'teacher'` (or whatever your app expects for the teacher dashboard), and  
  - `tier: 'core'` or `tier: 'pro'` from the plan they purchased.
- That can be done via:
  - **Clerk Billing** settings in the Clerk Dashboard (if it can set public metadata on subscription), or  
  - A **Clerk Billing webhook** (if available) that updates user metadata when a subscription is created.
- If those aren’t set, the user may land on the dashboard but not see the teacher view or correct tier until metadata is set (e.g. via onboarding or support).
