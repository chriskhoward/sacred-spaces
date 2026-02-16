import { getClient } from '@/sanity/lib/client';
import Link from 'next/link';
import { draftMode } from 'next/headers';
import type { CSSProperties } from 'react';

/** Map Sanity dropdown values to Tailwind classes that use theme CSS variables */
const BANNER_BG_MAP: Record<string, string> = {
    'bg-martinique': 'bg-(--color-martinique)',
    'bg-roti': 'bg-(--color-roti)',
    'bg-bronzetone': 'bg-(--color-bronzetone)',
} as const;

const TEXT_COLOR_MAP: Record<string, string> = {
    'text-white': 'text-white',
    'text-martinique': 'text-(--color-martinique)',
    'text-roti': 'text-(--color-roti)',
    'text-bronzetone': 'text-(--color-bronzetone)',
} as const;

const defaultBannerBg = 'bg-(--color-roti)';
const defaultTextColor = 'text-white';

/** Normalize hex for inline style (allow with or without #) */
function normalizeHex(value: string | null | undefined): string | null {
    if (!value || typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
}

export default async function AnnouncementBar() {
    const { isEnabled } = await draftMode();
    const client = getClient(isEnabled);
    const query = `*[_type == "announcementBar"][0] {
    isActive,
    text,
    link,
    backgroundColor,
    customBackgroundColor,
    textColor,
    customTextColor
  }`;

    const announcement = await client.fetch(query);

    if (!announcement || !announcement.isActive) return null;

    const customBg = normalizeHex(announcement.customBackgroundColor);
    const bgClass = customBg
        ? undefined
        : (announcement.backgroundColor && BANNER_BG_MAP[announcement.backgroundColor]
            ? BANNER_BG_MAP[announcement.backgroundColor]
            : defaultBannerBg);

    const customText = normalizeHex(announcement.customTextColor);
    const textClass = customText
        ? undefined
        : (announcement.textColor && TEXT_COLOR_MAP[announcement.textColor]
            ? TEXT_COLOR_MAP[announcement.textColor]
            : defaultTextColor);

    const style: CSSProperties = {};
    if (customBg) style.backgroundColor = customBg;
    if (customText) style.color = customText;

    const content = (
        <div
            className={`${bgClass ?? ''} ${textClass ?? ''} py-2 px-4 text-center text-sm font-medium`.trim()}
            style={Object.keys(style).length ? style : undefined}
        >
            {announcement.text}
        </div>
    );

    if (announcement.link) {
        return (
            <Link href={announcement.link} className="block hover:opacity-90 transition-opacity">
                {content}
            </Link>
        );
    }

    return content;
}
