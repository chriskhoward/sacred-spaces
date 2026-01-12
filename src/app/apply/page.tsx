import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilloutForm from '@/components/FilloutForm';

export default function ApplyPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      
      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-(--color-primary) mb-6">
              Application
            </h1>
            <p className="text-xl text-gray-700">
              Please fill out the alignment form below to get started.
            </p>
          </div>
          
          <div className="w-full">
            <FilloutForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
