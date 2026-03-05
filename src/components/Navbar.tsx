import { getClient } from '@/sanity/lib/client';
import NavbarClient from './NavbarClient';
import { draftMode } from 'next/headers';
import { urlForImage } from '@/sanity/lib/image';
import type { SiteSettings } from '@/sanity/lib/siteSettings';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/siteSettings';
import type { CSSProperties } from 'react';

/** Map Sanity dropdown values to Tailwind classes */
const BANNER_BG_MAP: Record<string, string> = {
  'bg-martinique': 'bg-(--color-martinique)',
  'bg-roti': 'bg-(--color-roti)',
  'bg-bronzetone': 'bg-(--color-bronzetone)',
};

const TEXT_COLOR_MAP: Record<string, string> = {
  'text-white': 'text-white',
  'text-martinique': 'text-(--color-martinique)',
  'text-roti': 'text-(--color-roti)',
  'text-bronzetone': 'text-(--color-bronzetone)',
};

function normalizeHex(value: string | null | undefined): string | null {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
}

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

  // 3. Fetch announcement bar
  const announcementQuery = `*[_type == "announcementBar"][0] {
    isActive,
    text,
    link,
    backgroundColor,
    customBackgroundColor,
    textColor,
    customTextColor
  }`;

  let navItems: { label: string; slug?: string; externalUrl?: string; linkType: string }[] = [];
  let logoUrl: string | undefined;
  let announcementData: { text: string; link?: string; bgClass?: string; textClass?: string; style?: CSSProperties } | null = null;
  let memberLoginLabel: string | undefined;
  let dashboardLabel: string | undefined;

  try {
    const [rawNav, siteSettings, announcement] = await Promise.all([
      client.fetch(navQuery),
      client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
      client.fetch(announcementQuery),
    ]);
    logoUrl = siteSettings?.logo ? urlForImage(siteSettings.logo).width(200).url() : undefined;
    memberLoginLabel = siteSettings?.memberLoginLabel || undefined;
    dashboardLabel = siteSettings?.dashboardLabel || undefined;
    if (rawNav && rawNav.length > 0) {
      navItems = rawNav;
    } else {
      const rawLegacy = await client.fetch(legacyQuery);
      navItems = (rawLegacy || []).map((p: any) => ({ ...p, linkType: 'internal' }));
    }

    // Process announcement bar data
    if (announcement?.isActive && announcement.text) {
      const customBg = normalizeHex(announcement.customBackgroundColor);
      const bgClass = customBg
        ? undefined
        : (BANNER_BG_MAP[announcement.backgroundColor] || 'bg-(--color-roti)');

      const customText = normalizeHex(announcement.customTextColor);
      const textClass = customText
        ? undefined
        : (TEXT_COLOR_MAP[announcement.textColor] || 'text-white');

      const style: CSSProperties = {};
      if (customBg) style.backgroundColor = customBg;
      if (customText) style.color = customText;

      announcementData = {
        text: announcement.text,
        link: announcement.link || undefined,
        bgClass,
        textClass,
        style: Object.keys(style).length ? style : undefined,
      };
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

  return <NavbarClient dynamicPages={dynamicPages} logoUrl={logoUrl} announcement={announcementData} memberLoginLabel={memberLoginLabel} dashboardLabel={dashboardLabel} />;
}
