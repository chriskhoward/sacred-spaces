import { redirect } from 'next/navigation';

/**
 * Checkout Bridge Page
 * 
 * Previously attempted to create a checkout session via the Clerk backend API,
 * but `clerk.billing.createCheckoutSession()` does not exist in the SDK.
 * 
 * Clerk Billing checkout is handled entirely by the frontend <PricingTable /> 
 * component. This page now simply redirects to /join where the PricingTable
 * handles plan selection and payment.
 */
export default async function CheckoutRedirectPage() {
    redirect('/join');
}
