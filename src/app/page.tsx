import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePageContent from '@/components/Home/HomePageContent';
import FAQBlock from '@/components/Blocks/FAQ';
import { Metadata } from 'next';

export const metadata: Metadata = {
  openGraph: {
    title: "Flow in Faith | Embodied Christ-Centered Yoga & Wellness",
    description: "Where Faith meets Freedom. A Christ-centered wellness ecosystem rooted in embodiment, rest, and community.",
    siteName: "Flow in Faith",
    type: "website",
  }
};

export default async function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HomePageContent />
      <Footer />
    </main>
  );
}
