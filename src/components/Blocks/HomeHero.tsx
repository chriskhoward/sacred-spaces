'use client';

import Image from 'next/image';
import Link from 'next/link';
import FilloutSliderButton from '@/components/FilloutSliderButton';
import { urlForImage } from '@/sanity/lib/image';

const sectionPad = 'pt-32 md:pt-40 lg:pt-44 pb-14 md:pb-20 px-6 sm:px-8';
const containerWide = 'max-w-6xl mx-auto';

interface HomeHeroBlockProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  logoImage?: { asset?: unknown };
}

export default function HomeHeroBlock({
  badge = 'Flow in Faith',
  title = 'A Christ-centered wellness ecosystem rooted in embodiment, rest, and community.',
  subtitle = "Here, faith is embodied. Here, rest is sacred. Here, you don't have to choose between your calling, your culture, and your wholeness.",
  primaryButtonText = 'Join the Teachers Collective',
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  logoImage,
}: HomeHeroBlockProps) {
  const logoUrl = logoImage?.asset ? urlForImage(logoImage).url() : '/assets/images/tc_logo.png';

  return (
    <section className={`bg-white ${sectionPad} ${containerWide}`}>
      <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
        <div className="md:w-[55%] text-left">
          {badge && (
            <span className="inline-block py-2 px-6 rounded-full bg-(--color-roti)/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-(--color-roti)/20 uppercase">
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold text-[#413356] mb-6 leading-[1.15] tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl font-medium mb-8">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {primaryButtonText && (
              primaryButtonLink ? (
                <Link
                  href={primaryButtonLink}
                  className="inline-block py-3 px-6 bg-[#C7A254] text-white rounded-full font-bold text-sm hover:opacity-95 transition-opacity shadow-md"
                >
                  {primaryButtonText}
                </Link>
              ) : (
                <FilloutSliderButton buttonText={primaryButtonText} variant="hero" className="inline-block" />
              )
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <Link
                href={secondaryButtonLink}
                className="inline-block py-3 px-6 border-2 border-[#413356] text-[#413356] rounded-full font-bold text-sm hover:bg-[#413356] hover:text-white transition-colors"
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
        <div className="md:w-[45%] flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px]">
            <Image
              src={logoUrl}
              alt="Flow in Faith Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
