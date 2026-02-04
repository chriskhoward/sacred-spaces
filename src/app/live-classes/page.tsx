import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { auth, currentUser } from '@clerk/nextjs/server';
import LiveClassesClient from './LiveClassesClient';
import { LiveClass, generateRecurringInstances } from '@/sanity/lib/live-classes';

export const dynamic = 'force-dynamic';

export default async function LiveClassesPage() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const membershipType = user?.publicMetadata?.membershipType as string || 'practitioner';

  // Get current time for filtering past classes
  const now = new Date().toISOString();

  // Query only fetches classes that haven't ended yet (dateTime >= now)
  const query = `*[_type == "liveClass" && (targetAudience == "all" || targetAudience == "${membershipType}") && dateTime >= "${now}"] | order(dateTime asc) {
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
    recurrenceEndDate
  }`;

  const rawClasses: LiveClass[] = await client.fetch(query);

  // Expand recurring classes into individual instances
  const allClasses = rawClasses.flatMap(generateRecurringInstances);

  // Filter out any past instances and sort by date
  const upcomingClasses = allClasses
    .filter(cls => new Date(cls.dateTime) >= new Date())
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-16 bg-(--color-primary) text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-(--color-roti) font-bold uppercase tracking-widest mb-4 block">Schedule</span>
          <h1 className="text-5xl font-bold mb-6 font-heading">Live Classes</h1>
          <p className="text-xl text-(--color-sidecar) max-w-2xl mx-auto">
            Gather with us in real-time. Move, breathe, and pray in community.
          </p>
        </div>
      </section>

      <LiveClassesClient
        classes={upcomingClasses}
        userId={userId}
        membershipType={membershipType}
      />

      <Footer />
    </main>
  );
}
