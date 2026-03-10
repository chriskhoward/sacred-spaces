'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import FilloutSliderButton from '@/components/FilloutSliderButton';
import { getBlockButtonProps, getButtonAlignClasses, type ButtonSize, type ButtonColor, type ButtonAlignment } from '@/components/Blocks/blockHelpers';
import type { PageButtonPreset } from '@/sanity/lib/pageStyles';

interface MediaTextBlockProps {
  badge?: string;
  title?: string;
  body?: any[];
  listItems?: string[];
  image?: any;
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'mission' | 'whether';
  ctaText?: string;
  ctaLink?: string;
  useFillout?: boolean;
  buttonSize?: ButtonSize;
  buttonColor?: ButtonColor;
  buttonAlignment?: ButtonAlignment;
  buttonPreset?: PageButtonPreset;
}

const sectionPad = 'py-14 md:py-20 px-6 sm:px-8';
const containerWide = 'max-w-6xl mx-auto';

export default function MediaTextBlock({
  badge,
  title,
  body,
  listItems,
  image,
  imagePosition = 'left',
  variant = 'default',
  ctaText,
  ctaLink,
  useFillout = false,
  buttonSize,
  buttonColor,
  buttonAlignment,
  buttonPreset,
}: MediaTextBlockProps) {
  const defaultImage =
    variant === 'mission'
      ? '/images/homepage/community-image.png'
      : variant === 'whether'
        ? '/images/homepage/whether-you-are.png'
        : '/assets/images/8.jpg';
  const imageUrl = image?.asset ? urlForImage(image).url() : defaultImage;
  const isRight = imagePosition === 'right';
  const isMission = variant === 'mission';
  const isWhether = variant === 'whether';

  return (
    <section className={`${sectionPad} ${containerWide} bg-white overflow-hidden`}>
      <div className={`flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 ${isRight ? 'lg:flex-row-reverse' : ''}`}>
        <div className={isMission ? 'lg:w-1/2 min-h-[320px]' : 'lg:w-1/2'}>
          <div className={`relative w-full rounded-2xl overflow-hidden shadow-lg ${isMission ? 'aspect-[4/5] max-h-[500px]' : isWhether ? 'aspect-square shadow-xl' : 'h-[500px] lg:h-[650px]'}`}>
            <Image
              src={imageUrl}
              alt={title || 'Media Section'}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className={`lg:w-1/2 flex flex-col justify-center ${isRight ? 'lg:order-1' : ''}`}>
          {badge && <h5 className="text-[#C7A254] font-bold uppercase tracking-[4px] mb-6">{badge}</h5>}
          {title && (
            <h2 className={`font-bold mb-6 leading-tight ${isMission ? 'text-[#C7A254] text-lg md:text-xl' : isWhether ? 'text-3xl md:text-4xl text-[#C7A254]' : 'text-4xl lg:text-5xl text-(--color-primary)'}`}>
              {title}
            </h2>
          )}
          {body && body.length > 0 && (
            <div className="prose prose-lg text-gray-800 space-y-6 mb-6">
              <PortableText value={body} />
            </div>
          )}
          {listItems && listItems.length > 0 && (
            <ul className="list-disc list-outside space-y-2 mb-8 text-gray-800 text-base md:text-lg leading-relaxed pl-5">
              {listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {ctaText && (
            <div className={`flex flex-col sm:flex-row gap-4 ${getButtonAlignClasses(buttonAlignment) === 'text-right' ? 'justify-end' : getButtonAlignClasses(buttonAlignment) === 'text-left' ? 'justify-start' : ''}`}>
              {useFillout ? (
                <FilloutSliderButton buttonText={ctaText} variant="hero" className="inline-block" />
              ) : ctaLink ? (
                <Link
                  href={ctaLink}
                  {...getBlockButtonProps({ buttonSize, buttonColor, buttonPreset })}
                >
                  {ctaText}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
