import { getClient } from '@/sanity/lib/client';
import { HOME_QUERY, type HomePage as HomePageData } from '@/sanity/lib/home';
import Navbar from '@/components/Navbar';
import HomePage from '@/components/Home/HomePage';
import HomePageContent from '@/components/Home/HomePageContent';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';

export const metadata: Metadata = {
  openGraph: {
    title: "Flow in Faith | Embodied Christ-Centered Yoga & Wellness",
    description: "Where Faith meets Freedom. A Christ-centered wellness ecosystem rooted in embodiment, rest, and community.",
    siteName: "Flow in Faith",
    type: "website",
  }
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { isEnabled } = await draftMode();
  const client = getClient(isEnabled);
  const data = await client.fetch<HomePageData | null>(HOME_QUERY);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {data?.content ? (
        <HomePage
          blocks={data.content}
          documentId={data._id}
          documentType="home"
        />
      ) : (
        <HomePageContent />
      )}
    </main>
  );
}
