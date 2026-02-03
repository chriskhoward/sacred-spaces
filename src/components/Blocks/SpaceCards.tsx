import Link from 'next/link';

interface SpaceCard {
  title?: string;
  badge?: string;
  description?: string;
  bulletPoints?: string[];
  closingText?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonStyle?: 'primary' | 'secondary';
}

interface SpaceCardsBlockProps {
  heading?: string;
  subheading?: string;
  description?: string;
  cards?: SpaceCard[];
}

export default function SpaceCardsBlock({
  heading,
  subheading,
  description,
  cards = []
}: SpaceCardsBlockProps) {
  return (
    <section className="py-24 bg-(--color-gallery)">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {heading && (
            <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-6">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-xl text-gray-700 mb-8">
              {subheading}
            </p>
          )}
          {description && (
            <p className="text-lg text-gray-600">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-[3rem_0_3rem_0] shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col h-full border-2 border-transparent hover:border-(--color-sidecar) transition-all"
            >
              {card.title && (
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">
                  {card.title}
                </h3>
              )}
              {card.badge && (
                <p className="text-(--color-roti) uppercase tracking-wider font-bold mb-6 text-sm">
                  {card.badge}
                </p>
              )}
              {card.description && (
                <p className="text-gray-700 mb-6 flex-grow whitespace-pre-line">
                  {card.description}
                </p>
              )}
              {card.bulletPoints && card.bulletPoints.length > 0 && (
                <ul className="space-y-2 mb-8 text-gray-600 text-sm">
                  {card.bulletPoints.map((point, idx) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>
              )}
              {card.closingText && (
                <p className="text-gray-800 italic mb-8 font-medium">
                  {card.closingText}
                </p>
              )}
              {card.buttonText && card.buttonLink && (
                <Link
                  href={card.buttonLink}
                  className={`btn w-full text-center ${
                    card.buttonStyle === 'secondary'
                      ? 'btn-primary bg-(--color-martinique) hover:bg-(--color-primary)'
                      : 'btn-primary'
                  }`}
                >
                  {card.buttonText}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
