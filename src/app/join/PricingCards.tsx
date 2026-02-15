'use client';

import React from 'react';
import { Dancing_Script } from 'next/font/google';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-script', display: 'swap' });

interface PricingCardsProps {
    plans: any[];
    onPlanSelect?: (plan: string) => void;
}

export function PricingCards({ plans, onPlanSelect }: PricingCardsProps) {
    const { isSignedIn } = useAuth();
    const [frequency, setFrequency] = React.useState<'month' | 'year'>('month');

    return (
        <div className={`${dancingScript.variable}`}>
            {/* Frequency Toggle */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-full flex items-center shadow-inner">
                    <button
                        onClick={() => setFrequency('month')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${frequency === 'month' ? 'bg-white text-(--color-primary) shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setFrequency('year')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${frequency === 'year' ? 'bg-white text-(--color-primary) shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Yearly
                        <span className="ml-1 text-[10px] bg-(--color-roti) text-white px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Save 15%</span>
                    </button>
                </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-2 mb-8">
                {isSignedIn ? "Please complete your Clerk Billing setup to proceed." : "Sign up to start your membership."}
            </p>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {plans.map((plan) => {
                    const price = frequency === 'month' ? plan.pricing.monthlyPrice : plan.pricing.yearlyPrice;

                    // Split the plan name for the stylized layout
                    // "Collective Core (Founders)" -> ["Collective", "Core", "(Founders)"]
                    const nameParts = plan.name.split(' ');
                    const titleWord1 = nameParts[0]; // "Collective"
                    const titleWord2 = nameParts[1]; // "Core" or "Pro"
                    const subText = nameParts.slice(2).join(' '); // "(Founders)" or empty

                    return (
                        <div
                            key={plan._id}
                            className={`bg-white rounded-2xl border-2 overflow-hidden flex flex-col transition-all hover:scale-[1.02] ${plan.featured ? 'border-(--color-roti) shadow-xl' : 'border-gray-100 shadow-lg'
                                }`}
                        >
                            <div className="p-8 flex-1">
                                <h3 className="text-(--color-primary) font-bold uppercase tracking-wide">
                                    <span className="block text-2xl md:text-3xl">{titleWord1}</span>
                                    <span className="block text-2xl md:text-3xl">{titleWord2}</span>
                                    <span className="text-(--color-roti) text-2xl md:text-3xl font-normal normal-case tracking-normal mt-1 inline-block ml-2 font-[family:var(--font-script)]">
                                        {subText}
                                    </span>
                                </h3>
                                <ul className="mt-8 space-y-4">
                                    {(plan.benefits || []).map((benefit: string) => (
                                        <li key={benefit} className="flex items-start gap-3 text-gray-800 text-sm">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden>
                                                <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-(--color-roti) text-white p-6 text-center rounded-b-2xl">
                                <p className="font-bold text-lg mb-4">${price} / {frequency === 'month' ? 'month' : 'year'}</p>
                                <Link
                                    href={isSignedIn
                                        ? `/join/checkout?plan=${plan.slug.current}&frequency=${frequency}`
                                        : `https://accounts.flowinfaith.com/sign-up?redirect_url=https://www.flowinfaith.com/join/checkout?plan=${plan.slug.current}&frequency=${frequency}`}
                                    className="inline-block w-full px-6 py-3 bg-white text-(--color-roti) font-bold rounded-full hover:bg-gray-50 transition-colors shadow-md"
                                >
                                    Join {titleWord2}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
