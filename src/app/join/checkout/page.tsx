'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useClerk, useAuth } from '@clerk/nextjs';
import Link from 'next/link';

/**
 * Checkout Bridge Page
 * 
 * Reads `?plan=core` or `?plan=pro` from the URL, finds the matching
 * Clerk plan, and programmatically opens the Clerk checkout modal.
 * 
 * This avoids users seeing the PricingTable twice when coming from
 * dedicated landing pages (/join/core, /join/pro).
 */

// Regular plan IDs
const regularPlanIds: Record<string, string> = {
    'core': 'cplan_39RVE1cg83vWrMv6WezIPHDjaF4',
    'pro': 'cplan_39RVTnsvjEGQc6psl785lwUyjho',
};

// Founders plan IDs (active through February 2026)
const foundersPlanIds: Record<string, string> = {
    'core': 'cplan_39XYMfLviwQ9cVZwIW5FuAKZRGH',
    'pro': 'cplan_39XZ6jdRLNC78T7xYK7PP4J8RLO',
};

// Use Founders plans until March 1, 2026
function getPlanIdMap(): Record<string, string> {
    const now = new Date();
    const marchFirst2026 = new Date('2026-03-01T00:00:00');
    return now < marchFirst2026 ? foundersPlanIds : regularPlanIds;
}

const planIdMap = getPlanIdMap();

export default function CheckoutBridgePage() {
    const searchParams = useSearchParams();
    const { isSignedIn, isLoaded: authLoaded } = useAuth();
    const clerk = useClerk();
    const [error, setError] = useState<string | null>(null);
    const [attempted, setAttempted] = useState(false);

    const planParam = searchParams.get('plan');
    const freqParam = searchParams.get('frequency') || 'month';

    useEffect(() => {
        if (!authLoaded || attempted) return;

        // Not signed in — redirect to sign-up with return URL
        if (!isSignedIn) {
            window.location.href = `/sign-up?redirect_url=/join/checkout?plan=${planParam}&frequency=${freqParam}`;
            return;
        }

        // Invalid or missing plan
        if (!planParam || !planIdMap[planParam]) {
            setError(`Unknown plan: "${planParam}". Please select a valid plan.`);
            setAttempted(true);
            return;
        }

        // Open Clerk's checkout modal
        try {
            setAttempted(true);

            // Use Clerk's internal checkout opener which handles plan lookup and payment UI
            (clerk as any).__internal_openCheckout({
                planId: planIdMap[planParam],
                planPeriod: freqParam === 'year' ? 'year' : 'month',
                newSubscriptionRedirectUrl: '/api/onboarding/pay-success',
            });
        } catch (err: any) {
            console.error('Failed to open checkout:', err);
            setError(err?.message || 'Failed to open checkout. Please try again.');
        }
    }, [authLoaded, isSignedIn, clerk, planParam, freqParam, attempted]);

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-white">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Checkout Error</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link href="/join" className="inline-block px-6 py-3 bg-(--color-roti) text-white font-bold rounded-full hover:opacity-90 transition-opacity">
                        Back to Plans
                    </Link>
                </div>
            </div>
        );
    }

    // Loading state while Clerk initializes
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-roti) mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Preparing your checkout...</p>
                <p className="text-gray-400 text-sm mt-2">You&apos;ll be redirected to payment shortly.</p>
            </div>
        </div>
    );
}
