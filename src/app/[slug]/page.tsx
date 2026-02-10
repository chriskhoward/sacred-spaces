import { getClient } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlockRenderer from '@/components/Blocks/BlockRenderer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0] { _id, _type, title, content }`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const client = getClient(isEnabled);
  const data = await client.fetch<{ title?: string } | null>(PAGE_QUERY, { slug });
  if (!data?.title) return { title: 'Page Not Found | Flow in Faith' };
  return {
    title: `${data.title} | Flow in Faith`,
    description: data.title ? `Flow in Faith — ${data.title}` : undefined,
  };
}

export const dynamic = 'force-dynamic';

export default async function GenericPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const client = getClient(isEnabled);

  const data = await client.fetch(PAGE_QUERY, { slug });

  if (!data) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BlockRenderer
        blocks={data.content as Array<{ _type: string; _key: string; [key: string]: any }>}
        documentId={data._id}
        documentType={data._type}
      />
      <Footer />
    </main>
  );
}
