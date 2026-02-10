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
  let homeData: { _id?: string; _type?: string; content?: unknown[] } | null = null;
  try {
    homeData = await client.fetch(homeQuery);
  } catch (err) {
    console.error('[Home] Sanity fetch failed, using fallback content:', err);
  }

  // We are currently using the hardcoded HomePageContent for the redesign to match the requested design perfectly.
  // Sanity integration for BlockRenderer is available but secondary for now.
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HomePageContent />
      <Footer />
    </main>
  );
}
