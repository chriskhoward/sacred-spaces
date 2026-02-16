import Navbar from '@/components/Navbar';
import HomePageContent from '@/components/Home/HomePageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  openGraph: {
    title: "Flow in Faith | Embodied Christ-Centered Yoga & Wellness",
    description: "Where Faith meets Freedom. A Christ-centered wellness ecosystem rooted in embodiment, rest, and community.",
    siteName: "Flow in Faith",
    type: "website",
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HomePageContent />
    </main>
  );
}
