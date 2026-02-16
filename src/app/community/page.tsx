import { currentUser } from '@clerk/nextjs/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import CommunityClient from './CommunityClient';

export const metadata: Metadata = {
  title: 'Community | Flow in Faith',
  description: 'Connect, share, and grow with fellow members in our private WhatsApp community.',
};

export const dynamic = 'force-dynamic';

export default async function CommunityPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <main className="bg-(--color-gallery) min-h-screen">
        <Navbar />
        <section className="pt-[160px] pb-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 shadow-xl">
              <h1 className="text-4xl font-bold text-(--color-primary) mb-6">
                Members Only
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sign in to access our directory of Christ-centered yoga teachers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sign-in"
                  className="btn btn-primary"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <header className="bg-(--color-primary) pt-[200px] pb-24 text-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/images/tc_logo.png"
              alt="Flow in Faith Teachers Collective Logo"
              width={120}
              height={120}
              className="w-24 h-24 object-contain"
            />
          </div>
          <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-white/20 uppercase">Community Forum</span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">Community Forum</h1>
          <p className="text-xl text-(--color-sidecar) opacity-90">
            Connect, share, and grow with fellow members in our private WhatsApp community.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <CommunityClient />
        </div>
      </section>

      <Footer />
    </main>
  );
}
