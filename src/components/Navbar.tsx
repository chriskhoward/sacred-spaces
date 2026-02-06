import { client } from '@/sanity/lib/client';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const query = `*[_type == "page" && showInNav == true] {
    title,
    "slug": slug.current
  }`;

  let raw: { title?: string; slug?: string }[] = [];
  try {
    raw = (await client.fetch(query)) || [];
  } catch (err) {
    console.error('[Navbar] Sanity fetch failed:', err);
  }
  const dynamicPages: { title: string; slug: string }[] = raw.filter(
    (p): p is { title: string; slug: string } => Boolean(p.title && p.slug)
  );

  return <NavbarClient dynamicPages={dynamicPages} />;
}
