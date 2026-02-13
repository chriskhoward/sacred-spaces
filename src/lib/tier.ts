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
/**
 * Checks if a user has admin rights.
 * Specific Admin ID: user_398nliMV592Jf0YOcQWQYo1VwbC
 */
export function isAdmin(userId: string | null | undefined): boolean {
    if (!userId) return false;
    return userId === 'user_398nliMV592Jf0YOcQWQYo1VwbC';
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
