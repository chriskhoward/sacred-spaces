import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PortableTextOrString from '@/components/summit/PortableTextOrString';
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { isAllowedIframeUrl } from '@/lib/iframe-utils';

export const metadata: Metadata = {
  title: 'Start here | Teacher Collective',
  description: 'Get started with the Flow in Faith Teachers Collective. Videos, guides, and resources for new members.',
};

const CATEGORIES_QUERY = `*[_type == "teacherOnboardingCategory"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  order
}`;

const ONBOARDING_ITEMS_QUERY = `*[_type == "teacherOnboardingItem"] | order(order asc) {
  _id,
  title,
  description,
  itemType,
  url,
  "pdfFileUrl": pdfFile.asset->url,
  pdfUrl,
  order,
  "categoryId": category._ref,
  "categoryTitle": category->title,
  "categoryOrder": category->order
}`;

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (/youtube\.com|youtu\.be/.test(u.hostname)) {
      const id = u.hostname === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

function getVimeoEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const match = u.pathname.match(/\/video\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  } catch {
    return null;
  }
}

type OnboardingCategory = {
  _id: string;
  title: string;
  slug: string | null;
  order: number;
};

type OnboardingItem = {
  _id: string;
  title: string;
  description?: any;
  itemType: 'video' | 'pdf' | 'link';
  url?: string | null;
  pdfFileUrl?: string | null;
  pdfUrl?: string | null;
  order: number;
  categoryId?: string | null;
  categoryTitle?: string | null;
  categoryOrder?: number | null;
};

function groupItemsByCategory(
  categories: OnboardingCategory[],
  items: OnboardingItem[]
): { category: OnboardingCategory | null; items: OnboardingItem[] }[] {
  const byCategoryId = new Map<string, OnboardingItem[]>();
  const uncategorized: OnboardingItem[] = [];

  for (const item of items) {
    if (item.categoryId) {
      const list = byCategoryId.get(item.categoryId) ?? [];
      list.push(item);
      byCategoryId.set(item.categoryId, list);
    } else {
      uncategorized.push(item);
    }
  }

  const result: { category: OnboardingCategory | null; items: OnboardingItem[] }[] = [];
  for (const cat of categories) {
    const catItems = byCategoryId.get(cat._id) ?? [];
    if (catItems.length > 0) result.push({ category: cat, items: catItems });
  }
  if (uncategorized.length > 0) result.push({ category: null, items: uncategorized });
  return result;
}

