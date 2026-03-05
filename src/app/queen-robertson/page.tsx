import Link from 'next/link';
import Image from 'next/image';
import { Heart, Wind, Leaf, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FilloutSliderButton from '@/components/FilloutSliderButton';
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { FOUNDER_PAGE_BY_SLUG_QUERY, type FounderPage } from '@/sanity/lib/founderPage';
import type { Metadata } from 'next';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, Wind, Leaf, Sparkles,
};

const DEFAULTS = {
  name: 'Queen Robertson',
  role: 'Founder/Visionary',
  organization: 'Flow in Faith Teachers Collective',
  tagline: 'A yoga teacher, facilitator, and community builder who creates spaces where people can slow down, take up space, and return to themselves with honesty and care.',
  photo: '/assets/images/team/queen_robertson.png',
  aboutHeading: 'About Queen',
  bioParagraphs: [
    'Queen is a yoga teacher, facilitator, and community builder who creates spaces where people can slow down, take up space, and return to themselves with honesty and care. Her work centers embodiment as a spiritual practice\u2014inviting presence, reflection, and wholeness both on and off the mat.',
    'Queen completed her 200-hour yoga teacher training and has continued her study through meditation, breathwork, and somatic practices that support nervous system regulation, rest, and self-awareness. Her teaching is shaped by lived experience, deep listening, and a commitment to holding space that is grounded, affirming, and accessible.',
    'Rooted in mindfulness, compassion, and liberation, Queen\u2019s classes are less about pushing and more about arriving\u2014cultivating balance, resilience, and trust in the body\u2019s wisdom. She integrates intentional movement, breath-led pacing, and moments of pause to support students in reconnecting with themselves without pressure or performance.',
    'Through her teaching, retreats, and community offerings, Queen encourages others to move with intention, honor their capacity, and practice from a place of wholeness. Whether you are new to yoga or deepening your practice, Queen invites you into a practice that feels spacious, supportive, and true.',
  ],
  credentialsHeading: 'Credentials & Training',
  credentials: [
    { title: '200-Hour Yoga Teacher Training', description: 'Comprehensive foundational training', icon: 'Heart' },
    { title: 'Meditation & Breathwork', description: 'Ongoing study and practice', icon: 'Wind' },
    { title: 'Somatic Practices', description: 'Nervous system regulation & rest', icon: 'Leaf' },
    { title: 'Self-Awareness & Embodiment', description: 'Continuous learning and growth', icon: 'Sparkles' },
  ],
  philosophyHeading: 'Teaching Philosophy',
  philosophyQuote: '\u201CHer teaching is less about pushing and more about arriving\u2014cultivating balance, resilience, and trust in the body\u2019s wisdom. She integrates intentional movement, breath-led pacing, and moments of pause to support students in reconnecting with themselves without pressure or performance.\u201D',
  ctaHeading: 'Ready to practice with Queen?',
  ctaText: 'Join the Flow in Faith Teachers Collective and connect with Queen and the community.',
  ctaButtonText: 'Join the Collective',
  ctaSecondaryText: 'Back to Home',
  ctaSecondaryLink: '/',
  metaTitle: 'Queen Robertson | Flow in Faith',
  metaDescription: 'Meet Queen Robertson, Founder and Visionary of Flow in Faith. Christ-centered yoga and wellness for Teachers of Color.',
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<FounderPage | null>(FOUNDER_PAGE_BY_SLUG_QUERY, { slug: 'queen-robertson' });
  return {
    title: data?.metaTitle || DEFAULTS.metaTitle,
    description: data?.metaDescription || DEFAULTS.metaDescription,
  };
}

