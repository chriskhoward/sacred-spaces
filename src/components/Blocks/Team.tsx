import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/image';

interface TeamMember {
  name: string;
  role: string;
  image?: { asset?: any } | string;
  bioLink?: string;
}

// Helper function to get bio link based on member name
function getBioLink(name: string): string | null {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('queen') || nameLower.includes("'queen'")) {
    return '/queen-robertson';
  }
  if (nameLower.includes('de') && nameLower.includes('bolton')) {
    return '/de-bolton';
  }
  return null;
}

interface TeamBlockProps {
  heading?: string;
  description?: string;
  members?: TeamMember[];
}

export default function TeamBlock({
  heading = "Leadership Team",
  description = "When we gather, we’re reminded we were never meant to walk this calling alone.",
  members = [
    { name: "‘Queen’ Robertson", role: "Founder / Vision Holder", image: "/assets/images/team/queen_robertson.png" },
    { name: "De Bolton", role: "Founder / Vision Holder", image: "/assets/images/team/de_bolton.png" },
    { name: "Eboni Howell", role: "Visibility & Media", image: "/assets/images/team/eboni_howell.png" },
    { name: "Morenike Olorunnisomo", role: "Community Steward", image: "/assets/images/team/morenike_olorunnisomo.png" }
  ]
}: TeamBlockProps) {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 sticky top-[150px]">
            <h2 className="text-5xl font-bold text-(--color-primary) mb-8">{heading}</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>
            <div className="space-y-6">
              {members.map((m, i) => {
                const bioLink = m.bioLink || getBioLink(m.name);
                const MemberCard = (
                  <div className={`flex items-center gap-6 p-4 rounded-2xl hover:bg-(--color-gallery) transition-colors ${bioLink ? 'cursor-pointer group' : ''}`}>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-(--color-roti) bg-white shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                        <Image 
                          src={(typeof m.image === 'object' && m.image?.asset) ? urlForImage(m.image).url() : (typeof m.image === 'string' ? m.image : '/assets/images/team/queen_robertson.png')} 
                          alt={m.name} 
                          fill 
                          className="object-cover" 
                        />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-(--color-primary) text-xl group-hover:text-(--color-roti) transition-colors ${bioLink ? 'flex items-center gap-2' : ''}`}>
                        {m.name}
                        {bioLink && (
                          <span className="text-sm text-(--color-roti) opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        )}
                      </h4>
                      <p className="text-gray-600 font-medium">{m.role}</p>
                    </div>
                  </div>
                );

                return bioLink ? (
                  <Link key={i} href={bioLink} className="block">
                    {MemberCard}
                  </Link>
                ) : (
                  <div key={i}>{MemberCard}</div>
                );
              })}
            </div>
          </div>
          <div className="lg:w-2/3 bg-(--color-sidecar)/30 p-12 lg:p-20 rounded-[4rem_0_4rem_0]">
            <h3 className="text-3xl font-bold text-(--color-primary) mb-12">Our Journey...</h3>
            <div className="prose prose-xl text-(--color-bronzetone) space-y-10 leading-relaxed italic">
              <p>
                In July 2025, Queen hosted the inaugural Flow in Faith Virtual Summit and put out a call for Christian Yoga Teachers of Color to teach and speak. More than 50 teachers registered, showing just how many of us were out here doing this work.
              </p>
              <p>
                Throughout the summit, it became clear that we needed a community where our voices, faith, and practice could belong together.
              </p>
              <p>
                De and Queen began imagining what that could look like, a space made for us and by us. Soon after, Eboni and Morenike joined the vision, bringing their gifts and leadership to help shape what is now the Flow in Faith Teachers Collective.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
