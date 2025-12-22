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
  
  const query = `*[_type == "page" && slug.current == $slug][0] {
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
      <BlockRenderer blocks={data.content} />
      <Footer />
    </main>
  );
}
