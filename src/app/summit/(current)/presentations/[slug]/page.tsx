import { client } from '@/sanity/lib/client'
import { isAllowedIframeUrl } from '@/lib/iframe-utils'
import { auth } from '@clerk/nextjs/server'
import {
  CURRENT_SUMMIT_QUERY,
  SUMMIT_PRESENTATION_BY_SLUG_QUERY,
  isPresentationAvailableFree,
  getGoogleCalendarUrl,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import UpgradeCTA from '@/components/summit/UpgradeCTA'
import AddToCalendarButton from '@/components/summit/AddToCalendarButton'
import AllAccessButton from '@/components/summit/AllAccessButton'
import { Check } from 'lucide-react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) return { title: 'Presentation' }
  const presentation = await client.fetch<SummitPresentation | null>(
    SUMMIT_PRESENTATION_BY_SLUG_QUERY,
    { summitId: summit._id, slug }
  )
  return {
    title: presentation
      ? `${presentation.title} — ${summit.title}`
      : 'Presentation',
    description: presentation?.description,
  }
}

export default async function PresentationPage({ params }: PageProps) {
  const { slug } = await params
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const presentation = await client.fetch<SummitPresentation | null>(
    SUMMIT_PRESENTATION_BY_SLUG_QUERY,
    { summitId: summit._id, slug }
  )
  if (!presentation) notFound()

  // Access check
  const { has, userId } = await auth()
  const hasAllAccess = summit.clerkPlanId
    ? await has({ plan: summit.clerkPlanId })
    : false
  const isFreeAvailable = isPresentationAvailableFree(presentation)
  const canWatch = hasAllAccess || isFreeAvailable

  const calendarUrl = getGoogleCalendarUrl(presentation)

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/summit/schedule"
            className="text-(--color-roti) hover:opacity-80 text-sm font-medium mb-6 inline-block"
          >
            &larr; Back to Schedule
          </Link>

          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            {presentation.speaker?.headshot && (
              <Image
                src={urlForImage(presentation.speaker.headshot)
                  .width(120)
                  .height(120)
                  .url()}
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
              <p className="text-lg text-(--color-primary)/70 mt-2">
                {presentation.speaker?.name}
              </p>
              {presentation.dayNumber && (
                <p className="text-sm text-(--color-roti) font-medium mt-1">
                  Day {presentation.dayNumber}
                  {presentation.timeSlot ? ` — ${presentation.timeSlot}` : ''}
                </p>
              )}
              {calendarUrl && (
                <div className="mt-3">
                  <AddToCalendarButton calendarUrl={calendarUrl} />
                </div>
              )}
            </div>
          </div>

          {/* Video or CTA */}
          {canWatch && presentation.videoUrl && isAllowedIframeUrl(presentation.videoUrl) ? (
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
          ) : !canWatch ? (
            <div className="mb-8">
              <UpgradeCTA
                allAccessSalesUrl={summit.allAccessSalesUrl}
                basePath="/summit"
                message={
                  !userId
                    ? 'Sign in to check if this presentation is available for free viewing, or get All Access for permanent access.'
                    : 'This presentation is no longer available for free viewing.'
                }
              />
            </div>
          ) : null}

          {/* Description */}
          {presentation.description && (
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-(--color-primary) mb-3">
                About This Presentation
              </h2>
              <p className="text-(--color-primary)/80 whitespace-pre-line">
                {presentation.description}
              </p>
            </div>
          )}

          {/* Resources (only for All Access or while free-available) */}
          {canWatch &&
            presentation.resources &&
            presentation.resources.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-(--color-primary) mb-3">
                  Resources
                </h2>
                <ul className="space-y-2">
                  {presentation.resources.map((r, i) => {
                    const href = r.url || r.file?.asset?.url
                    return (
                      <li key={i}>
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-(--color-roti) hover:opacity-80 font-medium"
                          >
                            {r.title}
                          </a>
                        ) : (
                          <span className="text-(--color-primary)/70">
                            {r.title}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

          {/* All Access badge */}
          {hasAllAccess && (
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-(--color-roti)/10 text-(--color-roti) rounded-full text-sm font-medium">
              <Check className="w-4 h-4" /> All Access
            </div>
          )}

          {/* Persistent All Access CTA for non-All Access users */}
          {!hasAllAccess && (
            <div className="mt-12 pt-8 border-t border-(--color-gallery) text-center">
              <p className="text-(--color-primary)/70 mb-4">
                Want permanent access to all presentations and bonus content?
              </p>
              <AllAccessButton basePath="/summit" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