export default async function TeacherCollectiveStartPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (user.publicMetadata.membershipType !== 'teacher') {
    redirect('/dashboard');
  }

  const [categories, items] = await Promise.all([
    client.fetch<OnboardingCategory[]>(CATEGORIES_QUERY),
    client.fetch<OnboardingItem[]>(ONBOARDING_ITEMS_QUERY),
  ]);
  const grouped = groupItemsByCategory(categories, items);
  const hasItems = items.length > 0;

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
          <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-white/20 uppercase">Orientation</span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">Start here</h1>
          <p className="text-xl text-(--color-sidecar) opacity-90">
            Welcome to the Collective. Use the resources below to get oriented—videos, guides, and PDFs appear here as they’re added.
          </p>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/dashboard/teacher-collective"
              className="inline-block text-(--color-roti) font-bold mb-6 hover:underline"
            >
              ← Back to Dashboard
            </Link>

            {hasItems ? (
              <div className="space-y-12">
                {grouped.map(({ category, items: categoryItems }) => (
                  <section key={category?._id ?? 'uncategorized'}>
                    {category && (
                      <h2 className="text-2xl font-bold text-(--color-primary) mb-6 pb-2 border-b-2 border-(--color-roti)/30">
                        {category.title}
                      </h2>
                    )}
                    {!category && grouped.length > 1 && (
                      <h2 className="text-2xl font-bold text-(--color-primary) mb-6 pb-2 border-b-2 border-(--color-roti)/30">
                        More resources
                      </h2>
                    )}
                    <ul className="space-y-6">
                      {categoryItems.map((item) => (
                        <li key={item._id}>
                          {item.itemType === 'video' && item.url ? (
                            /* Video card: media on top, content below */
                            <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                              <div className="relative border-b border-gray-100">
                                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-(--color-primary) text-white text-xs font-bold uppercase tracking-wide">
                                  Video
                                </span>
                                {getYouTubeEmbedUrl(item.url) && isAllowedIframeUrl(getYouTubeEmbedUrl(item.url)!) ? (
                                  <div className="aspect-video w-full overflow-hidden bg-black">
                                    <iframe
                                      src={getYouTubeEmbedUrl(item.url)!}
                                      title={item.title}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      sandbox="allow-scripts allow-same-origin allow-presentation"
                                      className="w-full h-full"
                                    />
                                  </div>
                                ) : getVimeoEmbedUrl(item.url) && isAllowedIframeUrl(getVimeoEmbedUrl(item.url)!) ? (
                                  <div className="aspect-video w-full overflow-hidden bg-black">
                                    <iframe
                                      src={getVimeoEmbedUrl(item.url)!}
                                      title={item.title}
                                      allow="fullscreen; picture-in-picture"
                                      allowFullScreen
                                      sandbox="allow-scripts allow-same-origin allow-presentation"
                                      className="w-full h-full"
                                    />
                                  </div>
                                ) : (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="aspect-video w-full flex items-center justify-center bg-(--color-primary)/10 text-(--color-primary) font-bold hover:bg-(--color-primary)/20 transition-colors"
                                  >
                                    Watch video →
                                  </a>
                                )}
                              </div>
                              <div className="p-6 md:p-8">
                                <h3 className="text-xl font-bold text-(--color-primary) mb-2">{item.title}</h3>
                                {item.description && (
                                  <PortableTextOrString value={item.description} className="text-gray-600" />
                                )}
                              </div>
                            </article>
                          ) : (
                            /* PDF / Link: standard list card */
                            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                              <h3 className="text-xl font-bold text-(--color-primary) mb-2">{item.title}</h3>
                              {item.description && (
                                {item.description && <PortableTextOrString value={item.description} className="text-gray-600 mb-4" />}
                              )}
                              {item.itemType === 'pdf' && (item.pdfFileUrl || item.pdfUrl) && (
                                <a
                                  href={item.pdfFileUrl || item.pdfUrl || '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-(--color-roti)/10 text-(--color-primary) rounded-lg font-bold hover:bg-(--color-roti)/20 transition-colors"
                                >
                                  Open PDF →
                                </a>
                              )}
                              {item.itemType === 'link' && item.url && (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-(--color-primary)/10 text-(--color-primary) rounded-lg font-bold hover:bg-(--color-primary)/20 transition-colors"
                                >
                                  Open link →
                                </a>
                              )}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                <h2 className="text-2xl font-bold text-(--color-primary) mb-4">Getting started</h2>
                <p className="text-gray-600 mb-8">
                  Onboarding content will appear here once it’s added in the CMS. Check back soon or explore the rest of the dashboard.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/dashboard/teacher-collective"
                    className="px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold hover:opacity-90 transition-opacity"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/community"
                    className="px-6 py-3 border-2 border-(--color-primary) text-(--color-primary) rounded-full font-bold hover:bg-(--color-primary)/5 transition-colors"
                  >
                    Visit Community
                  </Link>
                </div>
              </div>
            )}

            {hasItems && (
              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  href="/dashboard/teacher-collective"
                  className="px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold hover:opacity-90 transition-opacity"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/community"
                  className="px-6 py-3 border-2 border-(--color-primary) text-(--color-primary) rounded-full font-bold hover:bg-(--color-primary)/5 transition-colors"
                >
                  Visit Community
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
