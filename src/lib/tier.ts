/**
 * Core vs Pro tier helpers (single source of truth).
 * ThriveCart product IDs: Core = 31, Pro = 34.
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

/**
 * Map ThriveCart product or plan name to Clerk tier.
 * Default unknown/legacy to 'pro' so no one loses access.
 */
export function tierFromThriveCartProduct(
  productName: string,
  productId?: string | number
): 'core' | 'pro' {
  const name = (productName || '').toLowerCase();
  if (productId != null) {
    const id = String(productId);
    if (id === '31') return 'core';
    if (id === '34') return 'pro';
  }
  if (name.includes('pro')) return 'pro';
  if (name.includes('core')) return 'core';
  return 'pro';
}
