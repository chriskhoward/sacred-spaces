# Plan: Automating Clerk Plan Syncing via Sanity

This document outlines the strategy for moving hardcoded plan data (Prices, Benefits, and Clerk Plan IDs) into Sanity to automate the membership management flow.

## 🎯 Goal
Ensure that adding or changing a plan in the Clerk Dashboard updates the entire site (Guest Cards, Member Table, and Checkout Flow) automatically through a single update in Sanity Studio.

## 🏗️ Proposed Changes

### 1. Sanity Schema (`membershipPlan.ts`)
Create a new document type in Sanity with the following fields:
- **Title**: e.g., "Teachers Collective Pro"
- **Slug**: e.g., "pro" (used for URL routing)
- **Clerk Plan ID**: The internal Clerk ID (e.g., `cplan_...`)
- **Price Label**: e.g., "$67 / month"
- **Benefits**: A list of strings for the feature checklist
- **Accent Color**: To control the card border/button color
- **Display Order**: Number to sort the cards on the `/join` page

### 2. Frontend Logic (`/join` page)
- Fetch all `membershipPlan` documents from Sanity in `JoinPage`.
- Pass this list to `PricingCards.tsx`.
- Refactor `PricingCards.tsx` to use `.map()` instead of hardcoded JSX blocks.

### 3. Checkout Bridge (`/join/checkout`)
- Remove the hardcoded `planIdMap`.
- Fetch the single `membershipPlan` document from Sanity matching the `?plan=` slug.
- Use the `clerkPlanId` from that document to open the checkout modal.

## ✅ Benefits
- **No Code Changes**: Adding a third tier or changing prices won't require a developer to touch the code.
- **Single Source of Truth**: Sanity becomes the master record for how plans are described and displayed.
- **Consistency**: The same data powers the visual cards for guests and the checkout logic for members.

---
*Created on 2026-02-12*
