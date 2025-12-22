import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@clerk/nextjs/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function TeacherCollectivePage() {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  const benefits = [
    {
      title: 'Community Connection',
      description: 'Connect with a global network of Christian yoga teachers of color.',
      icon: '🤝'
    },
    {
      title: 'Resource Library',
      description: 'Access curated sequences, meditations, and business resources.',
      icon: '📚'
    },
    {
      title: 'Teacher Directory',
      description: 'Get discovered by practitioners looking for Christ-centered yoga.',
      icon: '🔍'
    },
    {
      title: 'Monthly Workshops',
      description: 'Deepen your practice and teaching with expert-led sessions.',
      icon: '✨'
    }
  ];

  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-(--color-primary) pt-[180px] pb-24 text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="block uppercase tracking-[4px] mb-4 text-(--color-roti) font-bold">Flow in Faith</span>
            <h1 className="text-5xl lg:text-8xl mb-8 text-white font-bold leading-tight">Teacher&apos;s Collective</h1>
            <p className="max-w-2xl mx-auto mb-12 text-xl leading-relaxed text-(--color-sidecar) opacity-90">
              A dedicated space for Christian yoga teachers of color to connect, learn, and grow together.
              Grounded, expressive, and assured.
            </p>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="btn btn-primary">
              {isSignedIn ? "Go to Dashboard" : "Join the Collective"}
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="mission-text">
              <h2 className="text-(--color-primary) text-4xl font-bold mb-6">Refined Without Being Rigid</h2>
              <p className="text-xl leading-relaxed text-gray-700">
                Our collective mirrors the essence of faith — grounded, expressive, and assured. 
                We provide a supportive environment where your teaching can flourish, rooted in 
                creating ease for both teacher and student.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[500px] w-full max-w-[500px] rounded-[40px_0_40px_0] overflow-hidden shadow-2xl">
                <Image 
                  src="/assets/images/uploads/26.jpg" 
                  alt="Teacher Collective Community" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-(--color-gallery)">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-(--color-primary) text-4xl font-bold mb-16">Why Join the Collective?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-10 rounded-[20px_0_20px_0] text-center transition-transform hover:-translate-y-2 shadow-sm hover:shadow-md">
                <div className="text-5xl mb-6">{benefit.icon}</div>
                <h3 className="text-(--color-primary) text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-(--color-primary) text-4xl font-bold mb-4">Membership Options</h2>
            <p className="text-xl text-gray-600">Choose the path that best supports your journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-(--color-gallery) p-12 rounded-[30px_0_30px_0] text-center relative flex flex-col items-center">
              <h3 className="text-(--color-primary) text-3xl font-bold mb-4">Monthly Member</h3>
              <div className="text-(--color-primary) text-5xl font-bold my-6">$29<span className="text-2xl font-normal">/mo</span></div>
              <ul className="text-left w-full mb-10 space-y-4">
                <li className="flex gap-3 items-start text-gray-700">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>Full Directory Listing</span>
                </li>
                <li className="flex gap-3 items-start text-gray-700">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>Access to Resource Library</span>
                </li>
                <li className="flex gap-3 items-start text-gray-700">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>Monthly Community Calls</span>
                </li>
                <li className="flex gap-3 items-start text-gray-700">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>Member Discounts</span>
                </li>
              </ul>
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="btn-outline w-full py-4 rounded-[15px_0_15px_0] font-bold text-center border-2 border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white transition-all">
                {isSignedIn ? "Go to Dashboard" : "Start Monthly"}
              </Link>
            </div>
            <div className="bg-(--color-martinique) p-12 rounded-[30px_0_30px_0] text-center relative flex flex-col items-center text-white border-2 border-(--color-roti) scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-(--color-roti) text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider">Best Value</div>
              <h3 className="text-white text-3xl font-bold mb-4">Annual Member</h3>
              <div className="text-white text-5xl font-bold my-6">$290<span className="text-2xl font-normal">/yr</span></div>
              <ul className="text-left w-full mb-10 space-y-4 text-gray-200">
                <li className="flex gap-3 items-start">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>All Monthly Benefits</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>2 Months Free</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>Exclusive Annual Workshop</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>Priority Directory Placement</span>
                </li>
              </ul>
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="btn btn-primary">
                {isSignedIn ? "Go to Dashboard" : "Join Annually"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
