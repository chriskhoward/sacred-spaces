import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoLibraryClient from './VideoLibraryClient';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function VideoLibraryPage() {
  const user = await currentUser();

  // Redirect to sign-in if not logged in
  if (!user) {
    return (
      <main className="bg-(--color-gallery) min-h-screen">
        <Navbar />
        <section className="pt-[160px] pb-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto bg-white rounded-[3rem_0_3rem_0] p-12 shadow-xl">
              <h1 className="text-4xl font-bold text-(--color-primary) mb-6">
                Members Only
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sign in to access our full library of Christ-centered yoga and wellness videos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sign-in"
                  className="btn btn-primary px-8 py-4 text-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-8 py-4 border-2 border-(--color-primary) text-(--color-primary) rounded-[2rem_0_2rem_0] font-bold hover:bg-(--color-primary) hover:text-white transition-all text-center text-lg"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const membershipType = user?.publicMetadata?.membershipType as string || 'practitioner';

  // Fetch categories ordered by display order
  const categoriesQuery = `*[_type == "videoCategory"] | order(order asc) {
    _id,
    title,
    "slug": slug.current
  }`;

  // Filter videos by audience; order so featured video is first, then by newest
  const videosQuery = `*[_type == "video" && (targetAudience == "all" || targetAudience == "${membershipType}")] | order(isFeatured desc, _createdAt desc) {
    _id,
    title,
    instructor,
    duration,
    "category": category->title,
    "categorySlug": category->slug.current,
    level,
    description,
    thumbnail,
    videoUrl,
    isFeatured
  }`;

  const [categories, videos] = await Promise.all([
    client.fetch(categoriesQuery),
    client.fetch(videosQuery),
  ]);

  // Featured video: first one marked featured in Sanity, or fallback to first in list
  const featuredVideo = videos.find((v: { isFeatured?: boolean }) => v.isFeatured) || videos[0] || null;

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />
      <VideoLibraryClient initialVideos={videos} categories={categories} featuredVideo={featuredVideo} />
      <Footer />
    </main>
  );
}
