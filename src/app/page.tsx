'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  const { isSignedIn } = useUser();

  const pillars = [
    { 
      title: 'Belonging', 
      desc: 'Feel seen, supported, and connected inside a community that understands your faith, culture, and calling.',
      icon: '🤝'
    },
    { 
      title: 'Visibility', 
      desc: 'Access opportunities that highlight your gifts and amplify your voice in meaningful and aligned spaces.',
      icon: '✨'
    },
    { 
      title: 'Connection', 
      desc: 'Build relationships that spark creativity, deepen your teaching, and reaffirm you don’t have to grow alone.',
      icon: '🔗'
    },
    { 
      title: 'Lead Boldly', 
      desc: 'Move with confidence into the spaces God is guiding you—held by a community that affirms your presence and purpose.',
      icon: '🛡️'
    },
  ];

  const benefits = [
    { title: 'Daily Community Space', desc: 'A private online space to connect, ask questions, share wins, and collaborate.' },
    { title: 'Monthly Check-ins', desc: 'Virtual gatherings for networking and sharing challenges/opportunities.' },
    { title: 'Directory Placement', desc: 'Public listing so practitioners can find and hire you worldwide.' },
    { title: 'Masterclasses', desc: 'Quarterly workshops on business, theology, and trauma-informed practice.' },
    { title: 'Promotion', desc: 'Highlighting your offerings on our social channels and newsletter.' },
    { title: 'Teaching Roles', desc: 'Paid opportunities to host classes for our practitioner membership.' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-[150px] pb-[75px] bg-(--color-primary) overflow-hidden">
        {/* ... */}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:flex-1 text-center lg:text-left">
              <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] uppercase text-sm mb-6 border border-white/20">
                Teacher&apos;s Collective
              </span>
              <h1 className="text-white text-5xl lg:text-8xl font-bold mb-8 leading-tight">
                Where Your Calling <br /> 
                <span className="text-(--color-roti)">Meets Community</span>
              </h1>
              <p className="text-white/80 text-xl mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A community-powered home created exclusively for Christian Yoga Teachers of Color—a space where your faith, culture, and calling are honored without compromise.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="btn btn-primary px-10 py-5 text-lg shadow-xl hover:shadow-(--color-roti)/30 transition-all">
                  {isSignedIn ? "Go to Dashboard" : "Join the Collective"}
                </Link>
                <Link href="/about" className="px-10 py-5 border-2 border-white/30 text-white rounded-[2rem_0_2rem_0] font-bold hover:bg-white hover:text-(--color-primary) transition-all text-center text-lg">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:flex-1 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[600px] aspect-square">
                <div className="absolute inset-0 bg-linear-to-br from-(--color-roti) to-transparent opacity-20 rounded-full blur-2xl animate-pulse"></div>
                <Image 
                  src="/assets/images/uploads/11.jpg" 
                  alt="Christian Yoga Practice" 
                  fill
                  className="object-cover rounded-[50px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Message Section */}
      <section className="py-24 lg:py-32 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl text-(--color-bronzetone) font-bold mb-10 leading-relaxed italic">
              &quot;Christian Meta Teachers of Color have carried their callings in silos for far too long. We’re here to change that.&quot;
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              We created the Flow in Faith Teachers Collective so teachers could have a place to grow, collaborate, and be affirmed in the fullness of their identity, their faith, and their culture—without shrinking or separating pieces of themselves to belong.
            </p>
            <div className="w-20 h-1 bg-(--color-roti) mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 lg:mb-24">
            <h5 className="text-(--color-roti) uppercase tracking-[4px] font-bold mb-4">How You Evolve</h5>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-(--color-primary)">Pillars of Transformation</h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
              We provide a culturally-grounded home where your faith and practice can flourish together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            {pillars.map((pillar, index) => (
              <div key={index} className="bg-white p-10 rounded-[3rem_0_3rem_0] shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all group border border-gray-100 hover:-translate-y-2">
                <div className="w-16 h-16 bg-(--color-sidecar) text-3xl flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform mx-auto sm:mx-0">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-(--color-primary)">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h5 className="text-(--color-roti) font-bold uppercase tracking-[4px] mb-6">Core Benefits</h5>
              <h2 className="text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">What You Receive Inside the Collective</h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Beyond community, we provide the tools and opportunities you need to expand your reach and deepen your impact.
              </p>
              <Link href="/sign-up" className="btn btn-primary px-10 py-5">See All Member Perks</Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-(--color-primary) text-lg mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-(--color-primary) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/banner_section_background.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl lg:text-6xl text-white font-bold mb-8">Ready to Take Your Place?</h2>
            <p className="text-(--color-sidecar) text-xl max-w-2xl mx-auto mb-12">
              Join a collective that sees you fully, supports you deeply, and empowers you to grow confidently.
            </p>
            <Link href="/sign-up" className="btn btn-primary px-12 py-6 text-xl">
              Get Started Today
            </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
