import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function LiveClassesPage() {
  const query = `*[_type == "liveClass"] | order(dateTime asc) {
    _id,
    title,
    instructor,
    dateTime,
    duration,
    type,
    description
  }`;

  const liveClasses = await client.fetch(query);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return {
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
      day: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })
    };
  };

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
      
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-[3rem_0_3rem_0] shadow-xl overflow-hidden">
            {liveClasses.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                    No upcoming live classes scheduled at the moment. Check back soon!
                </div>
            ) : (
                liveClasses.map((cls: any, index: number) => {
                  const { weekday, day, time } = formatDate(cls.dateTime);
                  return (
                    <div 
                        key={cls._id} 
                        className={`p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-gray-50 transition-colors ${
                        index !== liveClasses.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                    >
                        <div className="bg-(--color-sidecar)/30 p-6 rounded-2xl text-center min-w-[140px] border border-(--color-sidecar)">
                            <div className="text-(--color-primary) font-bold text-lg">{weekday}</div>
                            <div className="text-3xl font-bold text-(--color-bronzetone) my-1">{day}</div>
                            <div className="text-sm font-bold text-gray-500 uppercase">{time}</div>
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-(--color-primary) text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                                    {cls.type}
                                </span>
                                <span className="text-gray-500 text-sm font-medium">
                                {cls.duration} • with {cls.instructor}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-(--color-primary) mb-3">{cls.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {cls.description}
                            </p>
                            {/* In a real app, this button logic would check if user is a member/logged in */}
                            <button className="btn btn-primary px-8 py-3 text-sm flex items-center gap-2">
                                <span>Reserve Spot</span>
                            </button>
                        </div>
                    </div>
                );
              })
            )}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-(--color-primary) mb-4">Want to teach a class?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We are always looking for passionate teachers to lead our community. 
              Join the Teacher Collective to apply for teaching opportunities.
            </p>
            <Link href="/sign-up" className="text-(--color-roti) font-bold text-lg hover:underline">
              Join the Collective →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
