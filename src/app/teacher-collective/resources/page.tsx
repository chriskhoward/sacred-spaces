import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import ResourcesClient from './ResourcesClient';
import { isProTier, isAdmin, isTeacher } from '../../../lib/tier';

export const dynamic = 'force-dynamic';

export default async function TeachingResourcesPage() {
  const user = await currentUser();
  const membershipType = user?.publicMetadata?.membershipType as string || 'practitioner';
  const tier = user?.publicMetadata?.tier as string || 'free';
  const adminStatus = isAdmin(user?.id);

  // Determine search filters based on membership collective
  const isTeacherUser = isTeacher(user?.id, membershipType);
  const collective = isTeacherUser ? 'teacher' : 'practitioner';
  const allowedAudiences = ['all', `${collective}_core`, `${collective}_pro`];

  // Fetch categories ordered by display order
  const categoriesQuery = `*[_type == "resourceCategory"] | order(order asc) {
    _id,
    title,
    "slug": slug.current
  }`;

  // Fetch resources for relevant audiences, sorted by display order then creation date
  const resourcesQuery = `*[_type == "resource" && (targetAudience == "all" || count(targetAudience[@ in $allowedAudiences]) > 0)] | order(order asc, _createdAt desc) {
    _id,
    title,
    "category": category->title,
    "categorySlug": category->slug.current,
    "categoryOrder": category->order,
    description,
    linkUrl,
    isLocked,
    author,
    targetAudience,
    "image": image.asset->url
  }`;

  const [categories, allResources] = await Promise.all([
    client.fetch(categoriesQuery),
    client.fetch(resourcesQuery, { allowedAudiences }),
  ]);

  // Mark resources as locked based on Admin bypass and Pro status
  const resources = allResources.map((r: any) => ({
    ...r,
    // Lock if NOT admin AND (manual lock OR any audience is Pro while user is not Pro)
    isLocked: adminStatus ? false : (r.isLocked || (Array.isArray(r.targetAudience) && r.targetAudience.some((a: string) => a.endsWith('_pro')) && tier.toLowerCase() !== 'pro'))
  }));

  // Group resources by category (only include sections that have at least one resource)
  const categoryTitles = new Set(categories.map((c: { title: string }) => c.title));
  const groupedByCategory = categories
    .map((cat: { title: string }) => ({
      category: cat.title,
      items: resources.filter((r: { category?: string | null }) => r.category === cat.title),
    }))
    .filter((g: { items: unknown[] }) => g.items.length > 0);
  const uncategorized = resources.filter(
    (r: { category?: string | null }) => !r.category || !categoryTitles.has(r.category)
  );
  const groupedResources =
    uncategorized.length > 0
      ? [...groupedByCategory, { category: 'Other', items: uncategorized }]
      : groupedByCategory;

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <header className="bg-(--color-primary) pt-[200px] pb-24 text-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/images/tc_logo.png"
              alt="Flow in Faith Teachers Collective Logo"
              width={120}
              height={120}
              className="w-24 h-24 object-contain"
            />
          </div>
          <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-white/20 uppercase">Teaching Resources</span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">Teaching Resources</h1>
          <p className="text-xl text-(--color-sidecar) opacity-90">
            Curated tools to help you deepen your practice, grow your business, and lead with confidence.
          </p>
        </div>
      </header>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <ResourcesClient
            groupedResources={groupedResources}
            userTier={tier}
          />
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-(--color-primary) mb-6">Have a resource to share?</h2>
          {isProTier(tier) ? (
            <>
              <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
                We believe in collective wisdom. If you have a sequence, playlist, or guide that has blessed your teaching, share it with the community.
              </p>
              <a href="mailto:collective@flowinfaith.com" className="btn btn-primary">
                Submit a Resource
              </a>
            </>
          ) : (
            <>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-lg">
                Contribution to the on-demand library is a Pro benefit.
              </p>
              <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                Upgrade to Pro to submit resources and access Promotion of Offerings and Paid Teaching Opportunities.
              </p>
              <Link href="/join/checkout?plan=pro&frequency=month" className="btn btn-primary">
                Upgrade to Pro
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
