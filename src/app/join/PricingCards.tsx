'use client';

import { Dancing_Script } from 'next/font/google';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-script', display: 'swap' });

interface PricingCardsProps {
    onPlanSelect?: (plan: string) => void;
}

export function PricingCards({ onPlanSelect }: PricingCardsProps) {
    const { isSignedIn } = useAuth();

    return (
        <div className={`${dancingScript.variable} space-y-8`}>
            {/* Warning for Site Owner if Billing is Disabled */}
            {isSignedIn && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-amber-700 font-medium">
                                Clerk Billing appears to be disabled in your dashboard.
                            </p>
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-amber-600">
                        <p>To enable the real checkout and stop this loop, please visit your <a href="https://dashboard.clerk.com/last-active?path=billing/settings" target="_blank" rel="noopener noreferrer" className="underline font-bold">Clerk Billing Settings</a> and follow the steps to connect Stripe.</p>
                    </div>
                </div>
            )}

            {/* TEACHERS COLLECTIVE Core */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden flex flex-col transition-all hover:scale-[1.02]">
                <div className="p-8 flex-1">
                    <h3 className="text-(--color-primary) font-bold uppercase tracking-wide">
                        <span className="block text-2xl md:text-3xl">Teachers</span>
                        <span className="block text-2xl md:text-3xl">Collective</span>
                        <span className="text-(--color-roti) text-2xl md:text-3xl font-normal normal-case tracking-normal mt-1 inline-block ml-2 font-[family:var(--font-script)]">Core</span>
                    </h3>
                    <ul className="mt-8 space-y-4">
                        <li className="flex items-start gap-3 text-gray-800 text-sm">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden><svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                            Teacher Directory Placement
                        </li>
                        <li className="flex items-start gap-3 text-gray-800 text-sm">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden><svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                            Monthly Community Check-Ins
                        </li>
                        <li className="flex items-start gap-3 text-gray-800 text-sm">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden><svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                            Daily Community Space
                        </li>
                        <li className="flex items-start gap-3 text-gray-800 text-sm">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden><svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                            Quarterly Masterclasses
                        </li>
                    </ul>
                </div>
                <div className="bg-(--color-roti) text-white p-6 text-center rounded-b-2xl">
                    <p className="font-bold text-lg mb-4">$47 / month</p>
                    <Link
                        href={isSignedIn ? "/join/checkout?plan=core" : "/sign-up?redirect_url=/join/checkout?plan=core"}
                        className="inline-block w-full px-6 py-3 bg-white text-(--color-roti) font-bold rounded-full hover:bg-gray-50 transition-colors shadow-md"
                    >
                        {isSignedIn ? "Join Core" : "Join Core"}
                    </Link>
                </div>
            </div>

            {/* TEACHERS COLLECTIVE Pro */}
            <div className="bg-white rounded-2xl border-2 border-(--color-roti) shadow-xl overflow-hidden flex flex-col transition-all hover:scale-[1.02]">
                <div className="p-8 flex-1">
                    <h3 className="text-(--color-primary) font-bold uppercase tracking-wide">
                        <span className="block text-2xl md:text-3xl">Teachers</span>
                        <span className="block text-2xl md:text-3xl">Collective</span>
                        <span className="text-(--color-roti) text-2xl md:text-3xl font-normal normal-case tracking-normal mt-1 inline-block ml-2 font-[family:var(--font-script)]">Pro</span>
                    </h3>
                    <ul className="mt-8 space-y-4">
                        {[
                            'Teacher Directory Placement',
                            'Monthly Community Check-Ins',
                            'Daily Community Space',
                            'Quarterly Masterclasses',
                            'Promotion of Offerings',
                            'Paid Teaching Opportunities',
                            'Contribution to On-Demand Library',
                        ].map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-gray-800 text-sm">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden>
                                    <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-(--color-roti) text-white p-6 text-center rounded-b-2xl">
                    <p className="font-bold text-lg mb-4">$67 / month</p>
                    <Link
                        href={isSignedIn ? "/join/checkout?plan=pro" : "/sign-up?redirect_url=/join/checkout?plan=pro"}
                        className="inline-block w-full px-6 py-3 bg-white text-(--color-roti) font-bold rounded-full hover:bg-gray-50 transition-colors shadow-md"
                    >
                        {isSignedIn ? "Join Pro" : "Join Pro"}
                    </Link>
                </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
                {isSignedIn ? "Please complete your Clerk Billing setup to proceed." : "Sign up to start your membership."}
            </p>
        </div>
    );
}
