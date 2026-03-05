/**
 * Navigation menu fetch and types.
 * Used to drive CMS-editable link lists (footer, etc.).
 */

export type NavMenuItem = {
  label: string;
  linkType?: 'internal' | 'external';
  internalLink?: { _type?: string; slug?: { current?: string } } | null;
  externalUrl?: string | null;
};

export type NavigationMenu = {
  _id: string;
  title: string;
  items?: NavMenuItem[] | null;
};

const NAV_MENU_BY_TITLE_QUERY = `*[_type == "navigation" && title == $title][0]{
  _id,
  title,
  items[]{
    label,
    linkType,
    internalLink->{ _type, slug },
    externalUrl
  }
}`;

export { NAV_MENU_BY_TITLE_QUERY };

export function resolveNavHref(item: NavMenuItem): string {
  if (item.linkType === 'external' && item.externalUrl) {
    return item.externalUrl;
  }
  if (item.internalLink) {
    const ref = item.internalLink;
    if (ref._type === 'home') return '/';
    if (ref._type === 'about') return '/about';
    if (ref.slug?.current) return `/${ref.slug.current}`;
  }
  return '/';
}
