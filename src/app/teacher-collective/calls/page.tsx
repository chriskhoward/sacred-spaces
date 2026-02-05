import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { LiveClass, generateRecurringInstances } from '@/sanity/lib/live-classes';

export const dynamic = 'force-dynamic';

export default async function CommunityCallsPage() {
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
    recurrenceEndDate
  }`;

  const rawClasses: LiveClass[] = await client.fetch(query);

  // Expand recurring classes into individual instances
  const allClasses = rawClasses.flatMap(generateRecurringInstances);

  // Filter out any past instances and sort by date
  const upcomingCalls = allClasses
    .filter(cls => new Date(cls.dateTime) >= new Date())
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, 5); // Show top 5 upcoming

  const getGoogleCalendarUrl = (call: LiveClass) => {
    const startDate = new Date(call.dateTime);
    // Default to 1 hour if duration is not provided or easily parseable
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const fmtDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: call.title,
      dates: `${fmtDate(startDate)}/${fmtDate(endDate)}`,
      details: `${call.description}\n\nJoin via Zoom: ${call.zoomLink || 'No link provided'}`,
      location: call.zoomLink || 'Online',
    });

    return `https://www.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-16 bg-(--color-martinique) text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-(--color-roti) font-bold uppercase tracking-widest mb-4 block">Teacher&apos;s Collective</span>
          <h1 className="text-5xl font-bold mb-6">Community Calls</h1>
          <p className="text-xl text-(--color-sidecar) max-w-2xl mx-auto">
            Gather with us to learn, pray, and grow. These live sessions are the heartbeat of our collective.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-(--color-primary) mb-8 pl-4 border-l-4 border-(--color-roti)">Upcoming Live Sessions</h2>
            <div className="grid gap-8">
              {upcomingCalls.length > 0 ? (
                upcomingCalls.map((call, idx) => {
                  const callDate = new Date(call.dateTime);
                  const month = callDate.toLocaleString('en-US', { month: 'long' });
                  const day = callDate.getDate();
                  const time = callDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });

                  return (
                    <div key={call._id} className="bg-white p-8 md:p-12 rounded-[30px_0_30px_0] shadow-lg flex flex-col md:flex-row gap-8 items-start md:items-center group hover:scale-[1.01] transition-transform">
                      <div className="bg-(--color-sidecar) text-(--color-bronzetone) p-6 rounded-2xl text-center min-w-[140px]">
                        <span className="block text-4xl font-bold mb-1">{month.substring(0, 3)}</span>
                        <span className="block text-2xl font-bold">{day}</span>
                        <span className="block text-sm font-bold uppercase mt-2">{time}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-(--color-primary) mb-2 group-hover:text-(--color-roti) transition-colors">
                          {call.title}: <span className="text-gray-600 font-normal">{call.type}</span>
                        </h3>
                        <p className="text-gray-500 mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-(--color-roti)"></span>
                          Hosted by {call.instructor}
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {call.description}
                        </p>
                        <div className="flex gap-4">
                          <a
                            href={getGoogleCalendarUrl(call)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary px-8 py-3 text-sm text-center"
                          >
                            Add to Calendar
                          </a>
                          {call.zoomLink && (
                            <a
                              href={call.zoomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-8 py-3 border-2 border-(--color-primary) text-(--color-primary) font-bold rounded-[10px_0_10px_0] hover:bg-(--color-primary) hover:text-white transition-all text-sm text-center"
                            >
                              Join via Zoom
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-white rounded-[30px_0_30px_0] shadow-md">
                  <p className="text-xl text-gray-500">No upcoming calls scheduled at this time. Check back soon! 🙏</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-(--color-primary) p-12 rounded-[40px_0_40px_0] text-white text-center">
            <h3 className="text-3xl font-bold mb-6">Missed a Call?</h3>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
              All our community calls are recorded and archived in the Resource Library.
              Catch up on the conversations that matter to you.
            </p>
            <Link href="/teacher-collective/resources" className="bg-(--color-roti) text-white px-10 py-4 font-bold rounded-[15px_0_15px_0] hover:bg-white hover:text-(--color-primary) transition-all inline-block">
              Browse Archive
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
