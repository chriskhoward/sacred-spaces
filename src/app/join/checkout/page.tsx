import { currentUser, createClerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function CheckoutRedirectPage({
    searchParams,
}: {
    searchParams: Promise<{ plan?: string }>;
}) {
    const { plan } = await searchParams;
    const user = await currentUser();

    if (!user) {
        redirect('/sign-up?redirect_url=/join/checkout?plan=' + (plan || 'core'));
    }

    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

    try {
        // Fetch available plans from Clerk
        // @ts-ignore - v6 method
        const planList = await clerk.billing.getPlanList();

        // Find the requested plan by name (case-insensitive)
        const targetPlan = planList.data.find((p: any) =>
            p.name.toLowerCase() === (plan || 'core').toLowerCase()
        );

        if (!targetPlan) {
            console.error('Plan not found:', plan);
            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Plan Mapping Error</h1>
                        <p className="text-gray-600 mb-6">
                            We couldn't find the "{plan}" plan in our billing system.
                            Please contact support or try selecting a plan manually.
                        </p>
                        <Link href="/join" className="px-6 py-2 bg-black text-white rounded-full">
                            Back to Pricing
                        </Link>
                    </div>
                </div>
            );
        }

        // Get the first price ID for this plan (usually monthly)
        const priceId = (targetPlan as any).prices[0]?.id;

        if (!priceId) {
            throw new Error('No price found for plan');
        }

        // Create checkout session
        // @ts-ignore - v6 method
        const checkout = await clerk.billing.createCheckoutSession({
            clerkUserId: user.id,
            priceId: priceId,
            successUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://flowinfaith.com'}/onboarding`,
            cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://flowinfaith.com'}/join`,
        });

        // Redirect to Stripe/Clerk checkout URL
        if (checkout.url) {
            redirect(checkout.url);
        } else {
            throw new Error('No checkout URL returned');
        }

    } catch (error: any) {
        console.error('Checkout error:', error);

        // If billing is disabled (likely local dev), show a helpful message instead of crashing
        if (error?.clerkError && error?.status === 403) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-amber-50">
                    <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-xl border border-amber-200">
                        <h1 className="text-2xl font-bold text-amber-700 mb-4">Billing Environment Sync</h1>
                        <p className="text-gray-600 mb-6">
                            You've successfully signed up! In production, you would be redirected to the payment screen now.
                        </p>
                        <div className="p-4 bg-amber-100 rounded-lg text-sm text-amber-800 mb-6 text-left">
                            <p className="font-bold mb-1">Local Development Note:</p>
                            <p>Clerk Billing is currently reporting as "Disabled" for this local instance. Once you enable it in your dashboard, this page will work perfectly.</p>
                        </div>
                        <Link href="/onboarding" className="inline-block px-8 py-3 bg-black text-white rounded-full font-bold">
                            Proceed to Onboarding (Dev Skip)
                        </Link>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Redirection Error</h1>
                    <p className="text-gray-600 mb-6">Something went wrong while preparing your secure checkout.</p>
                    <Link href="/join" className="text-blue-600 underline">Try again</Link>
                </div>
            </div>
        );
    }
}
