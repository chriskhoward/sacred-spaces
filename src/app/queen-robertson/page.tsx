import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilloutSliderButton from '@/components/FilloutSliderButton';

export default function QueenRobertsonPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-[180px] pb-24 bg-gradient-to-b from-(--color-primary) to-(--color-primary)/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/banner_section_background.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/3 flex justify-center">
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-6 border-(--color-roti) shadow-2xl">
                  <Image 
                    src="/assets/images/team/queen_robertson.png" 
                    alt="Queen Robertson" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="lg:w-2/3 text-white">
                <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] uppercase text-sm mb-6 border border-white/20">
                  Founder/Visionary
                </span>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-(--color-gallery)">
                  Queen Robertson
                </h1>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Flow in Faith Teachers Collective
                </p>
                <div className="w-24 h-1 bg-(--color-roti) mb-8"></div>
                <p className="text-lg text-white/80 leading-relaxed">
                  A yoga teacher, facilitator, and community builder who creates spaces where people can slow down, take up space, and return to themselves with honesty and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-12 md:p-16 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border-2 border-(--color-sidecar)">
              <h2 className="text-4xl font-bold text-(--color-primary) mb-8">About Queen</h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Queen is a yoga teacher, facilitator, and community builder who creates spaces where people can slow down, take up space, and return to themselves with honesty and care. Her work centers embodiment as a spiritual practice—inviting presence, reflection, and wholeness both on and off the mat.
                </p>
                
                <p>
                  Queen completed her 200-hour yoga teacher training and has continued her study through meditation, breathwork, and somatic practices that support nervous system regulation, rest, and self-awareness. Her teaching is shaped by lived experience, deep listening, and a commitment to holding space that is grounded, affirming, and accessible.
                </p>
                
                <p>
                  Rooted in mindfulness, compassion, and liberation, Queen&apos;s classes are less about pushing and more about arriving—cultivating balance, resilience, and trust in the body&apos;s wisdom. She integrates intentional movement, breath-led pacing, and moments of pause to support students in reconnecting with themselves without pressure or performance.
                </p>
                
                <p>
                  Through her teaching, retreats, and community offerings, Queen encourages others to move with intention, honor their capacity, and practice from a place of wholeness. Whether you are new to yoga or deepening your practice, Queen invites you into a practice that feels spacious, supportive, and true.
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-12 pt-12 border-t-2 border-(--color-gallery)">
                <h3 className="text-2xl font-bold text-(--color-primary) mb-6">Credentials & Training</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-(--color-gallery) p-6 rounded-3xl">
                    <div className="text-3xl mb-3">🧘</div>
                    <h4 className="font-bold text-(--color-primary) mb-2">200-Hour Yoga Teacher Training</h4>
                    <p className="text-gray-600 text-sm">Comprehensive foundational training</p>
                  </div>
                  <div className="bg-(--color-gallery) p-6 rounded-3xl">
                    <div className="text-3xl mb-3">🫁</div>
                    <h4 className="font-bold text-(--color-primary) mb-2">Meditation & Breathwork</h4>
                    <p className="text-gray-600 text-sm">Ongoing study and practice</p>
                  </div>
                  <div className="bg-(--color-gallery) p-6 rounded-3xl">
                    <div className="text-3xl mb-3">🌿</div>
                    <h4 className="font-bold text-(--color-primary) mb-2">Somatic Practices</h4>
                    <p className="text-gray-600 text-sm">Nervous system regulation & rest</p>
                  </div>
                  <div className="bg-(--color-gallery) p-6 rounded-3xl">
                    <div className="text-3xl mb-3">💫</div>
                    <h4 className="font-bold text-(--color-primary) mb-2">Self-Awareness & Embodiment</h4>
                    <p className="text-gray-600 text-sm">Continuous learning and growth</p>
                  </div>
                </div>
              </div>

              {/* Teaching Philosophy */}
              <div className="mt-12 pt-12 border-t-2 border-(--color-gallery)">
                <h3 className="text-2xl font-bold text-(--color-primary) mb-6">Teaching Philosophy</h3>
                <div className="bg-(--color-sidecar) p-8 rounded-3xl">
                  <p className="text-lg text-(--color-bronzetone) leading-relaxed italic">
                    &ldquo;Her teaching is less about pushing and more about arriving—cultivating balance, resilience, and trust in the body&apos;s wisdom. She integrates intentional movement, breath-led pacing, and moments of pause to support students in reconnecting with themselves without pressure or performance.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-(--color-primary) mb-6">
              Ready to practice with Queen?
            </h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Join the Flow in Faith Teachers Collective and connect with Queen and the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <FilloutSliderButton
                buttonText="Join the Collective"
                variant="cta"
                className="inline-flex"
              />
              <Link 
                href="/"
                className="inline-block px-6 py-3 border-2 border-(--color-primary) text-(--color-primary) rounded-full font-bold text-sm hover:bg-(--color-primary) hover:text-white transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
