import { client } from '@/sanity/lib/client'
import { isAllowedIframeUrl } from '@/lib/iframe-utils'
import {
  SUMMIT_BY_YEAR_QUERY,
  SUMMIT_PRESENTATION_BY_SLUG_QUERY,
  getGoogleCalendarUrl,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AddToCalendarButton from '@/components/summit/AddToCalendarButton'
import { getSectionStyles } from '@/lib/summit-styles'
import PortableTextOrString from '@/components/summit/PortableTextOrString'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string; slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, slug } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) return { title: 'Presentation' }
  const presentation = await client.fetch<SummitPresentation | null>(
    SUMMIT_PRESENTATION_BY_SLUG_QUERY,
    { summitId: summit._id, slug }
  )
  return {
    title: presentation
      ? `${presentation.title} — ${summit.title}`
      : 'Presentation',
    description: typeof presentation?.description === 'string' ? presentation.description : undefined,
  }
}

export default async function ArchivePresentationPage({ params }: PageProps) {
  const { year, slug } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  const presentation = await client.fetch<SummitPresentation | null>(
    SUMMIT_PRESENTATION_BY_SLUG_QUERY,
    { summitId: summit._id, slug }
  )
  if (!presentation) notFound()

  const calendarUrl = getGoogleCalendarUrl(presentation)

  const sectionStyles = getSectionStyles({
    summitStyles: summit.styles,
    fallbackPadding: 'normal',
  })

  return (
    <section className={sectionStyles.className} style={sectionStyles.style}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/summit/${year}/schedule`}
            className="text-(--color-roti) hover:opacity-80 text-sm font-medium mb-6 inline-block"
          >
            &larr; Back to Schedule
          </Link>

          <div className="flex items-start gap-6 mb-8">
            {presentation.speaker?.headshot && (
              <Image
                src={urlForImage(presentation.speaker.headshot).width(120).height(120).url()}
                alt={presentation.speaker.name}
                width={120}
                height={120}
                className="rounded-full object-cover shrink-0 hidden sm:block"
                unoptimized
              />
            )}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-(--color-primary)">
                {presentation.title}
              </h1>
              <p className="text-lg text-(--color-primary)/70 mt-2">{presentation.speaker?.name}</p>
              {presentation.dayNumber && (
                <p className="text-sm text-(--color-roti) font-medium mt-1">
                  Day {presentation.dayNumber}{presentation.timeSlot ? ` — ${presentation.timeSlot}` : ''}
                </p>
              )}
              {calendarUrl && (
                <div className="mt-3">
                  <AddToCalendarButton calendarUrl={calendarUrl} />
                </div>
              )}
            </div>
          </div>

          {/* No gating for archives — show video if available */}
          {presentation.videoUrl && isAllowedIframeUrl(presentation.videoUrl) && (
            <div className="aspect-video mb-8 rounded-xl overflow-hidden bg-black">
              <iframe
                src={presentation.videoUrl}
                title={presentation.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation"
                className="w-full h-full"
              />
            </div>
          )}

          {presentation.description && (
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-(--color-primary) mb-3">
                About This Presentation
              </h2>
              <PortableTextOrString
                value={presentation.description}
                className="prose prose-lg max-w-none text-(--color-primary)/80"
              />
            </div>
          )}

          {presentation.speaker?.bio && (
            <div className="mb-8 bg-(--color-gallery)/30 rounded-xl p-6">
              <h2 className="text-xl md:text-2xl font-bold text-(--color-primary) mb-3">
                About {presentation.speaker.name}
              </h2>
              <PortableTextOrString
                value={presentation.speaker.bio}
                className="prose prose-lg max-w-none text-(--color-primary)/80"
              />
            </div>
          )}

          {presentation.resources && presentation.resources.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-(--color-primary) mb-3">Resources</h2>
              <ul className="space-y-2">
                {presentation.resources.map((r, i) => {
                  const href = r.url || r.file?.asset?.url
                  return (
                    <li key={i}>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-(--color-roti) hover:opacity-80 font-medium">
                          {r.title}
                        </a>
                      ) : (
                        <span className="text-(--color-primary)/70">{r.title}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
