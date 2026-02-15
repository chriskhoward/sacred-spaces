import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Metadata } from 'next';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { ResilientPricingTable } from './ResilientPricingTable';
import { PricingCards } from './PricingCards';

export const metadata: Metadata = {
  title: "Join the Collective | Membership",
  description: "Secure your spot in the Flow in Faith Teachers Collective. Choose the membership plan that supports your spiritual and professional growth.",
};

export default async function JoinPage() {
  // Show only Founders plans (via PricingCards) until March 1, 2026
  const now = new Date();
  const isFoundersPeriod = now < new Date('2026-03-01T00:00:00');

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4">

          {/* Top Image */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="relative w-full h-64 bg-gray-100 rounded-[30px] overflow-hidden shadow-sm">
              <Image src="/assets/images/alignment_header.jpg" fill className="object-cover" alt="Join the Teachers Collective" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-(--color-primary) mb-6">Choose Your Path</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Select a membership plan to continue your journey into the Collective.</p>
            </div>

            {/* Pricing Selection */}
            <div className="bg-white rounded-[30px] shadow-2xl p-6 md:p-12 border border-gray-50">
              {isFoundersPeriod ? (
                /* Founders period: all users see PricingCards (routes to Founders checkout) */
                <PricingCards />
              ) : (
                /* Regular period: signed-in users see Clerk PricingTable, guests see PricingCards */
                <>
                  <SignedIn>
                    <ResilientPricingTable />
                  </SignedIn>
                  <SignedOut>
                    <PricingCards />
                  </SignedOut>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
