import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlockRenderer from '@/components/Blocks/BlockRenderer';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function GenericPage({ params }: PageProps) {
  const { slug } = await params;

  // Include _id for Sanity visual editing
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    content
  }`;

  const data = await client.fetch(query, { slug });

  if (!data) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BlockRenderer
        blocks={data.content}
        documentId={data._id}
        documentType={data._type}
      />
      <Footer />
    </main>
  );
}
