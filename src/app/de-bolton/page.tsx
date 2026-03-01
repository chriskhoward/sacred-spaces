import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, HeartPulse, Dumbbell } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FilloutSliderButton from '@/components/FilloutSliderButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'De Bolton | Flow in Faith',
  description: 'Meet De Bolton, Founder and Visionary of Flow in Faith. Christ-centered yoga and wellness for Teachers of Color.',
};

export default function DeBoltonPage() {
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
                    src="/assets/images/team/de_bolton.png" 
                    alt="De Bolton" 
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
                  De Bolton
                </h1>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Flow in Faith Teachers Collective
                </p>
                <div className="w-24 h-1 bg-(--color-roti) mb-8"></div>
                <p className="text-lg text-white/80 leading-relaxed">
                  A movement leader who makes every minute on the mat matter. A dedicated yoga and Pilates instructor who blends breath, strength, grace, and embodied presence.
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
              <h2 className="text-4xl font-bold text-(--color-primary) mb-8">About De</h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  De is all about making movement matter, setting you up for success and challenging you to do more than you did before. De is a dedicated yoga instructor with a passion for helping move the unseen and unheard through breath, strength, grace & movement.
                </p>
                
                <p>
                  De holds a 200-hour yoga certification, completing an intensive training program that has equipped her with the knowledge and skills to guide students of all levels on their yoga journey.
                </p>
                
                <p>
                  De continued her study through a 100-hour trauma-informed yoga instructor certification, allowing De to create a safe and supportive space for individuals who have experienced trauma to heal and reconnect with their bodies.
                </p>
                
                <p>
                  De is committed to continuous learning and growth, she strives to integrate the principles of mindfulness, compassion, and empowerment into her classes.
                </p>
                
                <p>
                  Her goal is to inspire others to cultivate self-awareness, resilience, and inner peace through the transformative practice of yoga. Whether you are a beginner or an experienced practitioner, De looks forward to guiding you on your path to holistic well-being and self-discovery. Be inspired and motivated to challenge yourself with De.
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-12 pt-12 border-t-2 border-(--color-gallery)">
                <h3 className="text-2xl font-bold text-(--color-primary) mb-6">Credentials & Training</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-(--color-gallery) p-6 rounded-3xl">
                    <Heart className="w-8 h-8 text-(--color-roti) mb-3" />
                    <h4 className="font-bold text-(--color-primary) mb-2">200-Hour Yoga Certification</h4>
                    <p className="text-gray-600 text-sm">Intensive foundational training</p>
                  </div>
                  <div className="bg-(--color-gallery) p-6 rounded-3xl">
                    <Star className="w-8 h-8 text-(--color-roti) mb-3" />
                    <h4 className="font-bold text-(--color-primary) mb-2">500-Hour Ashtanga Training</h4>
                    <p className="text-gray-600 text-sm">Advanced practice and teaching</p>
                  </div>
                  <div className="bg-(--color-gallery) p-6 rounded-3xl">
                    <HeartPulse className="w-8 h-8 text-(--color-roti) mb-3" />
                    <h4 className="font-bold text-(--color-primary) mb-2">100-Hour Trauma-Informed Certification</h4>
                    <p className="text-gray-600 text-sm">Safe, supportive healing spaces</p>
                  </div>
                  <div className="bg-(--color-gallery) p-6 rounded-3xl">
                    <Dumbbell className="w-8 h-8 text-(--color-roti) mb-3" />
                    <h4 className="font-bold text-(--color-primary) mb-2">Mat Pilates Certification</h4>
                    <p className="text-gray-600 text-sm">Strength and alignment training</p>
                  </div>
                </div>
              </div>

              {/* Teaching Philosophy */}
              <div className="mt-12 pt-12 border-t-2 border-(--color-gallery)">
                <h3 className="text-2xl font-bold text-(--color-primary) mb-6">Teaching Approach</h3>
                <div className="bg-(--color-sidecar) p-8 rounded-3xl">
                  <p className="text-lg text-(--color-bronzetone) leading-relaxed italic">
                    &ldquo;De creates safe, empowering spaces for all levels. Her teaching is rooted in mindfulness, compassion, and transformation, inviting you to build resilience, self-awareness, and inner peace. Whether you&apos;re beginning or deepening your practice, De will challenge you, support you, and inspire you to rise.&rdquo;
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
              Ready to practice with De?
            </h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Join the Flow in Faith Teachers Collective and connect with De and the community.
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
    </main>
  );
}
