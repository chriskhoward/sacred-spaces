import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/image';
import {
  getSectionSpacingClasses,
  getSectionBackgroundStyle,
  type SectionSpacing,
} from './blockHelpers';

interface RichTextBlockProps {
  heading?: string;
  body?: any[];
  sectionSpacing?: SectionSpacing;
  sectionBgColor?: string;
  sectionBgImage?: any;
}

export default function RichTextBlock({
  heading,
  body = [],
  sectionSpacing,
  sectionBgColor,
  sectionBgImage,
}: RichTextBlockProps) {
  const spacingCls = getSectionSpacingClasses(sectionSpacing);
  const bgImageUrl = sectionBgImage ? urlForImage(sectionBgImage).width(1920).url() : undefined;

  return (
    <section
      className={spacingCls}
      style={getSectionBackgroundStyle(sectionBgColor, bgImageUrl)}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {heading && (
          <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-(--color-primary) leading-tight text-center">
            {heading}
          </h2>
        )}
        <div className="prose prose-xl text-gray-700 mx-auto">
          <PortableText value={body} />
        </div>
      </div>
    </section>
  );
}
