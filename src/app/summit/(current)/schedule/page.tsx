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
import PortableTextOrString from '@/components/PortableTextOrString'
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
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-(--color-gallery)">
      <Link
        href={`/summit/presentations/${p.slug.current}`}
        className="flex items-start gap-4"
      >
        {p.speaker?.headshot && (
          <Image
            src={urlForImage(p.speaker.headshot).width(80).height(80).url()}
            alt={p.speaker.name}
            width={80}
            height={80}
            className="rounded-full object-cover shrink-0"
            unoptimized
          />
        )}
        <div className="flex-1 min-w-0">
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
      <div className="mt-3 pl-0 sm:pl-[96px]">
        <AddToCalendarButton calendarUrl={getGoogleCalendarUrl(p)} />
      </div>
    </div>
  )
}

function RecordedPresentationRow({ p }: { p: SummitPresentation }) {
  return (
    <Link
      href={`/summit/presentations/${p.slug.current}`}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-(--color-gallery)/40 transition-colors"
    >
      {p.speaker?.headshot && (
        <Image
          src={urlForImage(p.speaker.headshot).width(48).height(48).url()}
          alt={p.speaker.name}
          width={48}
          height={48}
          className="rounded-full object-cover shrink-0"
          unoptimized
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-(--color-primary) text-sm truncate">
          {p.title}
        </p>
        <p className="text-xs text-(--color-primary)/60">
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

          <div className="mb-8">
            <AllAccessButton basePath="/summit" label={summit.labels?.getAllAccessButton ?? undefined} />
          </div>

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

                    {/* Recorded sessions — compact rows */}
                    {recorded.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-(--color-primary)/50 mb-3">
                          {summit.labels?.recordedSessionsLabel || 'Recorded Sessions'}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {recorded.map((p) => (
                            <RecordedPresentationRow key={p._id} p={p} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
