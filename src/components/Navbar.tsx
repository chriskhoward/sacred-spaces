import { getClient } from '@/sanity/lib/client';
import NavbarClient from './NavbarClient';
import { draftMode } from 'next/headers';

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
  try {
    const rawNav = await client.fetch(navQuery);
    if (rawNav && rawNav.length > 0) {
      navItems = rawNav;
    } else {
      const rawLegacy = await client.fetch(legacyQuery);
      navItems = (rawLegacy || []).map((p: any) => ({ ...p, linkType: 'internal' }));
    }
  } catch (err) {
    console.error('[Navbar] Sanity fetch failed:', err);
  }

  // Format for NavbarClient: { title, slug }
  const dynamicPages = navItems.map(item => ({
    title: item.label,
    slug: item.linkType === 'external' ? (item.externalUrl || '') : (item.slug ? `/${item.slug}` : '')
  })).filter(p => p.title && (p.slug !== undefined));

  return <NavbarClient dynamicPages={dynamicPages} />;
}
