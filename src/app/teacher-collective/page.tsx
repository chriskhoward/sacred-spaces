import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { Dancing_Script } from 'next/font/google';
import { client } from '@/sanity/lib/client';

const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-script', display: 'swap' });

const TC_FAQS_QUERY = `coalesce(
  *[_type == "teacherCollectiveFaqs" && _id == "teacherCollectiveFaqs"][0],
  *[_type == "teacherCollectiveFaqs"][0]
){
  intro,
  heading,
  items[] { question, answer }
}`;

const DEFAULT_FAQS = {
  intro: "Still have questions? I understand. Let's chat!",
  heading: 'FAQs',
  items: [
    { question: 'Who is the Flow in Faith Teachers Collective for?', answer: "The Flow in Faith Teachers Collective is for yoga teachers of color who identify as Christian and are seeking a culturally aware, faith-affirming community where they can grow, teach, and be poured into as whole people. It's especially supportive for those navigating the tension between the yoga world, the church world, and their own desire to teach authentically without overextending, overexplaining, or shrinking." },
    { question: 'Do I have to be a Christian to join?', answer: 'No, you do not have to identify as Christian to join the Collective. However, our conversations, offerings, and gatherings are rooted in Christ-centered principles, language and practice. Participation in this space requires respect for that foundation and the faith-centered nature of the community.' },
    { question: 'Who is this membership NOT for?', answer: 'The Flow in Faith Teachers Collective may not be aligned if you are not interested in community, collaboration, or engaging faith and yoga together with intention. It may also not be the right fit if you are looking for a purely secular yoga business group or a space that centers dominant cultural perspectives rather than lived experience.' },
    { question: 'How can I support if I am not a Person of Color?', answer: 'We deeply appreciate your desire to support this work. You can support by amplifying Flow in Faith, sharing our offerings, attending public events, hiring teachers from our directory, and honoring the importance of culturally specific spaces created for and led by teachers of color. You can also sponsor a membership for a teacher by emailing collective@flowinfaith.com' },
    { question: 'What does the Flow in Faith Teachers Collective program offer?', answer: 'The Flow in Faith Teachers Collective offers a private community space, monthly community check-ins, teacher directory placement, and quarterly masterclasses focused on spiritually aligned and culturally grounded growth. Premium members also receive opportunities for visibility, promotion, paid teaching, and contribution to the on-demand library.' },
    { question: 'What kind of support can I expect as a member?', answer: 'As a member, you can expect relational, spiritual, and professional support rooted in community rather than hierarchy. Support shows up through shared dialogue, facilitated gatherings, collaborative opportunities, and access to aligned resources and leadership.' },
    { question: 'Are the LIVE Q&A Sessions Recorded?', answer: "Yes, live gatherings such as community check-ins and masterclasses are recorded whenever possible and made available inside the membership space. This allows you to revisit conversations or catch up if you're unable to attend live." },
    { question: 'Is there a commitment period for the membership?', answer: 'There is no long-term contract or required commitment period. You are free to cancel your membership at any time, and we trust you to stay as long as the Collective serves you well.' },
    { question: 'What sets your membership program apart from others?', answer: 'Flow in Faith Teachers Collective is the only space intentionally created for Christian Yoga Teachers of Color where faith, culture, and calling are honored together without compromise. Our difference lies in culturally grounded community, spiritually aligned growth, and leadership rooted in lived experience.' },
    { question: 'How do I access the resources and materials included in the membership?', answer: "Once you join, you'll receive access to our private online platform where all community spaces, resources, recordings, and announcements live. Everything is designed to be easy to access from any device, so you can engage in a way that fits your life." },
  ],
};

export const metadata: Metadata = {
  title: "Teachers Collective | Flow in Faith",
  description: "A community-centered home for Yoga Teachers of Color who identify as Christian. Find support, professional development, and spiritually grounded connection.",
};

