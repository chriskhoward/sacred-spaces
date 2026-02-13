import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { LiveClass, generateRecurringInstances } from '@/sanity/lib/live-classes';
import LiveClassesCards from './LiveClassesCards';
import { Metadata } from 'next';
import { isProTier, isAdmin, isTeacher } from '@/lib/tier';

export const metadata: Metadata = {
  title: 'Live Classes | Flow in Faith',
  description: 'Join live Christ-centered yoga and wellness classes. View the schedule and sign up for upcoming sessions.',
};

export const dynamic = 'force-dynamic';

export default async function LiveClassesPage() {
  const user = await currentUser();
  const userId = user?.id || null;
  const adminStatus = isAdmin(userId);
  const membershipType = (user?.publicMetadata?.membershipType as string) || 'practitioner';
  const tier = (user?.publicMetadata?.tier as string) || 'free';

  const now = new Date().toISOString();

  // Determine search filters based on membership collective
  const isTeacherUser = isTeacher(userId, membershipType);
  const collective = isTeacherUser ? 'teacher' : 'practitioner';
  const allowedAudiences = ['all', collective, `${collective}_core`, `${collective}_pro`];

  const query = `*[_type == "liveClass" && targetAudience in $allowedAudiences && dateTime >= "${now}"] | order(dateTime asc) {
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

  const rawClasses: LiveClass[] = await client.fetch(query, { allowedAudiences });

  const allClasses = rawClasses.flatMap(generateRecurringInstances);

  // Mark classes as locked based on Admin bypass and Pro status
  const processedClasses = allClasses.map(cls => ({
    ...cls,
    // Lock if NOT admin AND (manual lock OR audience is Pro while user is not Pro)
    isLocked: adminStatus ? false : (cls.isLocked || (cls.targetAudience?.endsWith('_pro') && tier.toLowerCase() !== 'pro'))
  }));

  const upcomingClasses = processedClasses
    .filter(cls => new Date(cls.dateTime) >= new Date())
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, 15);

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-16 bg-(--color-primary) text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Image
                src="/assets/images/tc_logo.png"
                alt="Flow in Faith Logo"
                width={120}
                height={120}
                className="w-24 h-24 object-contain"
              />
            </div>
            <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-white/20 uppercase">Live Classes & Workshops</span>
            <h1 className="text-5xl font-bold mb-6">Live Classes & Workshops</h1>
            <p className="text-xl text-(--color-sidecar) max-w-2xl mx-auto">
              Gather with us in real-time. Move, breathe, and pray in community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-(--color-primary) mb-8 pl-4 border-l-4 border-(--color-roti)">Upcoming Sessions</h2>
          <LiveClassesCards classes={upcomingClasses} userTier={tier} userId={userId} />
        </div>
      </section>

      {/* Want to teach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h3 className="text-3xl font-bold text-(--color-primary) mb-4">Want to teach a class?</h3>
          <p className="text-gray-600 mb-8 text-lg">
            We are always looking for passionate teachers to lead our community.
            Join the Teacher Collective to apply for teaching opportunities.
          </p>
          <Link
            href="/teacher-collective"
            className="inline-block px-6 py-3 bg-(--color-roti) text-white font-bold rounded-full text-sm hover:opacity-90 transition-opacity shadow-lg"
          >
            Learn About the Teacher Collective
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
