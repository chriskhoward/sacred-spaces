import Link from 'next/link';
import Image from 'next/image';
import HeroBlock from '@/components/Blocks/Hero';
import { auth } from '@clerk/nextjs/server';

export default async function HomePageContent() {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  return (
    <>
      {/* Hero Section */}
      <HeroBlock
        badge="FLOW IN FAITH"
        title="Where Faith meets Freedom"
        subtitle="A Christ-centered wellness ecosystem rooted in embodiment, rest, and community."
        primaryButtonText="Explore Flow in Faith"
        secondaryButtonText="Find Your Space"
      />

      {/* Hero Sub-text / Intro */}
      <section className="bg-white py-16 text-center">
        <div className="container mx-auto px-4">
          <p className="text-xl lg:text-2xl text-(--color-primary) font-medium leading-relaxed max-w-4xl mx-auto">
            Here, faith is embodied.<br />
            Here, rest is sacred.<br />
            Here, you don’t have to choose between your calling, your culture, and your wholeness.
          </p>
        </div>
      </section>

      {/* What Is Flow in Faith? */}
      <section id="what-is-flow-in-faith" className="py-24 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-8">
              What Is Flow in Faith?
            </h2>
            <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
              <p>
                Flow in Faith is a Christ-centered wellness ecosystem offering culturally grounded spaces where healing, rest, and spiritual practice can coexist — without compromise.
              </p>
              <p>
                We were created for those who have been navigating their spiritual, emotional, and physical well-being in spaces that weren’t built with them in mind — spaces that misunderstood their bodies, overlooked their culture, or asked them to separate faith from healing.
              </p>
              <p>
                Rooted in embodied Christian practice and centered on the lived experiences of People of Color, Flow in Faith offers a spiritual home where the body is honored as sacred, rest is reclaimed as devotion, and community becomes a pathway to healing, leadership, and renewal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Flow in Faith Exists */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-8">
                  Why Flow in Faith Exists
                </h2>
                <p className="text-xl text-gray-700 mb-6 font-medium">
                  Too many people have been taught that:
                </p>
                <ul className="space-y-4 mb-8 text-lg text-gray-600">
                  <li className="flex gap-3 items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    Rest must be earned
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    The body is suspicious
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    Faith and healing must be separate
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    Wellness requires cultural erasure
                  </li>
                </ul>
              </div>

              <div className="bg-(--color-primary)/5 p-10 rounded-[3rem_0_3rem_0] border-l-4 border-(--color-roti)">
                <p className="text-2xl font-bold text-(--color-primary) mb-6">
                  We are here to tell a different story.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Flow in Faith exists to offer:
                </p>
                <ul className="space-y-3 mb-8 text-lg text-gray-700">
                  <li className="flex gap-3 items-center">
                    <span className="text-(--color-roti) text-xl">✓</span>
                    Spiritually safe wellness practices
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-(--color-roti) text-xl">✓</span>
                    Liberating, Christ-centered embodiment
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-(--color-roti) text-xl">✓</span>
                    Community that reflects lived experience
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-(--color-roti) text-xl">✓</span>
                    Rhythms that restore
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-(--color-roti) text-xl">✓</span>
                    Faith that honors the whole person
                  </li>
                </ul>
                <p className="text-xl font-medium text-(--color-primary) italic">
                  This is not about striving.<br />
                  This is about returning — to God, to the body, and to yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Two Sacred Spaces */}
      <section id="our-sacred-spaces" className="py-24 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-6">
              Our Two Sacred Spaces
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Flow in Faith is home to two distinct yet connected communities — connected by shared values, care, and community.
            </p>
            <p className="text-lg text-gray-600">
              Through our two core communities, we create room to slow down without guilt, practice faith in embodied, liberating ways, be seen and supported in your fullness, and grow in community instead of isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Teachers Collective */}
            <div className="bg-white p-10 rounded-[3rem_0_3rem_0] shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col h-full border-2 border-transparent hover:border-(--color-sidecar) transition-all">
              <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Flow in Faith Teachers Collective</h3>
              <p className="text-(--color-roti) uppercase tracking-wider font-bold mb-6 text-sm">Where Calling Meets Community</p>

              <p className="text-gray-700 mb-6 flex-grow">
                The Flow in Faith Teachers Collective is a community-centered home created exclusively for Yoga Teachers of Color who identify as Christian.
                <br /><br />
                This is a space created so teachers could grow, collaborate, and be affirmed in the fullness of their identity, their faith, and their culture — without shrinking or separating pieces of themselves to belong.
              </p>

              <ul className="space-y-2 mb-8 text-gray-600 text-sm">
                <li>• Daily community connection and support</li>
                <li>• Spiritually aligned professional development</li>
                <li>• Visibility for your work and gifts</li>
                <li>• Opportunities to collaborate, teach, and lead</li>
                <li>• A culturally safe space</li>
              </ul>

              <p className="text-gray-800 italic mb-8 font-medium">You were never meant to carry this calling in isolation.</p>

              <Link href="/teacher-collective" className="btn btn-primary w-full text-center">
                Learn about the Teachers Collective
              </Link>
            </div>

            {/* Sanctuary */}
            <div className="bg-white p-10 rounded-[3rem_0_3rem_0] shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col h-full border-2 border-transparent hover:border-(--color-sidecar) transition-all">
              <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Flow in Faith Sanctuary</h3>
              <p className="text-(--color-roti) uppercase tracking-wider font-bold mb-6 text-sm">Where Wellness Meets Worship</p>

              <p className="text-gray-700 mb-6 flex-grow">
                The Flow in Faith Sanctuary is a sacred space at the intersection of Christian spirituality, emotional wellness, and embodied practice — created with the lived experiences of People of Color at the center.
                <br /><br />
                This is a place to rest without explanation, reconnect with God through breath, movement, and stillness, tend to emotional and spiritual well-being, experience faith that heals, and be held in gentle, affirming community.
              </p>

              <p className="text-gray-800 italic mb-8 font-medium">Here, the body is not a barrier to God — it is a meeting place.</p>

              {/* Placeholder link for Sanctuary page if it doesn't exist yet */}
              <Link href="/sanctuary" className="btn btn-primary w-full text-center bg-(--color-martinique) hover:bg-(--color-primary)">
                Learn about the Sanctuary
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-8">
              Choose Your Path
            </h2>
            <div className="text-xl text-gray-700 mb-12 space-y-2">
              <p>Whether you are:</p>
              <ul className="list-none space-y-2 font-medium text-gray-900">
                <li>A teacher seeking community, visibility, and spiritual grounding</li>
                <li>A seeker longing for rest, healing, and embodied faith</li>
                <li>Or someone still discerning where you belong</li>
              </ul>
              <p className="mt-6 text-2xl text-(--color-roti) font-bold">There is space for you here.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/teacher-collective"
                className="inline-block px-10 py-5 bg-(--color-primary) text-white rounded-full font-bold text-lg hover:bg-(--color-roti) transition-all shadow-xl hover:scale-105 transform"
              >
                I’m a Teacher → Teachers Collective
              </Link>
              <Link
                href="/sanctuary"
                className="inline-block px-10 py-5 bg-(--color-martinique) text-white rounded-full font-bold text-lg hover:bg-(--color-primary) transition-all shadow-xl hover:scale-105 transform"
              >
                I’m Seeking Rest → Sanctuary
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Branding Statement */}
      <section className="py-24 bg-(--color-primary) text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6 text-2xl lg:text-4xl leading-tight">
            <p>Flow in Faith is an invitation to move differently.</p>
            <p>To breathe deeper.</p>
            <p>To rest more honestly.</p>
            <p>To trust that God meets you right where you are.</p>
            <div className="h-px w-24 bg-white/30 mx-auto my-8"></div>
            <p className="font-bold">This is a place to belong.</p>
            <p className="font-bold">This is a place to become.</p>
            <p className="text-(--color-roti) font-bold mt-8 text-5xl lg:text-7xl">This is Flow in Faith.</p>
          </div>
        </div>
      </section>
    </>
  );
}
