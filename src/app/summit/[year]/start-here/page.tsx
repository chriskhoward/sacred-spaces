import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { SUMMIT_BY_YEAR_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import { getSectionStyles } from '@/lib/summit-styles'
import SummitButton from '@/components/summit/SummitButton'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  return {
    title: summit ? `${summit.labels?.welcomeTitle || 'Welcome'} — ${summit.title}` : 'Summit',
    description: typeof summit?.description === 'string' ? summit.description : undefined,
  }
}

export default async function ArchiveStartHerePage({ params }: PageProps) {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  const content = summit.welcomeContentFree

  const sectionStyles = getSectionStyles({
    summitStyles: summit.styles,
    pageKey: 'startHereBg',
    fallbackPadding: 'normal',
  })

  return (
    <section className={sectionStyles.className} style={sectionStyles.style}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            {summit.labels?.welcomeTitle || `${summit.title} ${summit.year}`}
          </h1>

          {content && content.length > 0 ? (
            <div className="prose prose-lg max-w-none text-(--color-primary) mb-10">
              <PortableText value={content} />
            </div>
          ) : (
            <p className="text-(--color-primary)/70 mb-10">{summit.labels?.welcomeEmptyMessage || 'Welcome content not available.'}</p>
          )}

          {/* Community Link */}
          <div className="mb-10">
            <SummitButton
              label={summit.labels?.joinCommunityButton || 'Join the Community'}
              href={summit.communityLink}
              external
              preset={summit.styles?.buttonPrimary}
            />
          </div>

          {/* Navigation Cards — driven by navLinks from Sanity */}
          {summit.navLinks && summit.navLinks.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {summit.navLinks.map((link) => {
                const isExternal = link.path.startsWith('http')
                const href = isExternal ? link.path : `/summit/${year}${link.path}`
                return isExternal ? (
                  <a
                    key={link.path}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-bold text-(--color-primary)">
                      {link.label}
                    </h3>
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    href={href}
                    className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-bold text-(--color-primary)">
                      {link.label}
                    </h3>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
