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

  // If we have Sanity content, use BlockRenderer
  // Otherwise, fall back to the hardcoded HomePageContent
  const hasSanityContent = homeData?.content && homeData.content.length > 0;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {hasSanityContent ? (
        <BlockRenderer
          blocks={homeData.content}
          documentId={homeData._id}
          documentType={homeData._type}
        />
      ) : (
        <HomePageContent />
      )}
      <Footer />
    </main>
  );
}
