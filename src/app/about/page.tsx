import { getClient } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import BlockRenderer from '@/components/Blocks/BlockRenderer';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';

export const metadata: Metadata = {
  title: 'About | Flow in Faith',
  description: 'A space built by Christ-Centered Yoga Teachers of Color, for Christ-Centered Yoga Teachers of Color. Meet the team and our story.',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const { isEnabled } = await draftMode();
  const client = getClient(isEnabled);
  const query = `*[_type == "about"][0] {
    content[] {
      ...,
      buttonSize,
      buttonColor,
      buttonAlignment,
      sectionSpacing,
      sectionBgColor,
      sectionBgImage
    }
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
            subtitle: "A space built by Christ-Centered Yoga Teachers of Color, for Christ-Centered Yoga Teachers of Color."
          },
          { _type: 'teamBlock', _key: 'default-team' },
          { _type: 'ctaBlock', _key: 'default-cta' }
        ]} />
      )}
    </main>
  );
}
