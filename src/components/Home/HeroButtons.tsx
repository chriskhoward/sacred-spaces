'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import FilloutSliderButton from '@/components/FilloutSliderButton';
import { getButtonSizeClasses, getButtonColorClasses, getButtonAlignClasses, type ButtonSize, type ButtonColor, type ButtonAlignment } from '@/components/Blocks/blockHelpers';

interface HeroButtonsProps {
  primaryText?: string;
  secondaryText?: string;
  primaryUrl?: string;
  secondaryUrl?: string;
  buttonSize?: ButtonSize;
  buttonColor?: ButtonColor;
  buttonAlignment?: ButtonAlignment;
}

export default function HeroButtons({
  primaryText = "Join the Collective",
  secondaryText = "Learn More",
  primaryUrl = "/apply",
  secondaryUrl = "/about",
  buttonSize,
  buttonColor,
  buttonAlignment,
}: HeroButtonsProps) {
  const { isSignedIn } = useUser();
  const sizeClasses = getButtonSizeClasses(buttonSize);
  const colorClasses = getButtonColorClasses(buttonColor, true);
  const alignClasses = getButtonAlignClasses(buttonAlignment);

  return (
    <div className={`flex flex-col sm:flex-row gap-6 items-center sm:items-stretch ${alignClasses === 'text-left' ? 'justify-start' : alignClasses === 'text-right' ? 'justify-end' : 'justify-center lg:justify-start'}`}>
      {isSignedIn ? (
        <Link
          href="/dashboard"
          className={`${sizeClasses} ${colorClasses} rounded-full font-bold shadow-xl hover:shadow-(--color-roti)/30 transition-all`}
        >
          Go to Dashboard
        </Link>
      ) : (
        <FilloutSliderButton buttonText={primaryText} variant="hero" className="inline-flex" />
      )}

      <Link
        href={secondaryUrl}
        className={`${sizeClasses} border-2 border-white/30 text-white rounded-full font-bold hover:bg-white hover:text-(--color-primary) transition-all text-center ${isSignedIn ? 'block' : 'hidden sm:block'}`}
      >
        {secondaryText}
      </Link>
    </div>
  );
}
