/**
 * Core vs Pro tier helpers (single source of truth).
 * Clerk Billing manages subscription state — plans are configured
 * in the Clerk Dashboard with slugs 'core' and 'pro'.
 */

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
