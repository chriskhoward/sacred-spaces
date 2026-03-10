import Link from 'next/link';
import { Check } from 'lucide-react';
import PortableTextOrString from '@/components/summit/PortableTextOrString';
import { urlForImage } from '@/sanity/lib/image';
import {
  getBlockButtonProps,
  getButtonAlignClasses,
  getSectionSpacingClasses,
  getSectionBackgroundStyle,
  type ButtonSize,
  type ButtonColor,
  type ButtonAlignment,
  type SectionSpacing,
} from './blockHelpers';
import type { PageButtonPreset } from '@/sanity/lib/pageStyles';

interface ChecklistBlockProps {
  heading?: string;
  items?: any[];
  closingText?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonSize?: ButtonSize;
  buttonColor?: ButtonColor;
  buttonAlignment?: ButtonAlignment;
  buttonPreset?: PageButtonPreset;
  sectionSpacing?: SectionSpacing;
  sectionBgColor?: string;
  sectionBgImage?: any;
}

export default function ChecklistBlock({
  heading,
  items = [],
  closingText,
  buttonText,
  buttonLink,
  buttonSize,
  buttonColor,
  buttonAlignment,
  buttonPreset,
  sectionSpacing,
  sectionBgColor,
  sectionBgImage,
}: ChecklistBlockProps) {
  const spacingCls = getSectionSpacingClasses(sectionSpacing);
  const bgImageUrl = sectionBgImage ? urlForImage(sectionBgImage).width(1920).url() : undefined;

  return (
    <section
      className={`${spacingCls} bg-white`}
      style={getSectionBackgroundStyle(sectionBgColor, bgImageUrl)}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {heading && (
            <h3 className="text-2xl lg:text-3xl font-bold text-(--color-primary) mb-10 text-center">
              {heading}
            </h3>
          )}
          <ul className="space-y-5">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-4 bg-(--color-gallery) p-5 rounded-2xl">
                <span className="w-8 h-8 bg-(--color-roti) text-white rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </span>
                <PortableTextOrString value={item} className="text-lg text-gray-700 leading-relaxed pt-0.5" />
              </li>
            ))}
          </ul>
          {closingText && (
            <p className="text-xl font-semibold text-(--color-primary) mt-10 text-center">
              {closingText}
            </p>
          )}
          {buttonText && buttonLink && (
            <div className={`mt-8 ${getButtonAlignClasses(buttonAlignment)}`}>
              <Link
                href={buttonLink}
                {...getBlockButtonProps({ buttonSize, buttonColor, buttonPreset })}
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
