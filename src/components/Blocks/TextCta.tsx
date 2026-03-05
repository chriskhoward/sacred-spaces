'use client';

import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import FilloutSliderButton from '@/components/FilloutSliderButton';
import { urlForImage } from '@/sanity/lib/image';
import {
  getButtonSizeClasses,
  getButtonColorClasses,
  getButtonAlignClasses,
  getSectionSpacingClasses,
  getSectionBackgroundStyle,
  type ButtonSize,
  type ButtonColor,
  type ButtonAlignment,
  type SectionSpacing,
} from './blockHelpers';

interface TextCtaBlockProps {
  heading?: string;
  body?: any[] | string;
  buttonText?: string;
  buttonLink?: string;
  useFillout?: boolean;
  style?: 'light' | 'dark' | 'cream';
  size?: 'normal' | 'large';
  buttonSize?: ButtonSize;
  buttonColor?: ButtonColor;
  buttonAlignment?: ButtonAlignment;
  sectionSpacing?: SectionSpacing;
  sectionBgColor?: string;
  sectionBgImage?: any;
}

export default function TextCtaBlock({
  heading,
  body,
  buttonText,
  buttonLink,
  useFillout = false,
  style = 'light',
  size = 'normal',
  buttonSize,
  buttonColor,
  buttonAlignment,
  sectionSpacing,
  sectionBgColor,
  sectionBgImage,
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

  const spacingCls = getSectionSpacingClasses(sectionSpacing);
  const isDark = style === 'dark';
  const hasButton = useFillout || (buttonText && buttonLink);
  const isRichText = Array.isArray(body);
  const bgImageUrl = sectionBgImage ? urlForImage(sectionBgImage).width(1920).url() : undefined;

  return (
    <section
      className={`${spacingCls} ${bgClass}`}
      style={getSectionBackgroundStyle(sectionBgColor, bgImageUrl)}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {heading && (
            <h2 className={`${headingSize} font-bold ${headingClass} mb-6 leading-tight`}>
              {heading}
            </h2>
          )}
          {body && (
            isRichText ? (
              <div className={`${bodySize} ${bodyClass} mb-10 leading-relaxed prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                <PortableText value={body} />
              </div>
            ) : (
              <p className={`${bodySize} ${bodyClass} mb-10 leading-relaxed`}>
                {body}
              </p>
            )
          )}
          {hasButton && (
            <div className={getButtonAlignClasses(buttonAlignment)}>
              {useFillout ? (
                <FilloutSliderButton buttonText={buttonText} variant="cta" className="inline-flex justify-center" />
              ) : buttonLink ? (
                <Link
                  href={buttonLink}
                  className={`inline-block rounded-full font-bold transition-all shadow-xl ${getButtonSizeClasses(buttonSize)} ${getButtonColorClasses(buttonColor, isDark)}`}
                >
                  {buttonText}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
