import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

interface MediaTextBlockProps {
  badge?: string;
  title?: string;
  body?: any[];
  image?: any;
  imagePosition?: 'left' | 'right';
}

export default function MediaTextBlock({
  badge,
  title,
  body,
  image,
  imagePosition = 'left'
}: MediaTextBlockProps) {
  const imageUrl = image?.asset ? urlForImage(image).url() : '/assets/images/8.jpg';
  const isRight = imagePosition === 'right';

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${isRight ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`relative h-[500px] lg:h-[650px] rounded-[5rem_0_5rem_0] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] ${isRight ? 'lg:order-2' : ''}`}>
            <Image 
              src={imageUrl} 
              alt={title || "Media Section"} 
              fill
              className="object-cover"
            />
          </div>
          <div className={isRight ? 'lg:order-1' : ''}>
            {badge && <h5 className="text-(--color-roti) font-bold uppercase tracking-[4px] mb-6">{badge}</h5>}
            {title && (
              <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-(--color-primary) leading-tight">
                {title}
              </h2>
            )}
            {body && (
              <div className="prose prose-xl text-gray-700 space-y-8">
                <PortableText value={body} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
