/**
 * Founder Page fetch and types.
 */

import type { PortableTextBlock } from '@portabletext/types'

export type FounderCredential = {
  title?: string;
  description?: string;
  icon?: string;
};

export type FounderPage = {
  _id: string;
  name: string;
  slug: { current: string };
  role?: string | null;
  organization?: string | null;
  tagline?: string | null;
  photo?: { asset?: { _ref?: string } } | null;
  bannerImage?: { asset?: { _ref?: string } } | null;
  aboutHeading?: string | null;
  bio?: PortableTextBlock[] | null;
  credentialsHeading?: string | null;
  credentials?: FounderCredential[] | null;
  philosophyHeading?: string | null;
  philosophyQuote?: string | null;
  ctaHeading?: string | null;
  ctaText?: string | null;
  ctaButtonText?: string | null;
  ctaSecondaryText?: string | null;
  ctaSecondaryLink?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export const FOUNDER_PAGE_BY_SLUG_QUERY = `*[_type == "founderPage" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  role,
  organization,
  tagline,
  photo,
  bannerImage,
  aboutHeading,
  bio,
  credentialsHeading,
  credentials[]{
    title,
    description,
    icon
  },
  philosophyHeading,
  philosophyQuote,
  ctaHeading,
  ctaText,
  ctaButtonText,
  ctaSecondaryText,
  ctaSecondaryLink,
  metaTitle,
  metaDescription
}`;
