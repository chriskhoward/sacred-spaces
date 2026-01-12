import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThrivecartEmbed from '@/components/ThrivecartEmbed';

export default function JoinPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-(--color-primary) mb-4">Join the Collective</h1>
            <p className="text-xl text-gray-600">Complete your registration below to get started.</p>
          </div>
          
          <div className="bg-white rounded-[20px] shadow-xl p-8 border border-gray-100">
            <ThrivecartEmbed />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
