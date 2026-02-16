import { getClient } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import BlockRenderer from '@/components/Blocks/BlockRenderer';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { currentUser } from '@clerk/nextjs/server';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0] { _id, _type, title, content, isLocked }`;

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
  const user = await currentUser();

  const data = await client.fetch(PAGE_QUERY, { slug });

  if (!data) {
    return notFound();
  }

  // Handle gating for locked pages
  if (data.isLocked && !user) {
    redirect(`/sign-in?redirect_url=/${slug}`);
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BlockRenderer
        blocks={data.content as Array<{ _type: string; _key: string;[key: string]: any }>}
        documentId={data._id}
        documentType={data._type}
      />
    </main>
  );
}
