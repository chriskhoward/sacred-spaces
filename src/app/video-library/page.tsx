import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Re-add interactive client-side logic for filtering (which needs 'use client') 
// But we also need async data fetching. 
// Best practice: Fetch data in a Server Component, pass to Client Component.
import VideoLibraryClient from './VideoLibraryClient';

export const dynamic = 'force-dynamic';

export default async function VideoLibraryPage() {
  const query = `*[_type == "video"] {
    _id,
    title,
    instructor,
    duration,
    category,
    level,
    description,
    thumbnail,
    videoUrl
  }`;

  const videos = await client.fetch(query);

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />
      <VideoLibraryClient initialVideos={videos} />
      <Footer />
    </main>
  );
}
