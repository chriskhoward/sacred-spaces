import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilloutForm from '@/components/FilloutForm';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Alignment Form | Join the Collective",
  description: "Begin your journey with the Flow in Faith Teachers Collective. Share your story and find your place in our community.",
};

export default function ApplyPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            {/* Top Image Placeholder */}
            <div className="relative w-full h-64 mb-8 rounded-[30px] overflow-hidden">
              <Image src="/assets/images/alignment_header.jpg" fill className="object-cover" alt="Alignment Form" />
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-(--color-primary) mb-8">
              Alignment Form
            </h1>

            <div className="text-xl text-gray-700 space-y-6 text-left max-w-3xl mx-auto bg-(--color-gallery) p-8 rounded-2xl">
              <p>
                These questions help us understand your story, your season and how the Collective can best support you.
              </p>
              <p className="font-bold text-(--color-roti)">
                There are no right or wrong answers.
              </p>
              <p>
                We are not accessing theology, teaching ability, or productivity.
                <br />
                We are listening for alignment, clarity, and care.
              </p>
              <p className="border-t border-gray-300 pt-4 mt-4 italic text-base">
                You will be directed to purchase your membership option after completing the Alignment Form.
              </p>
            </div>
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
