import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
  image?: { asset?: unknown };
}

interface FeatureGridBlockProps {
  heading?: string;
  subheading?: string;
  items?: FeatureItem[];
  style?: 'light' | 'cream' | 'dark';
}

export default function FeatureGridBlock({
  heading,
  subheading,
  items = [],
  style = 'light'
}: FeatureGridBlockProps) {
  const bgClass = style === 'cream' ? 'bg-(--color-gallery)' : style === 'dark' ? 'bg-[#413356]' : 'bg-white';
  const hasImages = items.some((i) => i.image?.asset);
  const colClass = items.length === 3 && hasImages
    ? 'grid-cols-1 md:grid-cols-3'
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  const headingColor = style === 'dark' ? 'text-[#C7A254]' : 'text-(--color-primary)';
  const subheadingColor = style === 'dark' ? 'text-white' : 'text-gray-600';

  return (
    <section className={`py-20 lg:py-28 ${bgClass}`}>
      <div className="container mx-auto px-4">
        {(heading || subheading) && (
          <div className="text-center mb-16">
            {heading && (
              <h2 className={`text-4xl lg:text-5xl font-bold ${headingColor} mb-4`}>
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={`text-xl max-w-3xl mx-auto ${subheadingColor}`}>
                {subheading}
              </p>
            )}
          </div>
        )}
        <div className={`grid ${colClass} gap-8`}>
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-1 flex flex-col"
            >
              {item.image?.asset ? (
                <div className="relative w-full aspect-square max-w-[220px] mx-auto rounded-lg overflow-hidden border-4 border-white shadow-md mb-6 flex-shrink-0">
                  <Image
                    src={urlForImage(item.image).url()}
                    alt={item.title || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : item.icon ? (
                <div className="w-14 h-14 bg-(--color-sidecar) text-2xl flex items-center justify-center rounded-2xl mb-6">
                  {item.icon}
                </div>
              ) : null}
              <h3 className="text-xl font-bold text-(--color-primary) mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
