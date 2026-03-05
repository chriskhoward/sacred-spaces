/**
 * Teacher Collective Page fetch and types.
 */

import type { PortableTextBlock } from '@portabletext/types'

type SanityImageRef = { asset?: { _ref?: string } } | null;

export type TCBenefitCard = {
  image?: SanityImageRef;
  heading?: string;
  description?: string;
};

export type TCPremiumItem = {
  heading?: string;
  description?: string;
  value?: string;
};

export type TCImagineCard = {
  image?: SanityImageRef;
  text?: string;
};

export type TCVisionary = {
  name?: string;
  role?: string;
  photo?: SanityImageRef;
  bio?: PortableTextBlock[] | null;
  link?: string;
};

export type TeacherCollectivePageData = {
  heroBadge?: string | null;
  heroHeading?: string | null;
  heroSubtext?: string | null;
  heroImage?: SanityImageRef;
  heroCtaText?: string | null;
  imagineHeading?: string | null;
  imagineCards?: TCImagineCard[] | null;
  listenHeading?: string | null;
  listenBody?: PortableTextBlock[] | null;
  itsTimeHeading?: string | null;
  youDontHaveToHeading?: string | null;
  youDontHaveToImage?: SanityImageRef;
  youDontHaveToItems?: string[] | null;
  callingHeading?: string | null;
  callingSubtext?: string | null;
  memberBannerImage?: SanityImageRef;
  memberHeading?: string | null;
  memberSubtext?: string | null;
  benefitCards?: TCBenefitCard[] | null;
  premiumHeading?: string | null;
  premiumItems?: TCPremiumItem[] | null;
  membershipHeading?: string | null;
  membershipSubtext?: string | null;
  corePriceMonthly?: string | null;
  corePriceAnnual?: string | null;
  proPriceMonthly?: string | null;
  proPriceAnnual?: string | null;
  itsTimeToHeading?: string | null;
  itsTimeToImage?: SanityImageRef;
  itsTimeToPoints?: string[] | null;
  visionariesHeading?: string | null;
  visionariesSubtext?: string | null;
  visionaries?: TCVisionary[] | null;
  finalCtaHeading?: string | null;
  finalCtaSubtext?: string | null;
  bottomLineImage?: SanityImageRef;
  bottomLineHeading?: string | null;
  bottomLineSubtext?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  filloutId?: string | null;
  itsTimeCtaText?: string | null;
  itsTimeCtaUseFillout?: boolean | null;
  itsTimeCtaLink?: string | null;
  callingCtaText?: string | null;
  callingCtaUseFillout?: boolean | null;
  callingCtaLink?: string | null;
  premiumCtaText?: string | null;
  premiumCtaUseFillout?: boolean | null;
  premiumCtaLink?: string | null;
  coreCtaText?: string | null;
  coreCtaUseFillout?: boolean | null;
  coreCtaLink?: string | null;
  proCtaText?: string | null;
  proCtaUseFillout?: boolean | null;
  proCtaLink?: string | null;
  itsTimeToCtaText?: string | null;
  itsTimeToCtaUseFillout?: boolean | null;
  itsTimeToCtaLink?: string | null;
  finalCtaCtaText?: string | null;
  finalCtaCtaUseFillout?: boolean | null;
  finalCtaCtaLink?: string | null;
  bottomLineCtaText?: string | null;
  bottomLineCtaUseFillout?: boolean | null;
  bottomLineCtaLink?: string | null;
};

export const TC_PAGE_QUERY = `*[_type == "teacherCollectivePage"][0]{
  heroBadge,
  heroHeading,
  heroSubtext,
  heroImage,
  heroCtaText,
  imagineHeading,
  imagineCards[]{ image, text },
  listenHeading,
  listenBody,
  itsTimeHeading,
  youDontHaveToHeading,
  youDontHaveToImage,
  youDontHaveToItems,
  callingHeading,
  callingSubtext,
  memberBannerImage,
  memberHeading,
  memberSubtext,
  benefitCards[]{ image, heading, description },
  premiumHeading,
  premiumItems[]{ heading, description, value },
  membershipHeading,
  membershipSubtext,
  corePriceMonthly,
  corePriceAnnual,
  proPriceMonthly,
  proPriceAnnual,
  itsTimeToHeading,
  itsTimeToImage,
  itsTimeToPoints,
  visionariesHeading,
  visionariesSubtext,
  visionaries[]{ name, role, photo, bio, link },
  finalCtaHeading,
  finalCtaSubtext,
  bottomLineImage,
  bottomLineHeading,
  bottomLineSubtext,
  metaTitle,
  metaDescription,
  filloutId,
  itsTimeCtaText,
  itsTimeCtaUseFillout,
  itsTimeCtaLink,
  callingCtaText,
  callingCtaUseFillout,
  callingCtaLink,
  premiumCtaText,
  premiumCtaUseFillout,
  premiumCtaLink,
  coreCtaText,
  coreCtaUseFillout,
  coreCtaLink,
  proCtaText,
  proCtaUseFillout,
  proCtaLink,
  itsTimeToCtaText,
  itsTimeToCtaUseFillout,
  itsTimeToCtaLink,
  finalCtaCtaText,
  finalCtaCtaUseFillout,
  finalCtaCtaLink,
  bottomLineCtaText,
  bottomLineCtaUseFillout,
  bottomLineCtaLink
}`;
