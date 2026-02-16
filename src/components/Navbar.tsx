import { getClient } from '@/sanity/lib/client';
import NavbarClient from './NavbarClient';
import { draftMode } from 'next/headers';
import { urlForImage } from '@/sanity/lib/image';
import type { SiteSettings } from '@/sanity/lib/siteSettings';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/siteSettings';

export default async function Navbar() {
  const { isEnabled } = await draftMode();
  const client = getClient(isEnabled);

  // 1. Fetch customized Navigation document
  const navQuery = `*[_type == "navigation" && _id == "mainNavigation"][0].items[] {
    label,
    linkType,
    externalUrl,
    "slug": internalLink->slug.current
  }`;

  // 2. Fallback to older logic (pages with showInNav) if no Navigation doc exists
  const legacyQuery = `*[_type == "page" && showInNav == true] {
    "label": title,
    "slug": slug.current,
    "linkType": "internal"
  }`;

  let navItems: { label: string; slug?: string; externalUrl?: string; linkType: string }[] = [];
  let logoUrl: string | undefined;
  try {
    const [rawNav, siteSettings] = await Promise.all([
      client.fetch(navQuery),
      client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
    ]);
    logoUrl = siteSettings?.logo ? urlForImage(siteSettings.logo).width(200).url() : undefined;
    if (rawNav && rawNav.length > 0) {
      navItems = rawNav;
    } else {
      const rawLegacy = await client.fetch(legacyQuery);
      navItems = (rawLegacy || []).map((p: any) => ({ ...p, linkType: 'internal' }));
    }
  } catch (err) {
    logoUrl = undefined;
    console.error('[Navbar] Sanity fetch failed:', err);
  }

  // Format for NavbarClient: { title, slug }
  const dynamicPages = navItems.map(item => ({
    title: item.label,
    slug: item.linkType === 'external' ? (item.externalUrl || '') : (item.slug ? `/${item.slug}` : '')
  })).filter(p => p.title && (p.slug !== undefined));

  return <NavbarClient dynamicPages={dynamicPages} logoUrl={logoUrl} />;
}
