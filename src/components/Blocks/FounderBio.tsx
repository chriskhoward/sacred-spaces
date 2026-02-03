import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

interface FounderBioBlockProps {
  badge?: string;
  name?: string;
  title?: string;
  bio?: any[];
  image?: any;
  closingText?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function FounderBioBlock({
  badge,
  name,
  title,
  bio,
  image,
  closingText,
  buttonText,
  buttonLink
}: FounderBioBlockProps) {
  const imageUrl = image?.asset ? urlForImage(image).url() : '/assets/images/team/placeholder.png';

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {badge && (
            <h5 className="text-(--color-roti) font-bold uppercase tracking-[4px] mb-6 text-center">
              {badge}
            </h5>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] lg:h-[600px] rounded-[5rem_0_5rem_0] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
              <Image
                src={imageUrl}
                alt={name || 'Founder'}
                fill
                className="object-cover"
              />
            </div>
            <div>
              {name && (
                <h2 className="text-3xl lg:text-4xl font-bold text-(--color-primary) mb-2">
                  {name}
                </h2>
              )}
              {title && (
                <p className="text-(--color-roti) font-semibold text-lg mb-8">
                  {title}
                </p>
              )}
              {bio && (
                <div className="prose prose-lg text-gray-700 mb-8">
                  <PortableText value={bio} />
                </div>
              )}
              {closingText && (
                <p className="text-xl font-semibold text-(--color-primary) mb-8 italic">
                  {closingText}
                </p>
              )}
              {buttonText && buttonLink && (
                <Link
                  href={buttonLink}
                  className="inline-block px-10 py-5 bg-(--color-primary) text-white rounded-full font-bold text-lg hover:bg-(--color-roti) transition-all shadow-xl"
                >
                  {buttonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
