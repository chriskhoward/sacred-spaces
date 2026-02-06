import { client } from '@/sanity/lib/client';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const query = `*[_type == "page" && showInNav == true] {
    title,
    "slug": slug.current
  }`;

  let dynamicPages: { title?: string; slug?: string }[] = [];
  try {
    dynamicPages = (await client.fetch(query)) || [];
  } catch (err) {
    console.error('[Navbar] Sanity fetch failed:', err);
  }

  return <NavbarClient dynamicPages={dynamicPages} />;
}
