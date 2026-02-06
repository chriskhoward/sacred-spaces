'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import FilloutSliderButton from '@/components/FilloutSliderButton';

interface HeroButtonsProps {
  primaryText?: string;
  secondaryText?: string;
  primaryUrl?: string;
  secondaryUrl?: string;
}

export default function HeroButtons({
  primaryText = "Join the Collective",
  secondaryText = "Learn More",
  primaryUrl = "/apply",
  secondaryUrl = "/about"
}: HeroButtonsProps) {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center sm:items-stretch">
      {isSignedIn ? (
        <Link
          href="/dashboard"
          className="btn btn-primary shadow-xl hover:shadow-(--color-roti)/30 transition-all"
        >
          Go to Dashboard
        </Link>
      ) : (
        <FilloutSliderButton buttonText={primaryText} variant="hero" className="inline-flex" />
      )}



      <Link
        href={secondaryUrl}
        className={`px-6 py-3 border-2 border-white/30 text-white rounded-full font-bold text-sm hover:bg-white hover:text-(--color-primary) transition-all text-center ${isSignedIn ? 'block' : 'hidden sm:block'}`}
      >
        {secondaryText}
      </Link>
    </div>
  );
}
