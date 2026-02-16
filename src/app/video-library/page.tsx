import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import VideoLibraryClient from './VideoLibraryClient';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { isProTier, isAdmin } from '@/lib/tier';

export const metadata: Metadata = {
  title: 'Video Library | Flow in Faith',
  description: 'Access our on-demand library of Christ-centered yoga and wellness videos. Members only.',
};

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
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 shadow-xl">
              <h1 className="text-4xl font-bold text-(--color-primary) mb-6">
                Members Only
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sign in to access our full library of Christ-centered yoga and wellness videos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sign-in"
                  className="btn btn-primary"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-6 py-3 border-2 border-(--color-primary) text-(--color-primary) rounded-full font-bold text-sm hover:bg-(--color-primary) hover:text-white transition-all text-center"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const membershipType = user?.publicMetadata?.membershipType as string || 'practitioner';
  const tier = user?.publicMetadata?.tier as string || 'free';
  const adminStatus = isAdmin(user?.id);

  // Determine search filters based on membership collective
  // Teachers see 'all' + 'teacher_core' + 'teacher_pro'
  // Practitioners see 'all' + 'practitioner_core' + 'practitioner_pro'
  const collective = membershipType === 'teacher' ? 'teacher' : 'practitioner';
  const allowedAudiences = ['all', `${collective}_core`, `${collective}_pro`];

  // Fetch categories ordered by display order
  const categoriesQuery = `*[_type == "videoCategory"] | order(order asc) {
    _id,
    title,
    "slug": slug.current
  }`;

  // Filter videos by collective; fetch Pro content for Core users so they can be enticed to upgrade
  const videosQuery = `*[_type == "video" && (targetAudience == "all" || count(targetAudience[@ in $allowedAudiences]) > 0)] | order(isFeatured desc, _createdAt desc) {
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
    isFeatured,
    isLocked,
    targetAudience
  }`;

  const [categories, allVideos] = await Promise.all([
    client.fetch(categoriesQuery),
    client.fetch(videosQuery, { allowedAudiences }),
  ]);

  // Mark videos as locked if they are 'pro' but the user is not 'pro'
  const videos = allVideos.map((v: any) => ({
    ...v,
    // Lock if (Admin bypass) is false AND (manual lock OR any audience is Pro while user is not Pro)
    isLocked: adminStatus ? false : (v.isLocked || (Array.isArray(v.targetAudience) && v.targetAudience.some((a: string) => a.endsWith('_pro')) && tier.toLowerCase() !== 'pro'))
  }));

  // Featured video: first one marked featured in Sanity, or fallback to first in list
  const featuredVideo = videos.find((v: { isFeatured?: boolean }) => v.isFeatured) || videos[0] || null;

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />
      <VideoLibraryClient
        initialVideos={videos}
        categories={categories}
        featuredVideo={featuredVideo}
        userTier={tier}
        membershipType={membershipType}
      />
    </main>
  );
}
