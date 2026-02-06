import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { LiveClass, generateRecurringInstances } from '@/sanity/lib/live-classes';
import { currentUser } from '@clerk/nextjs/server';
import LiveClassesCards from './LiveClassesCards';

export const dynamic = 'force-dynamic';

export default async function LiveClassesWorkshopsPage() {
  const user = await currentUser();
  const tier = (user?.publicMetadata?.tier as string) || 'free';
  const now = new Date().toISOString();

  // Query for classes targeted specifically at teachers or everyone
  const query = `*[_type == "liveClass" && (targetAudience == "teacher" || targetAudience == "all") && dateTime >= "${now}"] | order(dateTime asc) {
    _id,
    title,
    instructor,
    dateTime,
    duration,
    type,
    description,
    zoomLink,
    isRecurring,
    recurrencePattern,
    recurrenceEndDate,
    isLocked
  }`;

  const rawClasses: LiveClass[] = await client.fetch(query);

  // Expand recurring classes into individual instances
  const allClasses = rawClasses.flatMap(generateRecurringInstances);

  // Filter out any past instances and sort by date
  const upcomingClasses = allClasses
    .filter(cls => new Date(cls.dateTime) >= new Date())
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, 10);

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-16 bg-(--color-martinique) text-white">
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
            <span className="text-(--color-roti) font-bold uppercase tracking-widest mb-4 block">Live Classes & Workshops</span>
            <h1 className="text-5xl font-bold mb-6">Live Classes & Workshops</h1>
            <p className="text-xl text-(--color-sidecar) max-w-2xl mx-auto">
              Join live sessions led by experienced teachers. Classes, workshops, and gatherings designed to support your growth.
            </p>
          </div>
        </div>
      </section>

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
