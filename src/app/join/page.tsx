import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Metadata } from 'next';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { ResilientPricingTable } from './ResilientPricingTable';
import { PricingCards } from './PricingCards';
import { BenefitsImages } from './BenefitsImages';

export const metadata: Metadata = {
  title: "Join the Collective | Membership",
  description: "Secure your spot in the Flow in Faith Teachers Collective. Choose the membership plan that supports your spiritual and professional growth.",
};

export default async function JoinPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4">

          {/* Top Image */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="relative w-full h-64 bg-gray-100 rounded-[30px] overflow-hidden">
              <Image src="/assets/images/alignment_header.jpg" fill className="object-cover" alt="Join the Teachers Collective" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left Column: Benefits Images Stacked (click to open lightbox) */}
            <div>
              <BenefitsImages />
            </div>

            {/* Right Column: Pricing Selection */}
            <div className="bg-white rounded-[20px] shadow-2xl p-4 lg:p-8 border border-gray-100 sticky top-24">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-(--color-primary) mb-4">Choose Your Path</h2>
                <p className="text-gray-600 mb-8">Select a membership plan to continue your journey.</p>
              </div>

              <SignedIn>
                <ResilientPricingTable />
              </SignedIn>
              <SignedOut>
                <PricingCards />
              </SignedOut>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
