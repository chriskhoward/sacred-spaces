import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Metadata } from 'next';
import CommunityClient from './CommunityClient';

export const metadata: Metadata = {
  title: 'Community | Flow in Faith',
  description: 'Connect, share, and grow with fellow members in our private WhatsApp community.',
};

export default function CommunityPage() {
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
