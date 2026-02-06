import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import ResourcesClient from './ResourcesClient';

export const dynamic = 'force-dynamic';

export default async function TeachingResourcesPage() {
  const user = await currentUser();
  const tier = user?.publicMetadata?.tier as string || 'free';

  // Fetch categories ordered by display order
  const categoriesQuery = `*[_type == "resourceCategory"] | order(order asc) {
    _id,
    title,
    "slug": slug.current
  }`;

  // Fetch ALL resources (no targetAudience filter) so every resource shows; client can filter/badge by audience
  const resourcesQuery = `*[_type == "resource"] | order(_createdAt desc) {
    _id,
    title,
    "category": category->title,
    "categorySlug": category->slug.current,
    description,
    linkUrl,
    isLocked,
    author,
    targetAudience,
    "image": image.asset->url
  }`;

  const [categories, resources] = await Promise.all([
    client.fetch(categoriesQuery),
    client.fetch(resourcesQuery),
  ]);

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
      
      <section className="pt-[160px] pb-16 bg-(--color-primary) text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Image
                src="/assets/images/tc_logo.png"
                alt="Flow in Faith Teachers Collective Logo"
                width={120}
                height={120}
                className="w-24 h-24 object-contain"
              />
            </div>
            <span className="text-(--color-roti) font-bold uppercase tracking-widest mb-4 block">Teaching Resources</span>
            <h1 className="text-5xl font-bold mb-6">Teaching Resources</h1>
            <p className="text-xl text-(--color-sidecar) max-w-2xl mx-auto">
              Curated tools to help you deepen your practice, grow your business, and lead with confidence.
            </p>
          </div>
        </div>
      </section>

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
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
            We believe in collective wisdom. If you have a sequence, playlist, or guide that has blessed your teaching, share it with the community.
          </p>
          <a href="mailto:collective@flowinfaith.com" className="btn btn-primary">
            Submit a Resource
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
