'use client';

import { usePathname } from 'next/navigation';
import Footer, { type FooterSocialLinks, type FooterNavItem } from './Footer';
import SummitFooter from './summit/SummitFooter';

type FooterWrapperProps = {
  logoUrl?: string | null;
  socialLinks?: FooterSocialLinks | null;
  contactEmail?: string | null;
  secondaryEmail?: string | null;
  websiteUrl?: string | null;
  tagline?: any;
  copyrightText?: string | null;
  quickLinksLabel?: string | null;
  connectLabel?: string | null;
  socialLabel?: string | null;
  memberLoginLabel?: string | null;
  quickLinks?: FooterNavItem[] | null;
  summitLogoUrl?: string | null;
  summitTermsLabel?: string;
  summitPrivacyLabel?: string;
  summitContactLabel?: string;
  summitCopyrightBrand?: string;
};

export default function FooterWrapper({
  logoUrl,
  socialLinks,
  contactEmail,
  secondaryEmail,
  websiteUrl,
  tagline,
  copyrightText,
  quickLinksLabel,
  connectLabel,
  socialLabel,
  memberLoginLabel,
  quickLinks,
  summitLogoUrl,
  summitTermsLabel,
  summitPrivacyLabel,
  summitContactLabel,
  summitCopyrightBrand,
}: FooterWrapperProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/studio')) {
    return null;
  }

  const isSummit = pathname.startsWith('/summit');

  if (isSummit) {
    return (
      <SummitFooter
        logoUrl={summitLogoUrl || logoUrl}
        contactEmail={contactEmail}
        termsLabel={summitTermsLabel}
        privacyLabel={summitPrivacyLabel}
        contactLabel={summitContactLabel}
        copyrightBrand={summitCopyrightBrand}
      />
    );
  }

  return (
    <Footer
      logoUrl={logoUrl}
      socialLinks={socialLinks}
      contactEmail={contactEmail}
      secondaryEmail={secondaryEmail}
      websiteUrl={websiteUrl}
      tagline={tagline}
      copyrightText={copyrightText}
      quickLinksLabel={quickLinksLabel}
      connectLabel={connectLabel}
      socialLabel={socialLabel}
      memberLoginLabel={memberLoginLabel}
      quickLinks={quickLinks}
    />
  );
}
