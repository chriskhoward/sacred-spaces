import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CommunityCallsPage() {
  const upcomingCalls = [
    {
      title: 'Monthly Collective Check-In',
      date: 'Thursday, October 24th',
      time: '7:00 PM EST',
      topic: 'Navigating Burnout in Ministry',
      host: 'Queen Robertson',
      description: 'A safe space to share recent challenges, pray for one another, and finding rest in our calling.'
    },
    {
      title: 'Quarterly Masterclass',
      date: 'Friday, November 11th',
      time: '12:00 PM EST',
      topic: 'The Business of Retreats',
      host: 'De Bolton',
      description: 'Learn the logistics of planning, pricing, and promoting a profitable and spiritually enriching retreat.'
    }
  ];

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
              {upcomingCalls.map((call, idx) => (
                <div key={idx} className="bg-white p-8 md:p-12 rounded-[30px_0_30px_0] shadow-lg flex flex-col md:flex-row gap-8 items-start md:items-center group hover:scale-[1.01] transition-transform">
                  <div className="bg-(--color-sidecar) text-(--color-bronzetone) p-6 rounded-2xl text-center min-w-[140px]">
                    <span className="block text-4xl font-bold mb-1">{call.date.split(',')[1].trim().split(' ')[0]}</span>
                    <span className="block text-2xl font-bold">{call.date.split(',')[1].trim().split(' ')[1]}</span>
                    <span className="block text-sm font-bold uppercase mt-2">{call.time}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-(--color-primary) mb-2 group-hover:text-(--color-roti) transition-colors">
                      {call.title}: <span className="text-gray-600 font-normal">{call.topic}</span>
                    </h3>
                    <p className="text-gray-500 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-(--color-roti)"></span>
                      Hosted by {call.host}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {call.description}
                    </p>
                    <div className="flex gap-4">
                      <button className="btn btn-primary px-8 py-3 text-sm">
                        Add to Calendar
                      </button>
                      <button className="px-8 py-3 border-2 border-(--color-primary) text-(--color-primary) font-bold rounded-[10px_0_10px_0] hover:bg-(--color-primary) hover:text-white transition-all text-sm">
                        Join via Zoom
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
