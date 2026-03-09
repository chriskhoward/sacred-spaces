import { getClient } from '@/sanity/lib/client'
import { draftMode } from 'next/headers'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import {
  CURRENT_SUMMIT_QUERY,
  SUMMIT_PRESENTATIONS_QUERY,
  groupPresentationsByDay,
  getGoogleCalendarUrl,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import AllAccessButton from '@/components/summit/AllAccessButton'
import PortableTextOrString from '@/components/summit/PortableTextOrString'
import AddToCalendarButton from '@/components/summit/AddToCalendarButton'
import { getSectionStyles } from '@/lib/summit-styles'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `${summit.labels?.scheduleTitle || 'Schedule'} — ${summit.title}` : 'Schedule',
    description: typeof summit?.description === 'string' ? summit.description : undefined,
  }
}

function LivePresentationCard({ p }: { p: SummitPresentation }) {
  const cardImage = p.image || p.speaker?.headshot
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-(--color-gallery) overflow-hidden">
      <Link href={`/summit/presentations/${p.slug.current}`}>
        {cardImage && (
          <div className="aspect-[3/1] relative">
            <Image
              src={urlForImage(cardImage).width(800).height(267).url()}
              alt={p.image ? p.title : p.speaker?.name || p.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-lg font-bold text-(--color-primary)">
            {p.title}
          </h3>
          <p className="text-sm text-(--color-primary)/70 mt-1">
            {p.speaker?.name}
          </p>
          {p.timeSlot && (
            <p className="text-sm text-(--color-roti) font-medium mt-1">
              {p.timeSlot}
            </p>
          )}
          {p.description && (
            <div className="text-sm text-(--color-primary)/60 mt-2 line-clamp-2">
              <PortableTextOrString value={p.description} />
            </div>
          )}
        </div>
      </Link>
      <div className="px-6 pb-4">
        <AddToCalendarButton calendarUrl={getGoogleCalendarUrl(p)} />
      </div>
    </div>
  )
}

function RecordedPresentationCard({ p, basePath = '/summit' }: { p: SummitPresentation; basePath?: string }) {
  const thumbnail = p.image || p.speaker?.headshot
  return (
    <Link
      href={`${basePath}/presentations/${p.slug.current}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-(--color-gallery) overflow-hidden"
    >
      {thumbnail && (
        <div className="aspect-[4/3] relative">
          <Image
            src={urlForImage(thumbnail).width(400).height(300).url()}
            alt={p.image ? p.title : p.speaker?.name || p.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="p-4">
        <p className="font-bold text-(--color-primary) text-sm line-clamp-2">
          {p.title}
        </p>
        <p className="text-xs text-(--color-primary)/60 mt-1">
          {p.speaker?.name}
        </p>
      </div>
    </Link>
  )
}

export default async function SchedulePage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const presentations = await client.fetch<SummitPresentation[]>(
    SUMMIT_PRESENTATIONS_QUERY,
    { summitId: summit._id }
  )

  const grouped = groupPresentationsByDay(presentations)
  const sortedDays = Array.from(grouped.keys()).sort((a, b) => a - b)

  const sectionStyles = getSectionStyles({
    summitStyles: summit.styles,
    pageKey: 'scheduleBg',
    fallbackPadding: 'normal',
  })

  return (
    <section className={sectionStyles.className} style={sectionStyles.style}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/summit/start-here"
            className="text-(--color-roti) hover:opacity-80 text-sm font-medium mb-6 inline-block"
          >
            &larr; {summit.labels?.backToWelcome || 'Back to Welcome'}
          </Link>

          {/* Optional banner */}
          {summit.scheduleBannerImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={urlForImage(summit.scheduleBannerImage).width(1200).url()}
                alt="Schedule banner"
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-6">
            {summit.labels?.scheduleTitle || 'Presentation & Workshop Schedule'}
          </h1>

          {sortedDays.length === 0 ? (
            <p className="text-(--color-primary)/70">
              {summit.labels?.scheduleEmptyMessage || 'Schedule coming soon.'}
            </p>
          ) : (
            <div className="space-y-12">
              {sortedDays.map((day) => {
                const dayPresentations = grouped.get(day)!
                const live = dayPresentations.filter(
                  (p) => p.sessionType !== 'recorded'
                )
                const recorded = dayPresentations.filter(
                  (p) => p.sessionType === 'recorded'
                )

                return (
                  <div key={day}>
                    <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary) mb-6 pb-2 border-b-2 border-(--color-roti)">
                      {summit.labels?.dayPrefix || 'Day'} {day}
                    </h2>

                    {/* Live sessions — full cards */}
                    {live.length > 0 && (
                      <div className="space-y-4 mb-6">
                        {live.map((p) => (
                          <LivePresentationCard key={p._id} p={p} />
                        ))}
                      </div>
                    )}

                    {/* Recorded sessions — thumbnail cards */}
                    {recorded.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-(--color-primary)/50 mb-4">
                          {summit.labels?.recordedSessionsLabel || 'Recorded Sessions'}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {recorded.map((p) => (
                            <RecordedPresentationCard key={p._id} p={p} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-12">
            <AllAccessButton basePath="/summit" label={summit.labels?.getAllAccessButton ?? undefined} />
          </div>
        </div>
      </div>
    </section>
  )
}
