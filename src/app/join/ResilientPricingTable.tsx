'use client';

import React from 'react';
import { PricingTable } from '@clerk/nextjs';
import { PricingCards } from './PricingCards';

class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // Check if it's the Clerk billing error
        if (error?.code === 'cannot_render_billing_disabled') {
            console.warn('Clerk Billing is disabled. Rendering fallback pricing cards.');
        } else {
            console.error('PricingTable Error:', error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        <p className="font-bold mb-1">Clerk Billing Error:</p>
                        <p>Clerk reports that billing is disabled for this instance. If you just enabled it, please try restarting your dev server (`Ctrl+C` then `npm run dev`) or clearing your browser cache.</p>
                    </div>
                    {this.props.fallback}
                </div>
            );
        }

        return this.props.children;
    }
}

export function ResilientPricingTable() {
    return (
        <ErrorBoundary fallback={<PricingCards />}>
            <PricingTable newSubscriptionRedirectUrl="/api/onboarding/pay-success" />
        </ErrorBoundary>
    );
}
