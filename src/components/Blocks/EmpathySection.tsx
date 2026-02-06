import Link from 'next/link';

interface EmpathySectionBlockProps {
  heading?: string;
  items?: string[];
  style?: 'light' | 'dark';
  buttonText?: string;
  buttonLink?: string;
}

export default function EmpathySectionBlock({
  heading,
  items = [],
  style = 'light',
  buttonText,
  buttonLink
}: EmpathySectionBlockProps) {
  const isDark = style === 'dark';

  return (
    <section className={`py-20 lg:py-24 ${isDark ? 'bg-(--color-primary)' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {heading && (
            <h2 className={`text-3xl lg:text-4xl font-bold mb-10 ${isDark ? 'text-white' : 'text-(--color-primary)'}`}>
              {heading}
            </h2>
          )}
          <ul className="space-y-6">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className={`text-2xl shrink-0 mt-1 ${isDark ? 'text-(--color-roti)' : 'text-(--color-roti)'}`}>
                  &#10003;
                </span>
                <p className={`text-xl leading-relaxed ${isDark ? 'text-white/90' : 'text-gray-700'}`}>
                  {item}
                </p>
              </li>
            ))}
          </ul>
          {buttonText && buttonLink && (
            <div className="mt-12 text-center">
              <Link
                href={buttonLink}
                className={`inline-block px-6 py-3 rounded-full font-bold text-sm transition-all shadow-xl ${
                  isDark
                    ? 'bg-(--color-roti) text-white hover:bg-white hover:text-(--color-primary)'
                    : 'bg-(--color-primary) text-white hover:bg-(--color-roti)'
                }`}
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
