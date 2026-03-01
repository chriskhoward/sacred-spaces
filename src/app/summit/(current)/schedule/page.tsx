import { client } from '@/sanity/lib/client'
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
import AddToCalendarButton from '@/components/summit/AddToCalendarButton'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `Schedule — ${summit.title}` : 'Schedule',
    description: summit?.description,
  }
}

export default async function SchedulePage() {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const presentations = await client.fetch<SummitPresentation[]>(
    SUMMIT_PRESENTATIONS_QUERY,
    { summitId: summit._id }
  )

  const grouped = groupPresentationsByDay(presentations)
  const sortedDays = Array.from(grouped.keys()).sort((a, b) => a - b)

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-6">
            Schedule
          </h1>

          <div className="mb-8">
            <AllAccessButton basePath="/summit" />
          </div>

          {sortedDays.length === 0 ? (
            <p className="text-(--color-primary)/70">
              Schedule coming soon.
            </p>
          ) : (
            <div className="space-y-12">
              {sortedDays.map((day) => (
                <div key={day}>
                  <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary) mb-6 pb-2 border-b-2 border-(--color-roti)">
                    Day {day}
                  </h2>
                  <div className="space-y-4">
                    {grouped.get(day)!.map((p) => (
                      <div
                        key={p._id}
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-(--color-gallery)"
                      >
                        <Link
                          href={`/summit/presentations/${p.slug.current}`}
                          className="flex items-start gap-4"
                        >
                          {p.speaker?.headshot && (
                            <Image
                              src={urlForImage(p.speaker.headshot)
                                .width(80)
                                .height(80)
                                .url()}
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
                              <p className="text-sm text-(--color-primary)/60 mt-2 line-clamp-2">
                                {p.description}
                              </p>
                            )}
                          </div>
                        </Link>
                        <div className="mt-3 pl-0 sm:pl-[96px]">
                          <AddToCalendarButton calendarUrl={getGoogleCalendarUrl(p)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
