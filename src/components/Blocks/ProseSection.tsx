import Link from 'next/link';
import PortableTextOrString from '@/components/summit/PortableTextOrString';
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

interface ProseSectionBlockProps {
  heading?: string;
  paragraphs?: any[];
  style?: 'light' | 'cream' | 'boxed' | 'card';
  alignment?: 'center' | 'left';
  buttonText?: string;
  buttonLink?: string;
  buttonSize?: ButtonSize;
  buttonColor?: ButtonColor;
  buttonAlignment?: ButtonAlignment;
  sectionSpacing?: SectionSpacing;
  sectionBgColor?: string;
  sectionBgImage?: any;
}

const containerNarrow = 'max-w-4xl mx-auto';
const containerWide = 'max-w-6xl mx-auto';

export default function ProseSectionBlock({
  heading,
  paragraphs = [],
  style = 'cream',
  alignment = 'center',
  buttonText,
  buttonLink,
  buttonSize,
  buttonColor,
  buttonAlignment,
  sectionSpacing,
  sectionBgColor,
  sectionBgImage,
}: ProseSectionBlockProps) {
  const alignClass = alignment === 'left' ? 'text-left' : 'text-center';
  const isBoxed = style === 'boxed';
  const isCard = style === 'card';
  const spacingCls = getSectionSpacingClasses(sectionSpacing);
  const bgImageUrl = sectionBgImage ? urlForImage(sectionBgImage).width(1920).url() : undefined;

  if (isBoxed) {
    return (
      <section
        className={`${spacingCls} px-6 sm:px-8 bg-white`}
        style={getSectionBackgroundStyle(sectionBgColor, bgImageUrl)}
      >
        <div className={containerNarrow}>
          <div className="border-2 border-[#C7A254] rounded-2xl p-8 md:p-12 bg-white shadow-sm">
            <div className={`space-y-6 text-base md:text-lg text-gray-800 leading-relaxed ${alignClass}`}>
              {paragraphs.map((paragraph, index) => (
                <PortableTextOrString key={index} value={paragraph} className="" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isCard) {
    return (
      <section
        className={`pt-6 pb-14 md:pb-20 px-6 sm:px-8 bg-gray-50`}
        style={getSectionBackgroundStyle(sectionBgColor, bgImageUrl)}
      >
        <div className={containerWide}>
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md border border-gray-200 flex flex-col items-center text-center max-w-2xl w-full">
              {heading && (
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 leading-snug">
                  {heading}
                </h3>
              )}
              <div className="space-y-4 text-base text-gray-700 leading-relaxed flex-grow mb-8">
                {paragraphs.map((paragraph, index) => (
                  <PortableTextOrString key={index} value={paragraph} className="" />
                ))}
              </div>
              {buttonText && buttonLink && (
                <Link
                  href={buttonLink}
                  className={`w-full py-4 rounded-full font-bold text-base transition-opacity shadow-md text-center ${getButtonColorClasses(buttonColor)}`}
                >
                  {buttonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const bgClass = style === 'cream' ? 'bg-(--color-gallery)' : 'bg-white';

  return (
    <section
      className={`${spacingCls} ${bgClass}`}
      style={getSectionBackgroundStyle(sectionBgColor, bgImageUrl)}
    >
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto ${alignClass}`}>
          {heading && (
            <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-8">
              {heading}
            </h2>
          )}
          <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <PortableTextOrString key={index} value={paragraph} className="" />
            ))}
          </div>
          {buttonText && buttonLink && (
            <div className={`mt-10 ${getButtonAlignClasses(buttonAlignment)}`}>
              <Link
                href={buttonLink}
                className={`inline-block rounded-full font-bold transition-all shadow-xl ${getButtonSizeClasses(buttonSize)} ${getButtonColorClasses(buttonColor)}`}
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
