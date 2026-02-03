import Link from 'next/link';

interface TextCtaBlockProps {
  heading?: string;
  body?: string;
  buttonText?: string;
  buttonLink?: string;
  style?: 'light' | 'dark' | 'cream';
  size?: 'normal' | 'large';
}

export default function TextCtaBlock({
  heading,
  body,
  buttonText,
  buttonLink,
  style = 'light',
  size = 'normal'
}: TextCtaBlockProps) {
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-(--color-primary)',
    cream: 'bg-(--color-gallery)'
  }[style];

  const headingClass = style === 'dark' ? 'text-white' : 'text-(--color-primary)';
  const bodyClass = style === 'dark' ? 'text-white/80' : 'text-gray-700';

  const headingSize = size === 'large'
    ? 'text-3xl lg:text-5xl'
    : 'text-2xl lg:text-4xl';

  const bodySize = size === 'large'
    ? 'text-xl lg:text-2xl'
    : 'text-lg lg:text-xl';

  return (
    <section className={`py-20 lg:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {heading && (
            <h2 className={`${headingSize} font-bold ${headingClass} mb-6 leading-tight`}>
              {heading}
            </h2>
          )}
          {body && (
            <p className={`${bodySize} ${bodyClass} mb-10 leading-relaxed`}>
              {body}
            </p>
          )}
          {buttonText && buttonLink && (
            <Link
              href={buttonLink}
              className={`inline-block px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl ${
                style === 'dark'
                  ? 'bg-(--color-roti) text-white hover:bg-white hover:text-(--color-primary)'
                  : 'bg-(--color-primary) text-white hover:bg-(--color-roti)'
              }`}
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
