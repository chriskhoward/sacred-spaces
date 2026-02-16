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
/** Clerk user IDs that have full admin access and can see everything. */
const ADMIN_USER_IDS = [
    'user_398nliMV592Jf0YOcQWQYo1VwbC',
    'user_39B7cPsIvasjGo332tYOJJHWcbC',
    'user_39B6J0Qh1ba5UdkFl7sddtf4RS5',
    'user_39DZQRS0ikK5lfH31vIa5gg0xvC',
];

/**
 * Checks if a user has admin rights (full access to the site).
 */
export function isAdmin(userId: string | null | undefined): boolean {
    if (!userId) return false;
    return ADMIN_USER_IDS.includes(userId);
}

/**
 * Checks if a user is an admin or specifically has teacher membership.
 */
export function isTeacher(userId: string | null | undefined, membershipType: string | null | undefined): boolean {
    if (isAdmin(userId)) return true;
    return membershipType?.toLowerCase() === 'teacher';
}

/**
 * Checks if a user is an admin or has any valid membership (teacher or practitioner).
 */
export function isMember(userId: string | null | undefined, membershipType: string | null | undefined): boolean {
    if (isAdmin(userId)) return true;
    return ['teacher', 'practitioner'].includes(membershipType?.toLowerCase() || '');
}

/**
 * Checks if a teacher has completed their onboarding profile.
 */
export function isTeacherOnboarded(user: any): boolean {
    if (!user) return false;
    return user.publicMetadata?.onboardingComplete === true;
}

/**
 * Returns the specific membership segment ID for the user (e.g., 'teacher_pro').
 */
export function getUserMembershipSegment(membershipType: string | null | undefined, tier: string | null | undefined): string {
    const type = membershipType?.toLowerCase() || 'practitioner';
    const level = tier?.toLowerCase() || 'free';

    // Map 'free' to 'core' for internal logic if they have a membershipType but no tier yet (edge case)
    const normalizedLevel = level === 'pro' ? 'pro' : 'core';

    return `${type}_${normalizedLevel}`;
}
