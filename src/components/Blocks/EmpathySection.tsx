import Link from 'next/link';
import { Check } from 'lucide-react';
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

interface EmpathySectionBlockProps {
  heading?: string;
  items?: any[];
  style?: 'light' | 'dark';
  buttonText?: string;
  buttonLink?: string;
  buttonSize?: ButtonSize;
  buttonColor?: ButtonColor;
  sectionSpacing?: SectionSpacing;
  sectionBgColor?: string;
  sectionBgImage?: any;
}

export default function EmpathySectionBlock({
  heading,
  items = [],
  style = 'light',
  buttonText,
  buttonLink,
  buttonSize,
  buttonColor,
  sectionSpacing,
  sectionBgColor,
  sectionBgImage,
}: EmpathySectionBlockProps) {
  const isDark = style === 'dark';
  const spacingCls = getSectionSpacingClasses(sectionSpacing);
  const bgImageUrl = sectionBgImage ? urlForImage(sectionBgImage).width(1920).url() : undefined;

  return (
    <section
      className={`${spacingCls} ${isDark ? 'bg-(--color-primary)' : 'bg-white'}`}
      style={getSectionBackgroundStyle(sectionBgColor, bgImageUrl)}
    >
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
                <Check className="w-6 h-6 shrink-0 mt-1 text-(--color-roti)" />
                <PortableTextOrString value={item} className={`text-xl leading-relaxed ${isDark ? 'text-white/90' : 'text-gray-700'}`} />
              </li>
            ))}
          </ul>
          {buttonText && buttonLink && (
            <div className="mt-12 text-center">
              <Link
                href={buttonLink}
                className={`inline-block rounded-full font-bold transition-all shadow-xl ${getButtonSizeClasses(buttonSize)} ${getButtonColorClasses(buttonColor, isDark)}`}
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
