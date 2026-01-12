'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface HeroButtonsProps {
  primaryText?: string;
  secondaryText?: string;
}

export default function HeroButtons({ primaryText = "Join the Collective", secondaryText = "Learn More" }: HeroButtonsProps) {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
      {isSignedIn ? (
        <Link 
          href="/dashboard" 
          className="btn btn-primary px-10 py-5 text-lg shadow-xl hover:shadow-(--color-roti)/30 transition-all"
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link 
          href="/apply" 
          className="btn btn-primary px-10 py-5 text-lg shadow-xl hover:shadow-(--color-roti)/30 transition-all bg-(--color-roti) border-(--color-roti) hover:bg-white hover:text-(--color-roti)"
        >
          {primaryText}
        </Link>
      )}
      


      <Link 
        href="/about" 
        className={`px-10 py-5 border-2 border-white/30 text-white rounded-[2rem_0_2rem_0] font-bold hover:bg-white hover:text-(--color-primary) transition-all text-center text-lg ${isSignedIn ? 'block' : 'hidden sm:block'}`}
      >
        {secondaryText}
      </Link>
    </div>
  );
}
