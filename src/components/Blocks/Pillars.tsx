import { Handshake, Sparkles, Link2, Shield } from 'lucide-react';
import { type ReactNode } from 'react';
import PortableTextOrString from '@/components/summit/PortableTextOrString';

interface PillarItem {
  title: string;
  description: any;
  icon: ReactNode;
}

interface PillarsBlockProps {
  heading?: string;
  subheading?: string;
  description?: any;
  items?: PillarItem[];
}

export default function PillarsBlock({
  heading = "How You Evolve",
  subheading = "Pillars of Transformation",
  description = "We provide a culturally-grounded home where your faith and practice can flourish together.",
  items = [
    {
      title: 'Belonging',
      description: 'Feel seen, supported, and connected inside a community that understands your faith, culture, and calling.',
      icon: <Handshake className="w-8 h-8 text-(--color-roti)" />
    },
    {
      title: 'Visibility',
      description: 'Access opportunities that highlight your gifts and amplify your voice in meaningful and aligned spaces.',
      icon: <Sparkles className="w-8 h-8 text-(--color-roti)" />
    },
    {
      title: 'Connection',
      description: 'Build relationships that spark creativity, deepen your teaching, and reaffirm you don\'t have to grow alone.',
      icon: <Link2 className="w-8 h-8 text-(--color-roti)" />
    },
    {
      title: 'Lead Boldly',
      description: 'Move with confidence into the spaces God is guiding you\u2014held by a community that affirms your presence and purpose.',
      icon: <Shield className="w-8 h-8 text-(--color-roti)" />
    }
  ]
}: PillarsBlockProps) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 lg:mb-24">
          <h5 className="text-(--color-roti) uppercase tracking-[4px] font-bold mb-4">{heading}</h5>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-(--color-primary)">{subheading}</h2>
          <PortableTextOrString value={description} className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {items.map((pillar, index) => (
            <div key={index} className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all group border border-gray-100 hover:-translate-y-2">
              <div className="w-16 h-16 bg-(--color-sidecar) flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform mx-auto sm:mx-0">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-(--color-primary)">{pillar.title}</h3>
              <PortableTextOrString value={pillar.description} className="text-gray-600 leading-relaxed" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
