import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import PortableTextOrString from '@/components/summit/PortableTextOrString';

interface FeatureItem {
  title: string;
  description: any;
  icon?: string;
  image?: { asset?: unknown };
  imageUrl?: string;
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
  const colClass = (style === 'dark' && items.length === 3) || (items.length === 3 && hasImages)
    ? 'grid-cols-1 md:grid-cols-3'
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  const headingColor = style === 'dark' ? 'text-[#C7A254]' : 'text-(--color-primary)';
  const subheadingColor = style === 'dark' ? 'text-white' : 'text-gray-600';

  const sectionPadding = style === 'dark' ? 'pb-14 md:pb-20 pt-6 px-6 sm:px-8' : 'py-20 lg:py-28';
  const containerClass = style === 'dark' ? 'max-w-6xl mx-auto' : 'container mx-auto px-4';
  const itemTitleClass = style === 'dark' ? 'text-[#C7A254] text-xl md:text-2xl font-bold mb-4' : 'text-xl font-bold text-(--color-primary) mb-4';
  const cardClass = style === 'dark'
    ? 'bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col text-left'
    : 'bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-1 flex flex-col';
  const cardBodyClass = style === 'dark' ? 'p-6 md:p-7 flex-grow' : '';
  const imageWrapperClass = style === 'dark' ? 'p-4 md:p-5 flex justify-center bg-white' : '';

  const isDarkGrid = style === 'dark';
  const gridWrapperClass = isDarkGrid ? `max-w-6xl mx-auto grid ${colClass} gap-8 md:gap-10` : containerClass;

  const cardElements = items.map((item, index) => (
          <div key={index} className={cardClass}>
            {item.image?.asset || item.imageUrl ? (
              <div className={imageWrapperClass || undefined}>
                <div className="relative w-full aspect-square max-w-[220px] mx-auto rounded-lg overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                  <Image
                    src={item.imageUrl || urlForImage(item.image).url()}
                    alt={item.title || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ) : null}
            <div className={cardBodyClass || 'p-8'}>
              {!item.image?.asset && !item.imageUrl && item.icon && (
                <div className="w-14 h-14 bg-(--color-sidecar) text-2xl flex items-center justify-center rounded-2xl mb-6">
                  {item.icon}
                </div>
              )}
              <h3 className={itemTitleClass}>{item.title}</h3>
              <PortableTextOrString value={item.description} className="text-gray-800 text-base leading-relaxed flex-grow" />
            </div>
          </div>
        ));

  return (
    <section className={`${sectionPadding} ${bgClass}`}>
      <div className={gridWrapperClass}>
        {(heading || subheading) && (
          <div className={`text-center mb-16 ${isDarkGrid ? 'col-span-full' : ''}`}>
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
        {isDarkGrid ? cardElements : (
          <div className={`grid ${colClass} gap-8 md:gap-10`}>
            {cardElements}
          </div>
        )}
      </div>
    </section>
  );
}