export default async function QueenRobertsonPage() {
  const data = await client.fetch<FounderPage | null>(FOUNDER_PAGE_BY_SLUG_QUERY, { slug: 'queen-robertson' });

  const name = data?.name || DEFAULTS.name;
  const role = data?.role || DEFAULTS.role;
  const org = data?.organization || DEFAULTS.organization;
  const tagline = data?.tagline || DEFAULTS.tagline;
  const photoSrc = data?.photo ? urlForImage(data.photo).width(640).height(640).url() : DEFAULTS.photo;
  const bannerBg = data?.bannerImage ? urlForImage(data.bannerImage).width(1600).url() : '/assets/images/banner_section_background.jpg';
  const aboutHeading = data?.aboutHeading || DEFAULTS.aboutHeading;
  const credentialsHeading = data?.credentialsHeading || DEFAULTS.credentialsHeading;
  const credentials = data?.credentials && data.credentials.length > 0 ? data.credentials : DEFAULTS.credentials;
  const philHeading = data?.philosophyHeading || DEFAULTS.philosophyHeading;
  const philQuote = data?.philosophyQuote || DEFAULTS.philosophyQuote;
  const ctaHeading = data?.ctaHeading || DEFAULTS.ctaHeading;
  const ctaText = data?.ctaText || DEFAULTS.ctaText;
  const ctaBtn = data?.ctaButtonText || DEFAULTS.ctaButtonText;
  const ctaSecText = data?.ctaSecondaryText || DEFAULTS.ctaSecondaryText;
  const ctaSecLink = data?.ctaSecondaryLink || DEFAULTS.ctaSecondaryLink;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-[180px] pb-24 bg-gradient-to-b from-(--color-primary) to-(--color-primary)/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url('${bannerBg}')` }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/3 flex justify-center">
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-6 border-(--color-roti) shadow-2xl">
                  <Image 
                    src={photoSrc}
                    alt={name}
                    fill 
                    className="object-cover"
                    unoptimized={photoSrc.startsWith('http')}
                  />
                </div>
              </div>
              <div className="lg:w-2/3 text-white">
                <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] uppercase text-sm mb-6 border border-white/20">
                  {role}
                </span>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-(--color-gallery)">
                  {name}
                </h1>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  {org}
                </p>
                <div className="w-24 h-1 bg-(--color-roti) mb-8"></div>
                <p className="text-lg text-white/80 leading-relaxed">
                  {tagline}
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
              <h2 className="text-4xl font-bold text-(--color-primary) mb-8">{aboutHeading}</h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                {data?.bio && data.bio.length > 0 ? (
                  <PortableText value={data.bio} />
                ) : (
                  DEFAULTS.bioParagraphs.map((p, i) => <p key={i}>{p}</p>)
                )}
              </div>

              {/* Credentials */}
              <div className="mt-12 pt-12 border-t-2 border-(--color-gallery)">
                <h3 className="text-2xl font-bold text-(--color-primary) mb-6">{credentialsHeading}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {credentials.map((cred, i) => {
                    const IconComp = ICON_MAP[cred.icon || 'Heart'] || Heart;
                    return (
                      <div key={i} className="bg-(--color-gallery) p-6 rounded-3xl">
                        <IconComp className="w-8 h-8 text-(--color-roti) mb-3" />
                        <h4 className="font-bold text-(--color-primary) mb-2">{cred.title}</h4>
                        <p className="text-gray-600 text-sm">{cred.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Teaching Philosophy */}
              <div className="mt-12 pt-12 border-t-2 border-(--color-gallery)">
                <h3 className="text-2xl font-bold text-(--color-primary) mb-6">{philHeading}</h3>
                <div className="bg-(--color-sidecar) p-8 rounded-3xl">
                  <p className="text-lg text-(--color-bronzetone) leading-relaxed italic">
                    {philQuote}
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
              {ctaHeading}
            </h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              {ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <FilloutSliderButton
                buttonText={ctaBtn}
                variant="cta"
                className="inline-flex"
              />
              <Link 
                href={ctaSecLink}
                className="inline-block px-6 py-3 border-2 border-(--color-primary) text-(--color-primary) rounded-full font-bold text-sm hover:bg-(--color-primary) hover:text-white transition-all"
              >
                {ctaSecText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
