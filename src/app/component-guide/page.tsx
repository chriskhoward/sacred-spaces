import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import BlockRenderer from '@/components/Blocks/BlockRenderer';

export const metadata: Metadata = {
  title: 'Component Guide | Flow in Faith',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export default async function ComponentGuidePage() {
  const query = `*[_type == "page" && slug.current == "component-guide"][0] {
    _id,
    _type,
    title,
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

      {/* Introduction */}
      <section className="bg-(--color-gallery) pt-40 pb-24 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-7xl font-bold text-(--color-primary) mb-6">Component Guide</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A living library of modular building blocks designed for the Flow in Faith platform.
            All components are fully responsive and integrated with Sanity CMS.
          </p>
        </div>
      </section>

      {data?.content ? (
        <BlockRenderer
          blocks={data.content}
          documentId={data._id}
          documentType={data._type}
        />
      ) : (
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl text-gray-600">
              No component guide content found. Create a page in Sanity with slug "component-guide".
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
