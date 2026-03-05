'use client';

import Link from 'next/link';
import Image from 'next/image';

type SummitFooterProps = {
  logoUrl?: string | null;
  contactEmail?: string | null;
};

export default function SummitFooter({ logoUrl, contactEmail }: SummitFooterProps) {
  const logo = logoUrl || '/assets/images/tc_logo.png';
  const email = contactEmail || 'info@flowinfaith.com';

  return (
    <footer className="bg-(--color-primary) text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <Link href="/summit/start-here">
            <Image
              src={logo}
              alt="Flow in Faith"
              width={120}
              height={120}
              className="w-20 h-20 object-contain"
              unoptimized={logo.startsWith('http')}
            />
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              href="/terms"
              className="text-white hover:text-(--color-roti) transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className="text-white hover:text-(--color-roti) transition-colors"
            >
              Privacy Policy
            </Link>
            <a
              href={`mailto:${email}`}
              className="text-white hover:text-(--color-roti) transition-colors"
            >
              Contact
            </a>
          </nav>

          <p className="text-xs opacity-60 m-0">
            Copyright {new Date().getFullYear()}, Flow in Faith. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
