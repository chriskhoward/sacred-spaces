import { getClient } from '@/sanity/lib/client'
import { draftMode } from 'next/headers'
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
import { notFound } from 'next/navigation'
import AddToCalendarButton from '@/components/summit/AddToCalendarButton'
import SummitBreadcrumbs from '@/components/summit/SummitBreadcrumbs'
import { ExternalLink } from 'lucide-react'
import { getSectionStyles } from '@/lib/summit-styles'
import PortableTextOrString from '@/components/summit/PortableTextOrString'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string; slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
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
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
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
          <SummitBreadcrumbs summitTitle={summit.title} basePath={`/summit/${year}`} current={presentation.title} />

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

          {/* Speaker Card */}
          {presentation.speaker && (
            <div className="mb-8 bg-(--color-gallery)/30 rounded-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                {presentation.speaker.headshot && (
                  <Image
                    src={urlForImage(presentation.speaker.headshot).width(200).height(200).url()}
                    alt={presentation.speaker.name}
                    width={200}
                    height={200}
                    className="rounded-xl object-cover shrink-0 self-start"
                    unoptimized
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-(--color-primary) mb-2">
                    About {presentation.speaker.name}
                  </h2>
                  {presentation.speaker.bio && (
                    <PortableTextOrString
                      value={presentation.speaker.bio}
                      className="prose prose-lg max-w-none text-(--color-primary)/80 mb-4"
                    />
                  )}
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    {presentation.speakerPromoLabel && (
                      <a
                        href={presentation.speakerPromoUrl || presentation.speaker.websiteUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--color-roti) text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
                      >
                        {presentation.speakerPromoLabel}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {!presentation.speakerPromoLabel && presentation.speaker.websiteUrl && (
                      <a
                        href={presentation.speaker.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-(--color-primary)/20 rounded-lg text-(--color-primary) hover:bg-(--color-primary)/5 transition-colors text-sm font-medium"
                      >
                        Visit Website
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {presentation.speaker.socialLinks?.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 border border-(--color-primary)/20 rounded-lg text-(--color-primary)/70 hover:bg-(--color-primary)/5 transition-colors text-sm capitalize"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Custom Content Section */}
          {presentation.customContent && presentation.customContent.length > 0 && (
            <div className="mb-8">
              <PortableTextOrString
                value={presentation.customContent}
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
