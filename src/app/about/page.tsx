import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlockRenderer from '@/components/Blocks/BlockRenderer';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const query = `*[_type == "about"][0] {
    content
  }`;

  const data = await client.fetch(query);

  return (
    <main className="bg-white">
      <Navbar />

      {data?.content ? (
        <BlockRenderer blocks={data.content} />
      ) : (
        /* Fallback if no content in Sanity */
        <BlockRenderer blocks={[
          { 
            _type: 'heroBlock', 
            _key: 'default-hero',
            title: "Affirming Your Identity & Faith",
            subtitle: "A space built by Christian Yoga Teachers of Color, for Christian Yoga Teachers of Color."
          },
          { _type: 'teamBlock', _key: 'default-team' },
          { _type: 'ctaBlock', _key: 'default-cta' }
        ]} />
      )}
      
      <Footer />
    </main>
  );
}
