import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { LiveClass, generateRecurringInstances } from '@/sanity/lib/live-classes';
import { currentUser } from '@clerk/nextjs/server';
import LiveClassesSection from '@/app/live-classes/LiveClassesSection';
import { isAdmin } from '@/lib/tier';

export const dynamic = 'force-dynamic';

export default async function LiveClassesWorkshopsPage() {
  const user = await currentUser();
  const tier = (user?.publicMetadata?.tier as string) || 'free';
  const role = (user?.publicMetadata?.role as string) || null;
  const adminStatus = isAdmin(role);
  const now = new Date().toISOString();

  const allowedAudiences = ["all", "teacher", "teacher_core", "teacher_pro"];
  const categoriesQuery = `*[_type == "liveClassCategory"] | order(order asc) { _id, title, "slug": slug.current }`;
  const classesQuery = `*[_type == "liveClass" && (targetAudience == "all" || count(targetAudience[@ in $allowedAudiences]) > 0) && dateTime >= "${now}"] | order(dateTime asc) {
    _id,
    title,
    instructor,
    dateTime,
    duration,
    type,
    "category": category->title,
    "categorySlug": category->slug.current,
    "categoryRef": category._ref,
    description,
    zoomLink,
    isRecurring,
    recurrencePattern,
    recurrenceEndDate,
    isLocked,
    targetAudience
  }`;

  const [categories, rawClasses] = await Promise.all([
    client.fetch<{ _id: string; title: string; slug: string | null }[]>(categoriesQuery),
    client.fetch<LiveClass[]>(classesQuery, { allowedAudiences }),
  ]);

  // Expand recurring classes into individual instances
  const allClasses = rawClasses.flatMap(generateRecurringInstances);

  // Mark classes as locked based on Admin bypass and Pro status
  // Strip zoomLink from locked classes so it never reaches the client
  const processedClasses = allClasses.map(cls => {
    const isLocked = adminStatus ? false : (cls.isLocked || (Array.isArray(cls.targetAudience) && cls.targetAudience.some((a: string) => a.endsWith('_pro')) && tier.toLowerCase() !== 'pro'));
    return {
      ...cls,
      zoomLink: isLocked ? undefined : cls.zoomLink,
      isLocked,
    };
  });

  // Filter out any past instances and sort by date
  const upcomingClasses = processedClasses
    .filter(cls => new Date(cls.dateTime) >= new Date())
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, 10);

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
          <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-white/20 uppercase">Live Classes & Workshops</span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">Live Classes & Workshops</h1>
          <p className="text-xl text-(--color-sidecar) opacity-90">
            Join live sessions led by experienced teachers. Classes, workshops, and gatherings designed to support your growth.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-(--color-primary) mb-8 pl-4 border-l-4 border-(--color-roti)">Upcoming Sessions</h2>
          <LiveClassesSection
            categories={categories ?? []}
            classes={upcomingClasses}
            userTier={tier}
            userId={user?.id ?? null}
          />
        </div>
      </section>
    </main>
  );
}
