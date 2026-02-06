interface PillarItem {
  title: string;
  description: string;
  icon: string;
}

interface PillarsBlockProps {
  heading?: string;
  subheading?: string;
  description?: string;
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
      icon: '🤝'
    },
    { 
      title: 'Visibility', 
      description: 'Access opportunities that highlight your gifts and amplify your voice in meaningful and aligned spaces.',
      icon: '✨'
    },
    { 
      title: 'Connection', 
      description: 'Build relationships that spark creativity, deepen your teaching, and reaffirm you don’t have to grow alone.',
      icon: '🔗'
    },
    { 
      title: 'Lead Boldly', 
      description: 'Move with confidence into the spaces God is guiding you—held by a community that affirms your presence and purpose.',
      icon: '🛡️'
    }
  ]
}: PillarsBlockProps) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 lg:mb-24">
          <h5 className="text-(--color-roti) uppercase tracking-[4px] font-bold mb-4">{heading}</h5>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-(--color-primary)">{subheading}</h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {items.map((pillar, index) => (
            <div key={index} className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all group border border-gray-100 hover:-translate-y-2">
              <div className="w-16 h-16 bg-(--color-sidecar) text-3xl flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform mx-auto sm:mx-0">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-(--color-primary)">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