export default async function TeacherCollectivePage() {
  let faqs: { intro?: string; heading?: string; items?: { question?: string; answer?: string }[] } = DEFAULT_FAQS;
  try {
    const data = await client.fetch<typeof faqs>(TC_FAQS_QUERY);
    if (data?.items?.length) faqs = data;
  } catch {
    // use DEFAULT_FAQS
  }
  return (
    <main className="bg-white">
      <Navbar />
      <Script src="https://server.fillout.com/embed/v1/" strategy="lazyOnload" />

      {/* Hero Section */}
      <section className="bg-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-(--color-primary) mb-6 leading-[1.25]">
                Your path to belonging, visibility, and spiritually grounded growth.
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Step into a faith-affirming, culturally grounded community designed to support Christ-Centered Yoga Teachers of Color in growing confidently, connecting deeply, and leading boldly in their calling.
              </p>
              <div
                data-fillout-id="e4pZwnuAkYus"
                data-fillout-embed-type="slider"
                data-fillout-button-text="Join the Teachers Collective"
                data-fillout-button-color="#C7A254"
                data-fillout-button-size="large"
                data-fillout-slider-direction="right"
                data-fillout-inherit-parameters=""
                data-fillout-popup-size="medium"
              />
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/homepage/hero-image.jpg"
                  alt="Flow in Faith Community"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Imagine Section */}
      <section className="py-20 bg-(--color-primary)">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
              Imagine what it would feel like to…
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-(--color-roti)">
                <div className="aspect-[4/3] w-full relative">
                  <Image src="/images/homepage/feature-1.png" alt="" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Teach with confidence, knowing your faith and practice are not in conflict.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-(--color-roti)">
                <div className="aspect-[4/3] w-full relative">
                  <Image src="/images/homepage/feature-2.png" alt="" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Be surrounded by teachers who understand the nuance of your journey.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-(--color-roti)">
                <div className="aspect-[4/3] w-full relative">
                  <Image src="/images/homepage/feature-3.png" alt="" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">
                    Have access to opportunities that support both your spiritual and professional growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listen Section */}
      <section className="py-20 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-10 md:p-12 rounded-lg border border-gray-200">
              <h2 className="text-2xl lg:text-3xl font-bold text-(--color-roti) mb-8 text-center">
                Listen, I see you…
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  You&apos;ve been carrying your calling largely on your own. Holding space for students, navigating faith and embodiment. Often, feeling stretched thin as you pour out more than you&apos;re being poured into.
                </p>
                <p>
                  AND even though you&apos;ve done the trainings, attended the workshops, and connected with people along the way, there&apos;s still a quiet loneliness. Few understand the reality of being a Christ-centered Yoga Teacher of Color navigating multiple worlds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - It's Time */}
      <section className="py-16 bg-(--color-primary)">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl italic text-white mb-8 leading-relaxed max-w-2xl mx-auto">
            It&apos;s time to take up space without apology, and step into community.
          </h2>
          <div
            data-fillout-id="e4pZwnuAkYus"
            data-fillout-embed-type="slider"
            data-fillout-button-text="Join the Teachers Collective"
            data-fillout-button-color="#C7A254"
            data-fillout-button-size="large"
            data-fillout-slider-direction="right"
            data-fillout-inherit-parameters=""
            data-fillout-popup-size="medium"
          />
        </div>
      </section>

      {/* You Don't Have To Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
                <Image
                  src="/images/homepage/community-image.jpg"
                  alt="Yoga teacher with laptop"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-(--color-primary) mb-8">
                  You don&apos;t have to…
                </h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-(--color-roti) pl-6 py-4 bg-white rounded-r-lg shadow-sm">
                    <p className="text-gray-700 leading-relaxed">
                      Keep navigating this work without support, piecing things together on your own, and carrying questions in silence.
                    </p>
                  </div>
                  <div className="border-l-4 border-(--color-roti) pl-6 py-4 bg-white rounded-r-lg shadow-sm">
                    <p className="text-gray-700 leading-relaxed">
                      Silence parts of yourself to belong. Your language, theology, and cultural expression are welcome.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Your Calling */}
      <section className="py-16 bg-(--color-primary)">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 max-w-2xl mx-auto leading-relaxed">
            Your calling deserves to be held, affirmed, and supported in community.
          </h2>
          <p className="text-xl lg:text-2xl italic text-(--color-roti) mb-8">
            Are you ready to step into the Collective?
          </p>
          <div
            data-fillout-id="e4pZwnuAkYus"
            data-fillout-embed-type="slider"
            data-fillout-button-text="Yes! Enroll me now!"
            data-fillout-button-color="#C7A254"
            data-fillout-button-size="large"
            data-fillout-slider-direction="right"
            data-fillout-inherit-parameters=""
            data-fillout-popup-size="medium"
          />
        </div>
      </section>

      {/* As a Member Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Logo and Collage Header */}
            <div className="mb-12">
              <div className="relative w-full max-w-4xl mx-auto">
                <Image 
                  src="/assets/images/tc_hero_banner.png" 
                  alt="Flow in Faith Teachers Collective - Where Calling meets Community" 
                  width={1200} 
                  height={400} 
                  className="w-full h-auto"
                />
              </div>
            </div>

            <h2 className="text-[38px] font-black text-(--color-primary) mb-2 text-center leading-[1.25]">
              As a member of Flow in Faith Teachers Collective
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center">you&apos;ll have access to:</p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-6">
                <div className="relative w-full aspect-[16/9] mb-6">
                  <Image src="/assets/P3WuMgPVZVr3eZ2SvkCVrEnYHe71HnA6TlnFH1R3.webp" alt="Teacher Directory" fill className="object-contain" />
                </div>
                <h3 className="font-bold text-(--color-primary) mb-3 text-center">
                  Teacher Directory Placement (Value: $297/yr.)
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed text-center">
                  Visibility through our publicly accessible directory so students, churches, and organizations can find and hire Christ-Centered Yoga Teachers of Color worldwide.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-6">
                <div className="relative w-full aspect-[16/9] mb-6">
                  <Image src="/assets/Monthly Community Check-Ins (Value- $).webp" alt="Monthly Check-ins" fill className="object-contain" />
                </div>
                <h3 className="font-bold text-(--color-primary) mb-3 text-center">
                  Monthly Community Check-Ins (Value: $480/yr.)
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed text-center">
                  Virtual gatherings for connection, reflection, networking, and shared growth — facilitated with intention and care.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-6">
                <div className="relative w-full aspect-[16/9] mb-6">
                  <Image src="/assets/Private Community Space (Value- $).webp" alt="Private Community" fill className="object-contain" />
                </div>
                <h3 className="font-bold text-(--color-primary) mb-3 text-center">
                  Private Community Space (Value: $360/yr.)
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed text-center">
                  A private online community space where we connect daily, ask questions, share wins, swap resources, and collaborate — without having to explain or defend our identity.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-6">
                <div className="relative w-full aspect-[16/9] mb-6">
                  <Image src="/assets/Quarterly Workshops & Masterclasses (Value- $).webp" alt="Quarterly Workshops" fill className="object-contain" />
                </div>
                <h3 className="font-bold text-(--color-primary) mb-3 text-center">
                  Quarterly Workshops & Masterclasses (Value: $600/yr.)
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed text-center">
                  Spiritually aligned and culturally grounded workshops led by experienced teachers and industry leaders on business growth, theology, yoga integration, trauma-informed teaching, and more.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Opportunities */}
      <section className="py-16 bg-(--color-primary)">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-[38px] font-black text-(--color-roti) mb-10 text-center tracking-wider uppercase">
              PLUS THESE PREMIUM OPPORTUNITIES:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              <div className="bg-white rounded-xl p-5">
                <h4 className="text-xl font-bold text-(--color-roti) mb-3 text-center uppercase tracking-wide leading-tight">
                  PROMOTION OF YOUR<br />OFFERINGS
                </h4>
                <p className="text-gray-600 leading-normal text-base mb-4">
                  Your classes, workshops, retreats, or courses shared through Flow in Faith social channels and newsletters.
                </p>
                <p className="text-gray-500 text-xs">(Value: $600/yr.)</p>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="text-xl font-bold text-(--color-roti) mb-3 text-center uppercase tracking-wide leading-tight">
                  PAID TEACHING<br />OPPORTUNITIES
                </h4>
                <p className="text-gray-600 leading-normal text-base mb-4">
                  Opportunities to teach Christ-Centered yoga classes or workshops inside the Flow in Faith Sanctuary Membership.
                </p>
                <p className="text-gray-500 text-xs">(Value: $1,200/yr.)</p>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="text-xl font-bold text-(--color-roti) mb-3 text-center uppercase tracking-wide leading-tight">
                  CONTRIBUTION TO THE<br />ON-DEMAND LIBRARY
                </h4>
                <p className="text-gray-600 leading-normal text-base mb-4">
                  Share your Christ-Centered recorded classes, meditations, or resources to reach students globally.
                </p>
                <p className="text-gray-500 text-xs">(Value: $500/yr.)</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-(--color-roti) text-lg md:text-xl font-bold italic mb-6">Are you ready to connect?</p>
              <div
                data-fillout-id="e4pZwnuAkYus"
                data-fillout-embed-type="slider"
                data-fillout-button-text="Yes! This is exactly what I need!"
                data-fillout-button-color="#C7A254"
                data-fillout-button-size="large"
                data-fillout-slider-direction="right"
                data-fillout-inherit-parameters=""
                data-fillout-popup-size="medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Membership Options */}
      <section className={`py-20 bg-(--color-gallery) ${dancingScript.variable}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-(--color-primary) mb-4 text-center">
              Membership Options
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center">
              Choose the path that best supports your journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* TEACHERS COLLECTIVE Core */}
              <div className="bg-white rounded-2xl border-2 border-(--color-roti) overflow-hidden flex flex-col shadow-lg">
                <div className="p-8 flex-1">
                  <h3 className="text-(--color-primary) font-bold uppercase tracking-wide">
                    <span className="block text-2xl md:text-3xl">Teachers</span>
                    <span className="block text-2xl md:text-3xl">Collective</span>
                    <span className="text-(--color-roti) text-2xl md:text-3xl font-normal normal-case tracking-normal mt-1 inline-block ml-2 font-[family:var(--font-script)]">Core</span>
                  </h3>
                  <ul className="mt-8 space-y-4">
                    <li className="flex items-start gap-3 text-gray-800">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                      Teacher Directory Placement
                    </li>
                    <li className="flex items-start gap-3 text-gray-800">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                      Monthly Community Check-Ins
                    </li>
                    <li className="flex items-start gap-3 text-gray-800">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                      Daily Community Space
                    </li>
                    <li className="flex items-start gap-3 text-gray-800">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                      Quarterly Masterclasses
                    </li>
                    <li className="flex items-start gap-3 text-gray-400">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5 text-gray-400" aria-hidden><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l2.5 2.5L9 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                      Promotion of Offerings
                    </li>
                    <li className="flex items-start gap-3 text-gray-400">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5 text-gray-400" aria-hidden><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l2.5 2.5L9 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                      Paid Teaching Opportunities
                    </li>
                    <li className="flex items-start gap-3 text-gray-400">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5 text-gray-400" aria-hidden><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l2.5 2.5L9 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                      Contribution to On-Demand Library
                    </li>
                  </ul>
                </div>
                <div className="bg-(--color-roti) text-white p-6 text-center rounded-b-2xl space-y-3">
                  <p className="font-bold text-lg">$47/monthly</p>
                  <p className="font-bold text-lg">$470/annually</p>
                  <Link href="/join?plan=core" className="inline-block mt-2 px-6 py-2.5 bg-white text-(--color-roti) font-bold rounded-full hover:opacity-90 transition-opacity">Join Core</Link>
                </div>
              </div>

              {/* TEACHERS COLLECTIVE Pro */}
              <div className="bg-white rounded-2xl border-2 border-(--color-roti) overflow-hidden flex flex-col shadow-lg">
                <div className="p-8 flex-1">
                  <h3 className="text-(--color-primary) font-bold uppercase tracking-wide">
                    <span className="block text-2xl md:text-3xl">Teachers</span>
                    <span className="block text-2xl md:text-3xl">Collective</span>
                    <span className="text-(--color-roti) text-2xl md:text-3xl font-normal normal-case tracking-normal mt-1 inline-block ml-2 font-[family:var(--font-script)]">Pro</span>
                  </h3>
                  <ul className="mt-8 space-y-4">
                    {[
                      'Teacher Directory Placement',
                      'Monthly Community Check-Ins',
                      'Daily Community Space',
                      'Quarterly Masterclasses',
                      'Promotion of Offerings',
                      'Paid Teaching Opportunities',
                      'Contribution to On-Demand Library',
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-gray-800">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-(--color-primary) flex items-center justify-center text-white mt-0.5" aria-hidden>
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-(--color-roti) text-white p-6 text-center rounded-b-2xl space-y-3">
                  <p className="font-bold text-lg">$67/monthly</p>
                  <p className="font-bold text-lg">$670/annually</p>
                  <Link href="/join?plan=pro" className="inline-block mt-2 px-6 py-2.5 bg-white text-(--color-roti) font-bold rounded-full hover:opacity-90 transition-opacity">Join Pro</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* It's Time To Section */}
      <section className="py-20 bg-(--color-primary)">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[38px] font-bold leading-[1.25] text-center text-white mb-12">
              It&apos;s Time to..
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-lg overflow-hidden">
                <Image
                  src="/images/homepage/community-image.jpg"
                  alt="Teacher in community"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 text-lg text-white/95 leading-relaxed">
                <p>
                  Teach from a place of spiritual integrity without over-explaining or shrinking parts of yourself.
                </p>
                <p>
                  Be seen, supported, and affirmed inside a community that actually understands your lived experience.
                </p>
                <p>
                  Grow professionally through aligned opportunities for visibility, collaboration, and leadership that honor your values.
                </p>
              </div>
            </div>
            <div className="text-center fillout-cta-its-time">
              <div
                data-fillout-id="e4pZwnuAkYus"
                data-fillout-embed-type="slider"
                data-fillout-button-text="Join the Teachers Collective"
                data-fillout-button-color="#C7A254"
                data-fillout-button-size="large"
                data-fillout-slider-direction="right"
                data-fillout-inherit-parameters=""
                data-fillout-popup-size="medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Visionaries Section */}
      <section className="py-20 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-(--color-primary) mb-6 text-center uppercase tracking-wide">
              Meet the Visionaries
            </h2>
            <p className="text-lg text-gray-700 mb-14 text-center leading-relaxed max-w-3xl mx-auto">
              Led by Queen and De, the Flow in Faith Teachers Collective was created from lived experience, prayerful discernment, and a deep belief that Christ-Centered Yoga Teachers of Color were never meant to walk this calling alone.
            </p>

            {/* Founder Profiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Queen */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
                <div className="flex justify-center mb-6">
                  <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-(--color-roti) overflow-hidden">
                    <Image src="/images/homepage/founder-queen-new.png" alt="Queen Robertson" fill className="object-cover" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-(--color-primary) mb-1 text-center">Queen Robertson</h4>
                <p className="text-(--color-roti) font-semibold mb-5 text-center">Founder/Visionary</p>
                <div className="text-gray-700 space-y-4 text-sm leading-relaxed">
                  <p>Queen is a yoga teacher and space holder who invites presence, reflection, and embodiment through intentional movement and breath.</p>
                  <p>With 200-hour yoga training and a practice rooted in mindfulness, rest, and nervous system care, she creates grounding spaces where students can slow down, reconnect, and move without urgency.</p>
                  <p>Her teaching emphasizes balance, compassion, and honoring the body&apos;s wisdom.</p>
                  <p>Whether you&apos;re arriving for the first time or returning to yourself, Queen offers a practice that is steady, affirming, and deeply human.</p>
                </div>
              </div>

              {/* De */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
                <div className="flex justify-center mb-6">
                  <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-(--color-roti) overflow-hidden">
                    <Image src="/images/homepage/founder-de-new.png" alt="De Bolton" fill className="object-cover" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-(--color-primary) mb-1 text-center">De Bolton</h4>
                <p className="text-(--color-roti) font-semibold mb-5 text-center">Founder/Visionary</p>
                <div className="text-gray-700 space-y-4 text-sm leading-relaxed">
                  <p>De is a movement leader who makes every minute on the mat matter. A dedicated yoga and Pilates instructor, she blends breath, strength, grace, and embodied presence to help move what&apos;s unseen and unheard in the body.</p>
                  <p>With 200-hour yoga training, 500-hour Ashtanga, and 100-hour trauma-informed certification, plus Mat Pilates, De creates safe, empowering spaces for all levels. Her teaching is rooted in mindfulness, compassion, and transformation, inviting you to build resilience, self-awareness, and inner peace.</p>
                  <p>Whether you&apos;re beginning or deepening your practice, De will challenge you, support you, and inspire you to rise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-(--color-primary)">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white mb-4 leading-tight">
            So, what do you say?
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Are you ready to grow in a space where your faith, culture, and practice are fully welcome?
          </p>
          <div className="fillout-cta-final">
            <div
              data-fillout-id="e4pZwnuAkYus"
              data-fillout-embed-type="slider"
              data-fillout-button-text="Join the Teachers Collective"
              data-fillout-button-color="#C7A254"
              data-fillout-button-size="large"
              data-fillout-slider-direction="right"
              data-fillout-inherit-parameters=""
              data-fillout-popup-size="medium"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section - from Sanity (teacherCollectiveFaqs) */}
      <section className="py-20 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqs.intro && <p className="text-base text-gray-600 mb-3 text-center">{faqs.intro}</p>}
            <h2 className="text-3xl lg:text-4xl font-black text-black mb-10 text-center">{faqs.heading || 'FAQs'}</h2>

            <div className="space-y-4">
              {(faqs.items || []).map((faq, idx) => (
                <details key={idx} className="group">
                  <summary className="flex items-center justify-between bg-(--color-primary) text-white px-6 py-4 rounded-sm cursor-pointer border-l-4 border-(--color-roti) list-none">
                    <span className="font-medium text-base">{faq.question}</span>
                    <svg className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="bg-white px-6 py-5 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Line Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Image */}
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/homepage/bottom-line-yoga.png"
                  alt="Yoga teacher practicing at home with laptop"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-(--color-roti) mb-4 italic leading-tight">
                  Bottom line… There is space for you here!!
                </h2>
                <h3 className="text-lg md:text-xl font-bold text-(--color-primary) mb-8">
                  Let&apos;s walk this path together.
                </h3>
                <div className="fillout-cta-bottom-line">
                  <div
                    data-fillout-id="e4pZwnuAkYus"
                    data-fillout-embed-type="slider"
                    data-fillout-button-text="Join the Teachers Collective"
                    data-fillout-button-color="#C7A254"
                    data-fillout-button-size="large"
                    data-fillout-slider-direction="right"
                    data-fillout-inherit-parameters=""
                    data-fillout-popup-size="medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
