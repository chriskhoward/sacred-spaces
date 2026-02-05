import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePageContent from '@/components/Home/HomePageContent';
import BlockRenderer from '@/components/Blocks/BlockRenderer';
import { client } from '@/sanity/lib/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  openGraph: {
    title: "Flow in Faith | Embodied Christ-Centered Yoga & Wellness",
    description: "Where Faith meets Freedom. A Christ-centered wellness ecosystem rooted in embodiment, rest, and community.",
    siteName: "Flow in Faith",
    type: "website",
  }
};

// Query to fetch homepage content from Sanity
const homeQuery = `*[_type == "home"][0]{
  _id,
  _type,
  title,
  content[]{
    _key,
    _type,
    ...
  }
}`;

export default async function Home() {
  // Using the new Teacher Collective homepage design
  // Note: Previous Sanity-based content has been replaced with the Teacher Collective landing page

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HomePageContent />
      <Footer />
    </main>
  );
}
