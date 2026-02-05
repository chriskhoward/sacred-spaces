import Image from 'next/image';
import Script from 'next/script';

export default function HomePageContent() {
  return (
    <>
      {/* Email-style centered layout matching target page */}
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 py-24 md:py-32">
          {/* Hero Section - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Text */}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#413356] mb-8 leading-tight">
                Your path to belonging, visibility, and spiritually grounded growth.
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                Step into a faith-affirming, culturally grounded community designed to support Christ-Centered Yoga Teachers of Color in growing confidently, connecting deeply, and leading boldly in their calling.
              </p>

              {/* Hero CTA */}
              <div className="text-left">
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

            {/* Right Column - Image */}
            <div>
              <Image
                src="/images/homepage/hero-image.jpg"
                alt="Flow in Faith Community"
                width={640}
                height={400}
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Imagine Section - Full Width Purple Background */}
        <div className="bg-[#413356] py-20">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Imagine what it would feel like to…
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6 h-64 relative">
                  <Image
                    src="/images/homepage/feature-1.png"
                    alt="Teach with confidence"
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-gray-800 text-lg">
                  Teach with confidence, knowing your faith and practice are not in conflict.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6 h-64 relative">
                  <Image
                    src="/images/homepage/feature-2.png"
                    alt="Be surrounded by teachers"
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-gray-800 text-lg">
                  Be surrounded by teachers who understand the nuance of your journey.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6 h-64 relative">
                  <Image
                    src="/images/homepage/feature-3.png"
                    alt="Access opportunities"
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-gray-800 text-lg">
                  Have access to opportunities that support both your spiritual and professional growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of content in narrower container */}
        <div className="max-w-[640px] mx-auto px-4 py-16">

          {/* Listen Section */}
          <div className="mb-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Listen, I see you…
            </h2>
            <div className="space-y-4 text-base md:text-lg text-gray-700">
              <p>
                You've been carrying your calling largely on your own. Holding space for students, navigating faith and embodiment. Often, feeling stretched thin as you pour out more than you're being poured into.
              </p>
              <p>
                AND even though you've done the trainings, attended the workshops, and connected with people along the way, there's still a quiet loneliness. Few understand the reality of being a Christ-centered Yoga Teacher of Color navigating multiple worlds.
              </p>
            </div>
          </div>

          {/* Feature Images */}
          <div className="mb-8">
            <Image
              src="/images/homepage/feature-1.png"
              alt="Feature 1"
              width={500}
              height={300}
              className="w-full h-auto mb-4"
            />
            <Image
              src="/images/homepage/feature-2.png"
              alt="Feature 2"
              width={500}
              height={300}
              className="w-full h-auto mb-4"
            />
            <Image
              src="/images/homepage/feature-3.png"
              alt="Feature 3"
              width={500}
              height={300}
              className="w-full h-auto mb-4"
            />
          </div>

          {/* Community Image */}
          <div className="mb-8">
            <Image
              src="/images/homepage/community-image.jpg"
              alt="Community"
              width={439}
              height={300}
              className="w-full h-auto"
            />
          </div>

          {/* It's Time Section */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              It's time to take up space without apology, and step into community.
            </h2>

            {/* Fillout CTA Button */}
            <div className="mb-8">
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
              <Script src="https://server.fillout.com/embed/v1/" strategy="lazyOnload" />
            </div>
          </div>

          {/* You Don't Have To Section */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              You don't have to…
            </h3>
            <p className="text-base md:text-lg text-gray-700 mb-3">
              Keep navigating this work without support, piecing things together on your own, and carrying questions in silence.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              Silence parts of yourself to belong. Your language, theology, and cultural expression are welcome.
            </p>
          </div>

          {/* Your Calling Deserves Section */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Your calling deserves to be held, affirmed, and supported in community.
            </h2>
          </div>

          {/* Benefits Header Image */}
          <div className="mb-8">
            <Image
              src="/images/homepage/benefits-header.png"
              alt="Premium Opportunities"
              width={1110}
              height={200}
              className="w-full h-auto"
            />
          </div>

          {/* Benefit Icon */}
          <div className="mb-8">
            <Image
              src="/images/homepage/benefit-icon-1.png"
              alt="Benefit"
              width={419}
              height={200}
              className="w-full h-auto"
            />
          </div>

          {/* Are You Ready Section */}
          <div className="mb-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Are you ready to step into the Collective?
            </h3>

            {/* Fillout CTA Button */}
            <div className="mb-8">
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
          </div>

          {/* As a Member Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              As a member of Flow in Faith Teachers Collective
            </h2>
            <p className="text-lg text-gray-700 mb-6">you'll have access to:</p>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Teacher Directory Placement (Value: $)</h3>
                <p className="text-gray-700">
                  Visibility through our publicly accessible directory so students, churches, and organizations can find and hire Christ-Centered Yoga Teachers of Color worldwide.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Monthly Community Check-Ins (Value: $)</h3>
                <p className="text-gray-700">
                  Virtual gatherings for connection, reflection, networking, and shared growth — facilitated with intention and care.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Private Community Space (Value: $)</h3>
                <p className="text-gray-700">
                  A private online community space where we connect daily, ask questions, share wins, swap resources, and collaborate — without having to explain or defend our identity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quarterly Workshops & Masterclasses (Value: $)</h3>
                <p className="text-gray-700">
                  Spiritually aligned and culturally grounded workshops led by experienced teachers and industry leaders on business growth, theology, yoga integration, trauma-informed teaching, and more.
                </p>
              </div>
            </div>
          </div>

          {/* Premium Opportunities Header */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              PLUS THESE PREMIUM OPPORTUNITIES:
            </h3>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">PROMOTION OF YOUR OFFERINGS</h4>
                <p className="text-gray-700 mb-2">
                  Your classes, workshops, retreats, or courses shared through Flow in Faith social channels and newsletters.
                </p>
                <p className="text-gray-700">(Value: $)</p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">PAID TEACHING OPPORTUNITIES</h4>
                <p className="text-gray-700 mb-2">
                  Opportunities to teach Christ-Centered yoga classes or workshops inside the Flow in Faith Sanctuary Membership.
                </p>
                <p className="text-gray-700">(Value: $)</p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">CONTRIBUTION TO THE ON-DEMAND LIBRARY</h4>
                <p className="text-gray-700 mb-2">
                  Share your Christ-Centered recorded classes, meditations, or resources to reach students globally.
                </p>
                <p className="text-gray-700">(Value: $)</p>
              </div>
            </div>
          </div>

          {/* Are You Ready to Connect */}
          <div className="mb-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Are you ready to connect?
            </h3>

            {/* Fillout CTA Button */}
            <div className="mb-8">
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

          {/* Membership Options */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Membership Options
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Choose the path that best supports your journey.
            </p>

            <div className="space-y-6 mb-8">
              <Image
                src="/images/homepage/pricing-option-1.png"
                alt="Membership Option 1"
                width={1649}
                height={400}
                className="w-full h-auto"
              />
              <Image
                src="/images/homepage/pricing-option-2.png"
                alt="Membership Option 2"
                width={1649}
                height={400}
                className="w-full h-auto"
              />
              <Image
                src="/images/homepage/pricing-option-3.png"
                alt="Membership Option 3"
                width={1649}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mb-8 text-center space-y-4">
            <Image
              src="/images/homepage/cta-button.png"
              alt="Join Now"
              width={623}
              height={100}
              className="mx-auto cursor-pointer"
            />
          </div>

          {/* It's Time To Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              It's Time to..
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-3">
              Teach from a place of spiritual integrity without over-explaining or shrinking parts of yourself.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-3">
              Be seen, supported, and affirmed inside a community that actually understands your lived experience.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              Grow professionally through aligned opportunities for visibility, collaboration, and leadership that honor your values.
            </p>
          </div>

          {/* Join CTA */}
          <div className="mb-8 text-center">
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

          {/* Meet the Visionaries */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              MEET THE VISIONARIES
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              Led by Queen and De, the Flow in Faith Teachers Collective was created from lived experience, prayerful discernment, and a deep belief that Christ-Centered Yoga Teachers of Color were never meant to walk this calling alone.
            </p>
          </div>

          {/* Team Photo */}
          <div className="mb-8">
            <Image
              src="/images/homepage/team-photo.jpg"
              alt="Queen and De"
              width={1110}
              height={600}
              className="w-full h-auto"
            />
          </div>

          {/* Founder Profiles */}
          <div className="mb-8 space-y-8">
            {/* Queen */}
            <div className="text-center">
              <Image
                src="/images/homepage/founder-queen.png"
                alt="Queen Robertson"
                width={350}
                height={350}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Queen Robertson</h3>
              <p className="text-lg text-gray-600 mb-4">Founder/Visionary</p>
              <div className="text-gray-700 space-y-3">
                <p>
                  Queen is a yoga teacher and space holder who invites presence, reflection, and embodiment through intentional movement and breath.
                </p>
                <p>
                  With 200-hour yoga training and a practice rooted in mindfulness, rest, and nervous system care, she creates grounding spaces where students can slow down, reconnect, and move without urgency.
                </p>
                <p>
                  Her teaching emphasizes balance, compassion, and honoring the body's wisdom.
                </p>
                <p>
                  Whether you're arriving for the first time or returning to yourself, Queen offers a practice that is steady, affirming, and deeply human.
                </p>
              </div>
            </div>

            {/* De */}
            <div className="text-center">
              <Image
                src="/images/homepage/founder-de.png"
                alt="De Bolton"
                width={350}
                height={350}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">De Bolton</h3>
              <p className="text-lg text-gray-600 mb-4">Founder/Visionary</p>
              <div className="text-gray-700 space-y-3">
                <p>
                  De is a movement leader who makes every minute on the mat matter. A dedicated yoga and Pilates instructor, she blends breath, strength, grace, and embodied presence to help move what's unseen and unheard in the body.
                </p>
                <p>
                  With 200-hour yoga training, 500-hour Ashtanga, and 100-hour trauma-informed certification, plus Mat Pilates, De creates safe, empowering spaces for all levels.
                </p>
                <p>
                  Her teaching is rooted in mindfulness, compassion, and transformation, inviting you to build resilience, self-awareness, and inner peace.
                </p>
                <p>
                  Whether you're beginning or deepening your practice, De will challenge you, support you, and inspire you to rise.
                </p>
              </div>
            </div>
          </div>

          {/* So What Do You Say */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              So, what do you say?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Are you ready to grow in a space where your faith, culture, and practice are fully welcome?
            </p>
          </div>

          {/* FAQs */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              FAQs
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">How much does a subscription cost?</h3>
                <p className="text-gray-700">
                  Membership pricing details are available when you apply. We offer flexible options to support your journey.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Where can I read your latest articles?</h3>
                <p className="text-gray-700">
                  Our latest articles and resources are shared with members in our private community space and through our newsletter.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">How often do you send out your newsletter?</h3>
                <p className="text-gray-700">
                  We send regular updates to keep you connected with community news, opportunities, and inspiration.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Let's walk this path together.
            </h2>

            <div className="mb-8">
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

          {/* Footer Logo */}
          <div className="text-center py-8">
            <Image
              src="/images/homepage/footer-logo.png"
              alt="Flow in Faith"
              width={438}
              height={300}
              className="mx-auto"
            />
          </div>

          {/* Final Logo */}
          <div className="text-center pb-8">
            <Image
              src="/images/homepage/logo.png"
              alt="Flow in Faith"
              width={103}
              height={103}
              className="mx-auto"
            />
          </div>

        </div>
      </div>
    </>
  );
}
