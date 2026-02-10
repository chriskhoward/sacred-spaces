import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Metadata } from 'next';
import { PricingTable } from '@clerk/nextjs';

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

            {/* Left Column: Benefits Images Stacked */}
            <div className="flex flex-col gap-8">
              <div className="bg-(--color-gallery) p-8 rounded-[30px] text-center border-2 border-dashed border-gray-300 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                <Image src="/assets/images/core_benefits.png" fill className="object-contain p-4" alt="Core Benefits" />
              </div>

              <div className="bg-(--color-martinique) p-8 rounded-[30px] text-center border-2 border-dashed border-white/30 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                <Image src="/assets/images/pro_benefits.png" fill className="object-contain p-4" alt="Pro Benefits" />
              </div>
            </div>

            {/* Right Column: Clerk Pricing Table */}
            <div className="bg-white rounded-[20px] shadow-2xl p-4 lg:p-8 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-(--color-primary) mb-6 text-center">Choose Your Plan</h2>
              <PricingTable />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
