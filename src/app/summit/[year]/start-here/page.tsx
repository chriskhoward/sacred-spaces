import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import { SUMMIT_BY_YEAR_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

export default async function ArchiveStartHerePage({ params }: PageProps) {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  // Archives show free content (summit is over)
  const content = summit.welcomeContentFree

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            {summit.title} {summit.year}
          </h1>
          {content && content.length > 0 ? (
            <div className="prose prose-lg max-w-none text-(--color-primary)">
              <PortableText value={content} />
            </div>
          ) : (
            <p className="text-(--color-primary)/70">Welcome content not available.</p>
          )}
        </div>
      </div>
    </section>
  )
}
