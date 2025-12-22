import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlockRenderer from '@/components/Blocks/BlockRenderer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const query = `*[_type == "home"][0] {
    content
  }`;

  const data = await client.fetch(query);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {data?.content ? (
        <BlockRenderer blocks={data.content} />
      ) : (
        /* Fallback if no content in Sanity */
        <BlockRenderer blocks={[
          { _type: 'heroBlock', _key: 'default-hero' },
          { _type: 'brandBlock', _key: 'default-brand' },
          { _type: 'pillarsBlock', _key: 'default-pillars' },
          { _type: 'benefitsBlock', _key: 'default-benefits' },
          { _type: 'ctaBlock', _key: 'default-cta' }
        ]} />
      )}

      <Footer />
    </main>
  );
}
