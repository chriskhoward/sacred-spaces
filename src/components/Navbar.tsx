import { client } from '@/sanity/lib/client';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const query = `*[_type == "page" && showInNav == true] {
    title,
    "slug": slug.current
  }`;

  const dynamicPages = await client.fetch(query) || [];

  return <NavbarClient dynamicPages={dynamicPages} />;
}
