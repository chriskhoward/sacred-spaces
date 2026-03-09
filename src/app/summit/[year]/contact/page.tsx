import { client } from '@/sanity/lib/client'
import { SUMMIT_BY_YEAR_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import { getSectionStyles } from '@/lib/summit-styles'
import PortableTextOrString from '@/components/summit/PortableTextOrString'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  return {
    title: summit ? `Contact — ${summit.title}` : 'Contact',
    description: typeof summit?.description === 'string' ? summit.description : undefined,
  }
}

export default async function ArchiveContactPage({ params }: PageProps) {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  const sectionStyles = getSectionStyles({
    summitStyles: summit.styles,
    pageKey: 'contactBg',
    fallbackPadding: 'normal',
  })

  return (
    <section className={sectionStyles.className} style={sectionStyles.style}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            Contact
          </h1>
          {summit.contactEmail && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-(--color-primary) mb-3">Get in Touch</h2>
              <p className="text-(--color-primary)/80">
                Have questions? Reach out at{' '}
                <a href={`mailto:${summit.contactEmail}`} className="text-(--color-roti) hover:opacity-80 font-medium">
                  {summit.contactEmail}
                </a>
              </p>
            </div>
          )}
          {summit.faqItems && summit.faqItems.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary) mb-6">FAQ</h2>
              <div className="space-y-4">
                {summit.faqItems.map((faq, i) => (
                  <details key={i} className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) group">
                    <summary className="font-bold text-(--color-primary) cursor-pointer list-none flex items-center justify-between">
                      {faq.question}
                      <span className="text-(--color-roti) group-open:rotate-180 transition-transform ml-4">▼</span>
                    </summary>
                    <div className="mt-4">
                      <PortableTextOrString
                        value={faq.answer}
                        className="prose prose-lg max-w-none text-(--color-primary)/80"
                      />
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
