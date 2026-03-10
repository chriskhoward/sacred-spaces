'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import FilloutSliderButton from '@/components/FilloutSliderButton';
import { getBlockButtonProps, getButtonSizeClasses, getButtonColorClasses, getButtonAlignClasses, type ButtonSize, type ButtonColor, type ButtonAlignment } from '@/components/Blocks/blockHelpers';
import type { PageButtonPreset } from '@/sanity/lib/pageStyles';

interface HeroButtonsProps {
  primaryText?: string;
  secondaryText?: string;
  primaryUrl?: string;
  secondaryUrl?: string;
  buttonSize?: ButtonSize;
  buttonColor?: ButtonColor;
  buttonAlignment?: ButtonAlignment;
  buttonPreset?: PageButtonPreset;
}

export default function HeroButtons({
  primaryText = "Join the Collective",
  secondaryText = "Learn More",
  primaryUrl = "/apply",
  secondaryUrl = "/about",
  buttonSize,
  buttonColor,
  buttonAlignment,
  buttonPreset,
}: HeroButtonsProps) {
  const { isSignedIn } = useUser();
  const primaryBtn = getBlockButtonProps({ buttonSize, buttonColor, buttonPreset, onDarkBg: true });
  const sizeClasses = getButtonSizeClasses(buttonPreset?.size ?? buttonSize);
  const alignClasses = getButtonAlignClasses(buttonAlignment);

  return (
    <div className={`flex flex-col sm:flex-row gap-6 items-center sm:items-stretch ${alignClasses === 'text-left' ? 'justify-start' : alignClasses === 'text-right' ? 'justify-end' : 'justify-center lg:justify-start'}`}>
      {isSignedIn ? (
        <Link
          href="/dashboard"
          {...(buttonPreset ? { className: primaryBtn.className, style: primaryBtn.style } : { className: `${sizeClasses} ${getButtonColorClasses(buttonColor, true)} rounded-full font-bold shadow-xl hover:shadow-(--color-roti)/30 transition-all` })}
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
