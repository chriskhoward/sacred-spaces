import Image from 'next/image';
import Link from 'next/link';
import FilloutSliderButton from '@/components/FilloutSliderButton';

/** Section padding and max-width to match MailerPage rhythm */
const sectionPad = 'py-14 md:py-20 px-6 sm:px-8';
const containerNarrow = 'max-w-4xl mx-auto';
const containerWide = 'max-w-6xl mx-auto';

export default function HomePageContent() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section - extra top padding to clear nav */}
      <section className={`pt-32 md:pt-40 lg:pt-44 pb-14 md:pb-20 px-6 sm:px-8 ${containerWide}`}>
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          <div className="md:w-[55%] text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#413356] mb-6 leading-[1.15] tracking-tight">
              A Christ-centered wellness ecosystem rooted in embodiment, rest, and community.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl font-medium mb-8">
              Here, faith is embodied. Here, rest is sacred. Here, you don’t have to choose between your calling, your culture, and your wholeness.
            </p>
            <FilloutSliderButton buttonText="Join the Teachers Collective" variant="hero" className="inline-block" />
          </div>
          <div className="md:w-[45%] flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px]">
              <div className="absolute inset-0 bg-[#C7A254]/5 rounded-full flex items-center justify-center border-4 border-[#C7A254]/10">
                <Image
                  src="/images/homepage/logo-gold.png"
                  alt="Flow in Faith Logo"
                  fill
                  className="object-contain p-6"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sacred Banner */}
      <section className="bg-[#413356] py-14 md:py-20 px-6 sm:px-8 overflow-hidden">
        <div className={containerNarrow}>
          <h2 className="text-white text-2xl md:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-center leading-tight lg:whitespace-nowrap">
            Rest is sacred. The body is holy. Healing belongs in faith.
          </h2>
        </div>
      </section>

      {/* 3. Inherited Stories */}
      <section className={sectionPad}>
        <div className={containerNarrow}>
          <div className="border-2 border-[#C7A254] rounded-2xl p-8 md:p-12 bg-white shadow-sm">
            <div className="space-y-6 text-base md:text-lg text-gray-800 leading-relaxed text-left">
              <p>
                Too many of us have inherited stories that frame wellness as selfish, the body as suspicious, and spiritual devotion as something that requires disconnection from culture, emotion, or lived experience.
              </p>
              <p>
                For many—especially <span className="text-[#C7A254] font-extrabold px-1">People of Color</span>—this has meant navigating faith spaces that ignore the body, and wellness spaces that ask us to leave parts of ourselves behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Different Story + We exist to offer - heading gold, subheading white */}
      <section className="bg-[#413356] py-14 md:py-20 px-6 sm:px-8">
        <div className={containerWide}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#C7A254] text-center mb-4">
            Flow in Faith is here to tell a different story
          </h2>
          <p className="text-white text-lg md:text-xl lg:text-2xl text-center">We exist to offer...</p>
        </div>
      </section>

      {/* 5. Feature Grid - white cards with framed images, gold titles, dark text */}
      <section className="bg-[#413356] pb-14 md:pb-20 pt-6 px-6 sm:px-8">
        <div className={`${containerWide} grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10`}>
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col text-left">
            <div className="p-4 md:p-5 flex justify-center bg-white">
              <div className="relative w-full aspect-square max-w-[220px] rounded-lg overflow-hidden border-4 border-white shadow-md">
                <Image
                  src="/images/homepage/feature-1.webp"
                  alt="Liberating, Christ-centered embodiment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-6 md:p-7 flex-grow">
              <h3 className="text-[#C7A254] text-xl md:text-2xl font-bold mb-4">Liberating, Christ-centered embodiment</h3>
              <p className="text-gray-800 text-base leading-relaxed">
                Faith-aligned practices that support rest, healing, and nervous system regulation—without fear, shame, or spiritual conflict.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col text-left">
            <div className="p-4 md:p-5 flex justify-center bg-white">
              <div className="relative w-full aspect-square max-w-[220px] rounded-lg overflow-hidden border-4 border-white shadow-md">
                <Image
                  src="/images/homepage/feature-2.webp"
                  alt="Faith that honors the whole person"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-6 md:p-7 flex-grow">
              <h3 className="text-[#C7A254] text-xl md:text-2xl font-bold mb-4">Faith that honors the whole person</h3>
              <p className="text-gray-800 text-base leading-relaxed">
                A faith that welcomes questions, emotions, and embodiment—grounded in Christ and rooted in wholeness.
              </p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col text-left">
            <div className="p-4 md:p-5 flex justify-center bg-white">
              <div className="relative w-full aspect-square max-w-[220px] rounded-lg overflow-hidden border-4 border-white shadow-md">
                <Image
                  src="/images/homepage/feature-3.webp"
                  alt="Community that reflects lived experience"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-6 md:p-7 flex-grow">
              <h3 className="text-[#C7A254] text-xl md:text-2xl font-bold mb-4">Community that reflects lived experience</h3>
              <p className="text-gray-800 text-base leading-relaxed">
                A culturally grounded community where identity, faith, and lived experience are honored without explanation or erasure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Mission: belong & become + two communities CTAs - match reference layout */}
      <section className={`${sectionPad} ${containerWide}`}>
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
          <div className="lg:w-1/2 min-h-[320px]">
            <div className="relative w-full aspect-[4/5] max-h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/homepage/community-image.png"
                alt="Person resting outdoors in nature"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-6">
              Rooted in embodied Christian practice and centered on the lived experiences of People of Color, Flow in Faith offers a spiritual home where the body is honored as sacred, rest is reclaimed as devotion, and community becomes a pathway to healing, leadership, and renewal.
            </p>
            <p className="text-[#C7A254] font-bold text-lg md:text-xl mb-4">
              Through the Teachers Collective, we create room to:
            </p>
            <ul className="list-disc list-outside space-y-2 mb-8 text-gray-800 text-base md:text-lg leading-relaxed pl-5">
              {['Slow down without guilt', 'Practice faith in embodied, liberating ways', 'Be seen and supported in your fullness', 'Grow in community instead of isolation'].map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 max-w-md [&>div]:w-full [&_a]:w-full [&_button]:w-full [&_a]:rounded-full [&_button]:rounded-full [&_a]:justify-center [&_button]:justify-center">
                <FilloutSliderButton buttonText="Teachers Collective" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Belonging Banner */}
      <section className="bg-[#413356] py-14 md:py-20 px-6 sm:px-8 text-center">
        <div className={containerNarrow}>
          <h2 className="text-white text-2xl md:text-[35px] lg:text-4xl font-bold text-center leading-tight">
            This is a place to belong & become. This is Flow in Faith.
          </h2>
        </div>
      </section>

      {/* 8. Community Card - Teachers Collective (logo, heading, paragraph, button) */}
      <section className={`${sectionPad} bg-gray-50`}>
        <div className={containerWide}>
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md border border-gray-200 flex flex-col items-center text-center max-w-2xl w-full">
              <div className="relative w-52 h-52 md:w-64 md:h-64 flex-shrink-0 mb-6">
                <Image
                  src="/images/homepage/logo-gold.png"
                  alt="Flow in Faith Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 leading-snug">
                The Flow in Faith Teachers Collective is a community-centered home created exclusively for Yoga Teachers of Color who love Jesus.
              </h3>
              <p className="text-base text-gray-700 leading-relaxed mb-8 flex-grow">
                This is a space created so teachers could grow, collaborate, and be affirmed in the fullness of their identity, their faith, and their culture — without shrinking or separating pieces of themselves to belong.
              </p>
              <Link href="/teacher-collective" className="w-full py-4 bg-[#C7A254] text-white rounded-full font-bold text-base hover:opacity-95 transition-opacity shadow-md text-center">
                Learn more about the Teachers Collective
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8b. Held by God banner (gold text, purple bg) */}
      <section className="bg-[#413356] py-14 md:py-20 px-6 sm:px-8 text-center">
        <div className={containerNarrow}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#C7A254] font-bold leading-[1.2]">
            This is a space to be held by God,<br />
            by community, and by breath.
          </h2>
        </div>
      </section>

      {/* 9. Whether you are - image left, text right, two CTAs below */}
      <section className={`${sectionPad} max-w-6xl mx-auto bg-white`}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/homepage/whether-you-are.png"
                alt="Person in prayer gesture with laptop in a cozy space"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#C7A254] mb-6">Whether you are:</h2>
            <ul className="space-y-4 mb-8">
              {[
                'A teacher seeking community, visibility, and spiritual grounding',
                'A seeker longing for rest, healing, and embodied faith',
                'Or someone still discerning where you belong'
              ].map((label, idx) => (
                <li key={idx} className="text-base md:text-lg text-gray-800 leading-snug">
                  {label}
                </li>
              ))}
            </ul>
            <Link href="/teacher-collective" className="inline-block w-full sm:w-auto min-w-[200px] py-4 px-6 bg-[#C7A254] text-white rounded-full font-bold text-base text-center hover:opacity-95 transition-opacity shadow-md">
              Join the Teachers Collective
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
