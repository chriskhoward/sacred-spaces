import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { LiveClass, generateRecurringInstances } from '@/sanity/lib/live-classes';
import { currentUser } from '@clerk/nextjs/server';
import LiveClassesCards from './LiveClassesCards';
import { isAdmin } from '@/lib/tier';

export const dynamic = 'force-dynamic';

export default async function LiveClassesWorkshopsPage() {
  const user = await currentUser();
  const tier = (user?.publicMetadata?.tier as string) || 'free';
  const adminStatus = isAdmin(user?.id);
  const now = new Date().toISOString();

  // Query for classes targeted specifically at teachers or everyone
  const query = `*[_type == "liveClass" && (targetAudience in ["all", "teacher", "teacher_core", "teacher_pro"]) && dateTime >= "${now}"] | order(dateTime asc) {
    _id,
    title,
    instructor,
    dateTime,
    duration,
    type,
    "category": category->title,
    description,
    zoomLink,
    isRecurring,
    recurrencePattern,
    recurrenceEndDate,
    isLocked,
    targetAudience
  }`;

  const rawClasses: LiveClass[] = await client.fetch(query);

  // Expand recurring classes into individual instances
  const allClasses = rawClasses.flatMap(generateRecurringInstances);

  // Mark classes as locked based on Admin bypass and Pro status
  const processedClasses = allClasses.map(cls => ({
    ...cls,
    // Lock if NOT admin AND (manual lock OR audience is Pro while user is not Pro)
    isLocked: adminStatus ? false : (cls.isLocked || (cls.targetAudience?.endsWith('_pro') && tier.toLowerCase() !== 'pro'))
  }));

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
          <LiveClassesCards classes={upcomingClasses} userTier={tier} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
