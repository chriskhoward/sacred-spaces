import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { PricingCards } from './PricingCards';

export const metadata: Metadata = {
  title: "Join the Collective | Membership",
  description: "Secure your spot in the Flow in Faith Teachers Collective. Choose the membership plan that supports your spiritual and professional growth.",
};

const plansProjection = `{
  _id,
  name,
  slug,
  featured,
  displayOrder,
  benefits,
  pricing
}`;

export default async function JoinPage() {
  // Only show plans that are active in Sanity (Is Active? checked)
  const plans = await client.fetch(
    `*[_type == "membershipPlan" && isActive == true] | order(displayOrder asc) ${plansProjection}`
  );

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4">

          {/* Top Image - container sizes to image aspect ratio */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="relative w-full rounded-[30px] overflow-hidden shadow-sm">
              <Image
                src="/assets/images/alignment_header.jpg"
                width={1920}
                height={427}
                className="w-full h-auto block"
                alt="Join the Teachers Collective"
              />
            </div>
          </div>

          {/* Founders Rate */}
            <div className="max-w-3xl mx-auto mb-16 px-4 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-(--color-primary) mb-4">Founders Rate</h3>
              <p className="text-(--color-primary) text-lg leading-relaxed mb-6">
                As we open the doors, we&apos;re honoring those who join during this founding season with a special{' '}
                <span className="text-(--color-roti) font-semibold">Founder&apos;s Rate</span>
                {' '}— a reflection of the teachers who are helping shape this space from the ground up.
              </p>
              <div className="space-y-3 mb-6 text-lg">
                <p>
                  <span className="text-(--color-roti) font-semibold">Founder&apos;s Core</span>
                  <span className="text-(--color-roti)"> → </span>
                  <span className="text-(--color-primary) font-bold">$37/month ($370 annually)</span>
                </p>
                <p>
                  <span className="text-(--color-roti) font-semibold">Founder&apos;s Pro</span>
                  <span className="text-(--color-roti)"> → </span>
                  <span className="text-(--color-primary) font-bold">$57/month ($570 annually)</span>
                </p>
              </div>
              <p className="text-(--color-primary) leading-relaxed">
                More great news! Your{' '}
                <span className="text-(--color-roti) font-semibold underline">Founder&apos;s Rate</span>
                {' '}is locked in as long as you remain a member.
              </p>
            </div>

          <div className="max-w-5xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-(--color-primary) mb-6">Choose Your Path</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Select a membership plan to continue your journey into the Collective.</p>
            </div>

            {/* Pricing: only Sanity plans with isActive == true */}
            <div className="bg-white rounded-[30px] shadow-2xl p-6 md:p-12 border border-gray-50">
              {plans.length > 0 ? (
                <PricingCards plans={plans} />
              ) : (
                <p className="text-center text-gray-500 py-12">No membership plans are currently available. Please check back later.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
