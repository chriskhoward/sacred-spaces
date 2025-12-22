import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CommunityPage() {
  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />
      
      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4 text-center">
          <span className="text-(--color-roti) font-bold uppercase tracking-wider mb-4 block">Private Space</span>
          <h1 className="text-5xl font-bold text-(--color-primary) mb-8 font-heading">Community Forum</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            We are building a dedicated sanctuary for you to connect, share, and grow with fellow members.
            The doors to our private community will open soon!
          </p>
          <div className="bg-white p-12 rounded-[30px_0_30px_0] shadow-xl max-w-3xl mx-auto flex flex-col items-center">
             <div className="text-6xl mb-6">💬</div>
             <h3 className="text-2xl font-bold text-(--color-primary) mb-4">What to expect:</h3>
             <ul className="text-left text-gray-600 space-y-3 mb-8">
               <li className="flex gap-3">
                 <span className="text-(--color-roti)">✓</span>
                 Daily encouragement and prayer threads
               </li>
               <li className="flex gap-3">
                 <span className="text-(--color-roti)">✓</span>
                 Safe space to ask questions about faith & yoga
               </li>
               <li className="flex gap-3">
                 <span className="text-(--color-roti)">✓</span>
                 Opportunities to collaborate with other teachers
               </li>
             </ul>
             <button className="btn btn-primary px-8 py-3 opacity-50 cursor-not-allowed">
               Forum Launching Soon
             </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
