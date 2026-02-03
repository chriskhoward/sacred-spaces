import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@clerk/nextjs/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBlock from '@/components/Blocks/Hero';
import FAQBlock from '@/components/Blocks/FAQ';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teachers Collective | Flow in Faith",
  description: "A community-centered home for Yoga Teachers of Color who identify as Christian. Find support, professional development, and spiritually grounded connection.",
};

export default async function TeacherCollectivePage() {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  // Benefits data for "As a member..." section with placeholders for images/logos
  const benefits = [
    {
      title: 'TEACHER DIRECTORY PLACEMENT',
      description: 'Visibility through our publicly accessible directory so students, churches, and organizations can find and hire Christ-Centered Yoga Teachers of Color worldwide.',
      // Image placeholer logic can be handled in the component mapping
    },
    {
      title: 'MONTHLY COMMUNITY CHECK-INS',
      description: 'Live virtual gatherings for connection, reflection, networking, and shared growth — facilitated with intention and care.',
    },
    {
      title: 'A COMMUNITY THAT SEES YOU',
      description: 'A private online community space where we connect daily, ask questions, share wins, swap resources, and collaborate — without having to explain or defend our identity.',
    },
    {
      title: 'QUARTERLY MASTERCLASSES',
      description: 'Spiritually aligned and culturally grounded workshops led by experienced teachers and industry leaders on business growth, theology, yoga integration, trauma-informed teaching, and more.',
    }
  ];

  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <HeroBlock
        badge="The Flow in Faith Teachers Collective"
        title="Your path to belonging, visibility, and spiritually grounded growth."
        subtitle="Step into a faith-affirming, culturally grounded community designed to support Christ-Centered Yoga Teachers of Color in growing confidently, connecting deeply, and leading boldly in their calling."
        primaryButtonText="JOIN NOW!"
      />

      {/* Intro Section - What if you could */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-16 text-center leading-tight">
              What if you could….
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-[3rem_0_3rem_0] shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all group border-2 border-transparent hover:border-(--color-sidecar) hover:-translate-y-2">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  Teach from a place of spiritual integrity without over-explaining or shrinking parts of yourself?
                </p>
              </div>

              <div className="bg-white p-10 rounded-[3rem_0_3rem_0] shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all group border-2 border-transparent hover:border-(--color-sidecar) hover:-translate-y-2">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  Be seen, supported, and affirmed inside a community that actually understands your lived experience?
                </p>
              </div>

              <div className="bg-white p-10 rounded-[3rem_0_3rem_0] shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all group border-2 border-transparent hover:border-(--color-sidecar) hover:-translate-y-2">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  Grow professionally through aligned opportunities for visibility, collaboration, and leadership that honor your values?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listen Section */}
      <section className="py-24 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-12 md:p-16 rounded-[4rem_0_4rem_0] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border-l-4 border-(--color-roti)">
              <h2 className="text-3xl lg:text-4xl font-bold text-(--color-primary) mb-10 text-center">
                Listen, I see you…
              </h2>
              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-(--color-roti) mt-3"></div>
                  <p>
                    You&apos;ve been carrying your calling largely on your own. Holding space for students, navigating faith and embodiment, and trying to build something sustainable, often feeling stretched thin as you pour out more than you&apos;re being poured into.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-(--color-roti) mt-3"></div>
                  <p>
                    AND even though you&apos;ve done the trainings, attended the workshops, and connected with people along the way, there&apos;s still a quiet loneliness. Because so few truly understand what it means to be a Christ-Centered Yoga Teacher of Color navigating multiple worlds at once.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-(--color-roti) mt-3"></div>
                  <p>
                    You&apos;re surrounded by good people, but not many who share your lived experience, your faith lens, or the nuances of your work. What you encounter in other spaces often misses the mark, leaving you feeling unseen, unsupported, and still searching for a place where all of you can belong.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - It's Time */}
      <section className="py-24 bg-(--color-primary) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/banner_section_background.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-(--color-primary)/50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm p-12 md:p-16 rounded-[4rem_0_4rem_0] border border-white/10">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-12 leading-tight">
              IT&apos;S TIME TO STOP CARRYING YOUR CALLING IN ISOLATION, TAKE UP SPACE WITHOUT APOLOGY, AND STEP INTO COMMUNITY, CONFIDENCE, AND BELONGING.
            </h2>
            <Link
              href={isSignedIn ? "/dashboard" : "/apply"}
              className="inline-block px-12 py-6 bg-(--color-roti) text-white rounded-full font-bold text-xl hover:bg-white hover:text-(--color-primary) transition-all shadow-2xl hover:scale-105 transform"
            >
              YES!! IT&apos;S TIME! I&apos;M READY TO BELONG!
            </Link>
          </div>
        </div>
      </section>

      {/* You Don't Have To Section - Updated Layout with Image */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-(--color-primary) mb-16 text-center">
              You don&apos;t have to…
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <div className="relative h-[600px] w-full rounded-[40px_0_40px_0] overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/placeholder_you_dont_have_to.jpg"
                  alt="Supportive Community"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Points Side - Vertical Stack */}
              <div className="flex flex-col gap-8">
                <div className="bg-(--color-gallery) p-8 rounded-[2rem_0_2rem_0] border-2 border-transparent hover:border-(--color-roti) transition-all hover:shadow-xl">
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    Keep navigating this work without support, piecing things together on your own, carrying questions in silence, and wondering if there&apos;s a space where you can truly be held as you grow.
                  </p>
                </div>

                <div className="bg-(--color-gallery) p-8 rounded-[2rem_0_2rem_0] border-2 border-transparent hover:border-(--color-roti) transition-all hover:shadow-xl">
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    Silence parts of yourself to belong, editing your language, your theology, or your cultural expression just to feel accepted in yoga spaces or faith spaces.
                  </p>
                </div>

                <div className="bg-(--color-gallery) p-8 rounded-[2rem_0_2rem_0] border-2 border-transparent hover:border-(--color-roti) transition-all hover:shadow-xl">
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    Stay hidden or minimize your gifts to fit in, because your voice, leadership, and presence deserve to be seen and valued in spaces aligned with your calling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Ready to Step In */}
      <section className="py-24 bg-(--color-primary) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/banner_section_background.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-(--color-primary)/50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm p-12 rounded-[3rem_0_3rem_0] border border-white/10">
            <p className="text-2xl text-white/95 mb-10 font-medium">Your calling deserves to be held, affirmed, and supported in community.</p>
            <Link
              href={isSignedIn ? "/dashboard" : "/apply"}
              className="inline-block px-12 py-6 bg-(--color-roti) text-white rounded-full font-bold text-xl hover:bg-white hover:text-(--color-primary) transition-all shadow-2xl hover:scale-105 transform"
            >
              YES, I&apos;M READY TO STEP INTO THE COLLECTIVE! ENROLL ME NOW!
            </Link>
          </div>
        </div>
      </section>

      {/* Introducing Section */}
      <section className="py-24 bg-gradient-to-b from-white to-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="bg-white p-12 md:p-16 rounded-[4rem_0_4rem_0] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border-2 border-(--color-sidecar)">
              <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-6">
                INTRODUCING…
              </h2>
              <h3 className="text-2xl lg:text-4xl font-bold text-(--color-primary) mb-6">
                THE FLOW IN FAITH TEACHERS COLLECTIVE
              </h3>
              <div className="w-32 h-1 bg-(--color-roti) mx-auto mb-8"></div>
              <p className="text-2xl text-(--color-roti) font-semibold">
                Where calling meets community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Benefits Section - Updated with Logo and Images */}
      <section className="py-24 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Logo Placeholder */}
            <div className="flex justify-center mb-8">
              <Image src="/assets/images/tc_logo.png" alt="Teachers Collective Logo" width={200} height={200} />
            </div>

            <h3 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-6 text-center">
              As a member of Flow in Faith Teachers Collective
            </h3>
            <p className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">
              you&apos;ll automatically receive access to:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-[2rem_0_2rem_0] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:border-(--color-sidecar) hover:-translate-y-1">
                  {/* Benefit Header Image */}
                  <div className="aspect-square w-full relative overflow-hidden bg-(--color-gallery)">
                    <Image 
                      src={`/assets/images/benefit_header_${index + 1}.png`} 
                      fill 
                      className="object-contain transition-transform duration-500 group-hover:scale-105" 
                      alt={benefit.title} 
                    />
                  </div>

                  <div className="p-8">
                    <h4 className="text-xl font-bold text-(--color-primary) mb-3 leading-tight">{benefit.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Opportunities */}
            <div className="bg-gradient-to-br from-(--color-primary)/20 to-white p-12 md:p-16 rounded-[4rem_0_4rem_0] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border-2 border-(--color-roti)/20 mb-12">
              <h4 className="text-3xl lg:text-4xl font-bold text-(--color-primary) mb-12 text-center">
                PLUS THESE PREMIUM OPPORTUNITIES:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/80 p-8 rounded-[2rem_0_2rem_0] shadow-lg backdrop-blur-sm">
                  <h5 className="text-xl font-bold text-(--color-primary) mb-3">PROMOTION OF YOUR OFFERINGS</h5>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Your classes, workshops, retreats, or courses shared through Flow in Faith social channels and newsletters — expanding your reach.
                  </p>
                </div>
                <div className="bg-white/80 p-8 rounded-[2rem_0_2rem_0] shadow-lg backdrop-blur-sm">
                  <h5 className="text-xl font-bold text-(--color-primary) mb-3">PAID TEACHING OPPORTUNITIES</h5>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Opportunities to teach Christ-Centered yoga classes or workshops inside the Flow in Faith Sanctuary Membership — increasing both income and visibility.
                  </p>
                </div>
                <div className="bg-white/80 p-8 rounded-[2rem_0_2rem_0] shadow-lg backdrop-blur-sm">
                  <h5 className="text-xl font-bold text-(--color-primary) mb-3">CONTRIBUTION TO THE ON-DEMAND LIBRARY</h5>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Share your Christ-Centered recorded classes, meditations, or resources to reach students globally while building long-term impact.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href={isSignedIn ? "/dashboard" : "/apply"}
                className="inline-block px-12 py-6 bg-(--color-primary) text-white rounded-full font-bold text-xl hover:bg-(--color-roti) transition-all shadow-2xl hover:scale-105 transform"
              >
                WOW! THIS IS EXACTLY WHAT I NEED! I&apos;M READY TO CONNECT!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers / Comparison Chart Placeholder */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-(--color-primary) text-4xl font-bold mb-4">Membership Options</h2>
            <p className="text-xl text-gray-600">Choose the path that best supports your journey.</p>
          </div>

          {/* Membership Comparison Chart Placeholder */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative w-full h-[600px] rounded-[30px] overflow-hidden shadow-xl">
              <Image src="/assets/images/membership_chart.png" fill className="object-contain" alt="Membership Comparison" />
            </div>
          </div>

          {/* Existing Coded Membership Cards - Keeping as fallback/interactive elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* EPM LITE */}
            <div className="bg-(--color-gallery) p-12 rounded-[30px_0_30px_0] text-center relative flex flex-col items-center">
              <h3 className="text-(--color-primary) text-3xl font-bold mb-4">EPM LITE</h3>
              <div className="text-(--color-primary) text-2xl font-bold my-2">$35 / MONTH</div>
              <div className="text-(--color-primary) text-2xl font-bold mb-6">$350 / YEAR</div>
              <ul className="text-left w-full mb-10 space-y-4">
                <li className="flex gap-3 items-start text-gray-700">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>Step-by-Step Guides</span>
                </li>
                {/* Abbreviated list for code brevity, keeping existing structure */}
                <li className="flex gap-3 items-start text-gray-700">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>Membership Resources & Quarterly Challenges</span>
                </li>
              </ul>
              <Link href={isSignedIn ? "/dashboard" : "/apply"} className="btn-outline w-full py-4 rounded-[15px_0_15px_0] font-bold text-center border-2 border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white transition-all mt-auto">
                {isSignedIn ? "Go to Dashboard" : "Join EPM Lite"}
              </Link>
            </div>

            {/* EPM PLUS */}
            <div className="bg-(--color-martinique) p-12 rounded-[30px_0_30px_0] text-center relative flex flex-col items-center text-white border-2 border-(--color-roti) scale-105 shadow-xl">
              <h3 className="text-white text-3xl font-bold mb-4">EPM PLUS</h3>
              <div className="text-white text-2xl font-bold my-2">$80 / MONTH</div>
              <div className="text-white text-2xl font-bold mb-6">$800 / YEAR</div>
              <ul className="text-left w-full mb-10 space-y-4 text-gray-200">
                <li className="flex gap-3 items-start">
                  <span className="text-(--color-roti) font-bold">✓</span>
                  <span>Everything in Lite + PACE Sessions</span>
                </li>
                <li className="flex gap-3 items-start font-bold text-yellow-400">
                  <span className="text-(--color-roti)">✓</span>
                  <span>Purchase the Annual Plan and score access to this exclusive BONUS!</span>
                </li>
              </ul>
              <Link href={isSignedIn ? "/dashboard" : "/apply"} className="btn btn-primary mt-auto">
                {isSignedIn ? "Go to Dashboard" : "Join EPM Plus"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Imagine Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-(--color-primary) mb-16 text-center">
              Imagine what it would feel like to…
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { text: "Teach with confidence, knowing your faith and practice are not in conflict.", image: "/assets/images/pexels-shkrabaanthony-5890690.jpg" },
                { text: "Be surrounded by teachers who understand the nuance of your journey.", image: "/assets/images/pexels-shkrabaanthony-5890703.jpg" },
                { text: "Have access to opportunities that support both your spiritual and professional growth.", image: "/assets/images/pexels-tima-miroshnichenko-6860493.jpg" },
                { text: "Stop doing this work alone — and feel held by community.", image: "/assets/images/pexels-shkrabaanthony-5890690.jpg" }
              ].map((item, i) => (
                <div key={i} className="bg-(--color-gallery) rounded-[2rem_0_2rem_0] text-center hover:bg-(--color-sidecar) transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden h-full flex flex-col group">
                  <div className="aspect-[4/3] w-full relative overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt="" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-6 flex-grow flex items-center justify-center">
                    <p className="text-gray-700 leading-relaxed font-medium text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-3xl font-bold text-(--color-primary) mb-10 text-center">
              How does that sound?
            </p>
            <div className="text-center">
              <Link
                href={isSignedIn ? "/dashboard" : "/apply"}
                className="inline-block px-12 py-6 bg-(--color-roti) text-white rounded-full font-bold text-xl hover:bg-white hover:text-(--color-primary) hover:border-2 hover:border-(--color-primary) transition-all shadow-2xl hover:scale-105 transform"
              >
                IT SOUNDS AMAZING!! SIGN ME UP!!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Visionaries Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8 text-center">
              MEET THE VISIONARIES
            </h2>
            <p className="text-xl text-gray-700 mb-16 text-center max-w-3xl mx-auto leading-relaxed">
              Led by Queen and De, the Flow in Faith Teachers Collective was created from lived experience, prayerful discernment, and a deep belief that Christ-Centered Yoga Teachers of Color were never meant to walk this calling alone.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Queen */}
              <div className="bg-white p-10 rounded-[3rem_0_3rem_0] shadow-[0_15px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.15)] transition-all border-2 border-transparent hover:border-(--color-sidecar) hover:-translate-y-2 flex flex-col">
                <div className="relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden border-4 border-(--color-roti) shadow-xl">
                  <Image
                    src="/assets/images/team/queen_robertson.png"
                    alt="Queen Robertson"
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-3xl font-bold text-(--color-primary) mb-2">Queen Robertson</h4>
                  <p className="text-(--color-roti) font-semibold text-lg uppercase tracking-wide">Founder/Visionary</p>
                  <div className="w-16 h-1 bg-(--color-roti) mx-auto mt-4"></div>
                </div>
                <div className="text-left space-y-4 flex-grow">
                  <p className="text-gray-700 leading-relaxed">
                    Queen is a yoga teacher and space holder who invites presence, reflection, and embodiment through intentional movement and breath.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    With 200-hour yoga training and a practice rooted in mindfulness, rest, and nervous system care, she creates grounding spaces where students can slow down, reconnect, and move without urgency. Her teaching emphasizes balance, compassion, and honoring the body&apos;s wisdom.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you&apos;re arriving for the first time or returning to yourself, Queen offers a practice that is steady, affirming, and deeply human.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-(--color-gallery)">
                  <Link
                    href="/queen-robertson"
                    className="block w-full text-center px-8 py-4 bg-(--color-primary) text-white rounded-full font-bold hover:bg-(--color-roti) transition-all shadow-lg hover:scale-105 transform"
                  >
                    Learn More About Queen →
                  </Link>
                </div>
              </div>

              {/* De */}
              <div className="bg-white p-10 rounded-[3rem_0_3rem_0] shadow-[0_15px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.15)] transition-all border-2 border-transparent hover:border-(--color-sidecar) hover:-translate-y-2 flex flex-col">
                <div className="relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden border-4 border-(--color-roti) shadow-xl">
                  <Image
                    src="/assets/images/team/de_bolton.png"
                    alt="De Bolton"
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="object-cover"
                  />
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-3xl font-bold text-(--color-primary) mb-2">De Bolton</h4>
                  <p className="text-(--color-roti) font-semibold text-lg uppercase tracking-wide">Founder/Visionary</p>
                  <div className="w-16 h-1 bg-(--color-roti) mx-auto mt-4"></div>
                </div>
                <div className="text-left space-y-4 flex-grow">
                  <p className="text-gray-700 leading-relaxed">
                    De is a movement leader who makes every minute on the mat matter.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    A dedicated yoga and Pilates instructor, she blends breath, strength, grace, and embodied presence to help move what&apos;s unseen and unheard in the body.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    With 200-hour yoga training, 500-hour Ashtanga, and 100-hour trauma-informed certification, plus Mat Pilates, De creates safe, empowering spaces for all levels. Her teaching is rooted in mindfulness, compassion, and transformation, inviting you to build resilience, self-awareness, and inner peace.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you&apos;re beginning or deepening your practice, De will challenge you, support you, and inspire you to rise.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-(--color-gallery)">
                  <Link
                    href="/de-bolton"
                    className="block w-full text-center px-8 py-4 bg-(--color-primary) text-white rounded-full font-bold hover:bg-(--color-roti) transition-all shadow-lg hover:scale-105 transform"
                  >
                    Learn More About De →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* So What Do You Say Section */}
      <section className="py-24 bg-(--color-primary) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/banner_section_background.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-(--color-primary)/50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm p-12 md:p-16 rounded-[4rem_0_4rem_0] border border-white/10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 leading-tight">
              So, what do you say?
            </h2>
            <p className="text-2xl text-white/95 mb-12 leading-relaxed">
              Are you ready to grow in a space where your faith, culture, and practice are fully welcome?
            </p>
            <div className="text-center">
              <Link
                href={isSignedIn ? "/dashboard" : "/apply"}
                className="inline-block px-12 py-6 bg-(--color-roti) text-white rounded-full font-bold text-xl hover:bg-white hover:text-(--color-primary) transition-all shadow-2xl hover:scale-105 transform"
              >
                APPLY NOW!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQBlock
        heading="Still have questions? I understand. Let&apos;s chat!"
        items={[
          {
            question: "Who is the Flow in Faith Teachers Collective for?",
            answer: "The Flow in Faith Teachers Collective is for Christ-Centered Yoga Teachers of Color who are seeking a culturally aware, faith-affirming community where they can grow, teach, and be poured into as whole people. It's especially supportive for those navigating the tension between the yoga world, the church world, and their own desire to teach authentically without overextending, overexplaining, or shrinking."
          },
          {
            question: "Do I have to be a Christian to join?",
            answer: "No, you do not have to identify as Christian to join the Collective. However, our conversations, offerings, and gatherings are rooted in Christ-centered principles, language and practice. Participation in this space requires respect for that foundation and the faith-centered nature of the community."
          },
          {
            question: "Who is this membership NOT for?",
            answer: "The Flow in Faith Teachers Collective may not be aligned if you are not interested in community, collaboration, or engaging faith and yoga together with intention. It may also not be the right fit if you are looking for a purely secular yoga business group or a space that centers dominant cultural perspectives rather than lived experience."
          },
          {
            question: "How can I support if I am not a Person of Color?",
            answer: "We deeply appreciate your desire to support this work. You can support by amplifying Flow in Faith, sharing our offerings, attending public events, hiring teachers from our directory, and honoring the importance of culturally specific spaces created for and led by teachers of color. You can also sponsor a membership for a teacher by emailing collective@flowinfaith.com"
          },
          {
            question: "What does the Flow in Faith Teachers Collective program offer?",
            answer: "The Flow in Faith Teachers Collective offers a private community space, monthly community check-ins, teacher directory placement, and quarterly masterclasses focused on spiritually aligned and culturally grounded growth. Premium members also receive opportunities for visibility, promotion, paid teaching, and contribution to the on-demand library."
          },
          {
            question: "What kind of support can I expect as a member?",
            answer: "As a member, you can expect relational, spiritual, and professional support rooted in community rather than hierarchy. Support shows up through shared dialogue, facilitated gatherings, collaborative opportunities, and access to aligned resources and leadership."
          },
          {
            question: "Are the LIVE Q&A Sessions Recorded?",
            answer: "Yes, live gatherings such as community check-ins and masterclasses are recorded whenever possible and made available inside the membership space. This allows you to revisit conversations or catch up if you're unable to attend live."
          },
          {
            question: "Is there a commitment period for the membership?",
            answer: "There is no long-term contract or required commitment period. You are free to cancel your membership at any time, and we trust you to stay as long as the Collective serves you well."
          },
          {
            question: "What sets your membership program apart from others?",
            answer: "Flow in Faith Teachers Collective is the only space intentionally created for Christ-Centered Yoga Teachers of Color where faith, culture, and calling are honored together without compromise. Our difference lies in culturally grounded community, spiritually aligned growth, and leadership rooted in lived experience."
          },
          {
            question: "How do I access the resources and materials included in the membership?",
            answer: "Once you join, you'll receive access to our private online platform where all community spaces, resources, recordings, and announcements live. Everything is designed to be easy to access from any device, so you can engage in a way that fits your life."
          }
        ]}
      />

      {/* Bottom Line CTA */}
      <section className="py-24 bg-gradient-to-b from-white to-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-12 md:p-16 rounded-[4rem_0_4rem_0] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border-2 border-(--color-sidecar) text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-(--color-primary) mb-12">
                Bottom line… There is space for you here!!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-(--color-gallery) p-6 rounded-[2rem_0_2rem_0]">
                  <p className="text-lg font-semibold text-gray-700">Stop navigating your calling alone.</p>
                </div>
                <div className="bg-(--color-gallery) p-6 rounded-[2rem_0_2rem_0]">
                  <p className="text-lg font-semibold text-gray-700">Stop shrinking yourself to fit in.</p>
                </div>
                <div className="bg-(--color-gallery) p-6 rounded-[2rem_0_2rem_0]">
                  <p className="text-lg font-semibold text-gray-700">Stop questioning whether there&apos;s space for all of who you are.</p>
                </div>
              </div>
              <div className="bg-(--color-sidecar) p-8 rounded-[2rem_0_2rem_0] mb-12">
                <p className="text-2xl font-bold text-(--color-primary)">Let&apos;s walk this path together.</p>
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-(--color-primary) mb-12">
                Are you ready?
              </p>
              <Link
                href={isSignedIn ? "/dashboard" : "/apply"}
                className="inline-block px-12 py-6 bg-(--color-roti) text-white rounded-full font-bold text-xl hover:bg-white hover:text-(--color-primary) hover:border-2 hover:border-(--color-primary) transition-all shadow-2xl hover:scale-105 transform mb-12"
              >
                OH YEAH! I&apos;M IN!
              </Link>
              <div className="pt-8 border-t-2 border-(--color-gallery)">
                <p className="text-2xl font-bold text-(--color-primary) mb-4">
                  Perfect! I&apos;ll see you soon!
                </p>
                <p className="text-xl text-gray-700">
                  Queen & De
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main >
  );
}
