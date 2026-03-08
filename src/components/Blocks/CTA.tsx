import Link from 'next/link';
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

interface CTABlockProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  useFillout?: boolean;
  buttonSize?: ButtonSize;
  buttonColor?: ButtonColor;
  buttonAlignment?: ButtonAlignment;
  sectionSpacing?: SectionSpacing;
  sectionBgColor?: string;
  sectionBgImage?: any;
}

export default function CTABlock({
  title = "Ready to Begin Your Journey?",
  description = "Join a community that honors your practice, your faith, and your culture.",
  buttonText = "Join the Collective",
  buttonLink = "/sign-up",
  useFillout: useFilloutProp,
  buttonSize,
  buttonColor,
  buttonAlignment,
  sectionSpacing,
  sectionBgColor,
  sectionBgImage,
}: CTABlockProps) {
  const useFillout = useFilloutProp ?? /join the collective/i.test(buttonText ?? '');
  const spacingCls = getSectionSpacingClasses(sectionSpacing);
  const hasButton = useFillout || (buttonText && buttonLink);
  const bgImageUrl = sectionBgImage ? urlForImage(sectionBgImage).width(1920).url() : undefined;

  return (
    <section
      className={`${spacingCls} bg-(--color-primary) relative overflow-hidden`}
      style={getSectionBackgroundStyle(sectionBgColor, bgImageUrl)}
    >
      <div className="absolute inset-0 bg-[url('/assets/images/banner_section_background.jpg')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">{title}</h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        {hasButton && (
          <div className={getButtonAlignClasses(buttonAlignment)}>
            {useFillout ? (
              <FilloutSliderButton buttonText={buttonText} variant="cta" className="inline-flex justify-center" />
            ) : buttonLink ? (
              <Link
                href={buttonLink}
                className={`inline-block rounded-full font-bold transition-all shadow-2xl ${getButtonSizeClasses(buttonSize)} ${getButtonColorClasses(buttonColor, true)}`}
              >
                {buttonText}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
