'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function FooterLinks() {
  const { isSignedIn } = useUser();

  return (
    <ul className="list-none p-0 m-0 space-y-4">
      <li><Link href="/" className="hover:text-(--color-roti) transition-colors">Home</Link></li>
      <li><Link href="/about" className="hover:text-(--color-roti) transition-colors">About Us</Link></li>
      <li><Link href="/teacher-collective" className="hover:text-(--color-roti) transition-colors">Teacher Collective</Link></li>
      <li><Link href="/directory" className="hover:text-(--color-roti) transition-colors">Directory</Link></li>
      <li><Link href="/video-library" className="hover:text-(--color-roti) transition-colors">Video Library</Link></li>
      <li className="pt-2 flex flex-col gap-3">
        {isSignedIn ? (
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-(--color-roti) text-(--color-primary) rounded-full font-bold text-sm hover:bg-white transition-colors text-center"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/sign-up"
              className="inline-block px-6 py-3 border-2 border-white text-white rounded-full font-bold text-sm hover:bg-white hover:text-(--color-primary) transition-colors text-center"
            >
              Member Login
            </Link>
            <Link
              href="/apply"
              className="inline-block px-6 py-3 bg-(--color-roti) text-(--color-primary) rounded-full font-bold text-sm hover:bg-white transition-colors text-center"
            >
              Join Now
            </Link>
          </>
        )}
      </li>
    </ul>
  );
}
