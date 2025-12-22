import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoLibraryClient from './VideoLibraryClient';
import { currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export default async function VideoLibraryPage() {
  const user = await currentUser();
  const membershipType = user?.publicMetadata?.membershipType as string || 'practitioner';

  // Filter based on audience tag
  const query = `*[_type == "video" && (targetAudience == "all" || targetAudience == "${membershipType}")] {
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
