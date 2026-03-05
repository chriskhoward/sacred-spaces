'use client';

import { usePathname } from 'next/navigation';
import Footer, { type FooterSocialLinks } from './Footer';
import SummitFooter from './summit/SummitFooter';

type FooterWrapperProps = {
  logoUrl?: string | null;
  socialLinks?: FooterSocialLinks | null;
  contactEmail?: string | null;
  summitLogoUrl?: string | null;
};

export default function FooterWrapper({
  logoUrl,
  socialLinks,
  contactEmail,
  summitLogoUrl,
}: FooterWrapperProps) {
  const pathname = usePathname();
  const isSummit = pathname.startsWith('/summit');

  if (isSummit) {
    return (
      <SummitFooter
        logoUrl={summitLogoUrl || logoUrl}
        contactEmail={contactEmail}
      />
    );
  }

  return (
    <Footer
      logoUrl={logoUrl}
      socialLinks={socialLinks}
      contactEmail={contactEmail}
    />
  );
}
