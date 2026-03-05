/**
 * Site Settings fetch and types.
 * Used by layout (metadata, footer), Navbar (logo), 404, sign-in/sign-up pages.
 */

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  title,
  description,
  logo,
  favicon,
  contactEmail,
  secondaryEmail,
  websiteUrl,
  socialLinks{
    instagram,
    facebook,
    youtube,
    tiktok
  },
  tagline,
  copyrightText,
  footerQuickLinksLabel,
  footerConnectLabel,
  footerSocialLabel,
  memberLoginLabel,
  dashboardLabel,
  signInHeading,
  signInSubtext,
  signUpHeading,
  signUpSubtext,
  notFoundHeading,
  notFoundMessage,
  notFoundQuote,
  notFoundQuoteAttribution,
  notFoundHomeLabel,
  notFoundSecondaryLabel,
  notFoundSecondaryLink
}`;

type SanityImageRef = { asset?: { _ref?: string } } | null;

export type SiteSettings = {
  title?: string | null;
  description?: string | null;
  logo?: SanityImageRef;
  favicon?: SanityImageRef;
  contactEmail?: string | null;
  secondaryEmail?: string | null;
  websiteUrl?: string | null;
  socialLinks?: {
    instagram?: string | null;
    facebook?: string | null;
    youtube?: string | null;
    tiktok?: string | null;
  } | null;
  tagline?: string | null;
  copyrightText?: string | null;
  footerQuickLinksLabel?: string | null;
  footerConnectLabel?: string | null;
  footerSocialLabel?: string | null;
  memberLoginLabel?: string | null;
  dashboardLabel?: string | null;
  signInHeading?: string | null;
  signInSubtext?: string | null;
  signUpHeading?: string | null;
  signUpSubtext?: string | null;
  notFoundHeading?: string | null;
  notFoundMessage?: string | null;
  notFoundQuote?: string | null;
  notFoundQuoteAttribution?: string | null;
  notFoundHomeLabel?: string | null;
  notFoundSecondaryLabel?: string | null;
  notFoundSecondaryLink?: string | null;
};

export { SITE_SETTINGS_QUERY };
