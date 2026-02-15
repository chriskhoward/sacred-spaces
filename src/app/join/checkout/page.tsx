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

import { client } from '@/sanity/lib/client';

export default function CheckoutBridgePage() {
    const searchParams = useSearchParams();
    const { isSignedIn, isLoaded: authLoaded } = useAuth();
    const clerk = useClerk();
    const [error, setError] = useState<string | null>(null);
    const [attempted, setAttempted] = useState(false);
    const [fetchingPlan, setFetchingPlan] = useState(false);

    const planParam = searchParams.get('plan');
    const freqParam = searchParams.get('frequency') || 'month';

    useEffect(() => {
        if (!authLoaded || attempted || fetchingPlan) return;

        // Not signed in — redirect to sign-up with return URL
        if (!isSignedIn) {
            window.location.href = `/sign-up?redirect_url=/join/checkout?plan=${planParam}&frequency=${freqParam}`;
            return;
        }

        // Missing plan param
        if (!planParam) {
            setError(`Please select a valid plan.`);
            setAttempted(true);
            return;
        }

        async function fetchAndOpenCheckout() {
            setFetchingPlan(true);
            try {
                // Fetch the plan from Sanity
                const plan = await client.fetch(
                    `*[_type == "membershipPlan" && slug.current == $slug][0]`,
                    { slug: planParam }
                );

                if (!plan) {
                    setError(`Unknown plan: "${planParam}". Please select a valid plan.`);
                    setAttempted(true);
                    return;
                }

                // Determine the correct Clerk Plan ID (Standalone)
                const clerkPlanId = freqParam === 'year' ? plan.pricing.clerkPlanIdYear : plan.pricing.clerkPlanIdMonth;

                if (!clerkPlanId) {
                    setError(`Configuration error for plan "${planParam}". Please contact support.`);
                    setAttempted(true);
                    return;
                }

                // Open Clerk's checkout modal
                (clerk as any).__internal_openCheckout({
                    planId: clerkPlanId,
                    planPeriod: freqParam === 'year' ? 'year' : 'month',
                    newSubscriptionRedirectUrl: '/api/onboarding/pay-success',
                });

                setAttempted(true);
            } catch (err: any) {
                console.error('Failed to open checkout:', err);
                setError(err?.message || 'Failed to open checkout. Please try again.');
                setAttempted(true);
            } finally {
                setFetchingPlan(false);
            }
        }

        fetchAndOpenCheckout();
    }, [authLoaded, isSignedIn, clerk, planParam, freqParam, attempted, fetchingPlan]);

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
