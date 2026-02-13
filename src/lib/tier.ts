/**
 * Utility functions for checking user membership tiers.
 * 
 * Our system uses Clerk publicMetadata for tiering:
 * - tier: 'free' | 'core' | 'pro'
 * - membershipType: 'teacher' (present if the user has any paid membership)
 */

export type UserTier = 'free' | 'core' | 'pro' | string;

/**
 * Checks if a user is on a paid tier (Core or Pro).
 */
export function isPaidTier(tier: UserTier | null | undefined): boolean {
    if (!tier) return false;
    return ['core', 'pro'].includes(tier.toLowerCase());
}

/**
 * Checks if a user is specifically on the Pro tier.
 */
export function isProTier(tier: UserTier | null | undefined): boolean {
    if (!tier) return false;
    return tier.toLowerCase() === 'pro';
}

/**
 * Checks if a user is specifically on the Core tier.
 */
export function isCoreTier(tier: UserTier | null | undefined): boolean {
    if (!tier) return false;
    return tier.toLowerCase() === 'core';
}
