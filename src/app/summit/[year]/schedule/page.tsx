import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import {
  SUMMIT_BY_YEAR_QUERY,
  SUMMIT_PRESENTATIONS_QUERY,
  groupPresentationsByDay,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

export default async function ArchiveSchedulePage({ params }: PageProps) {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            Schedule
          </h1>
          {sortedDays.length === 0 ? (
            <p className="text-(--color-primary)/70">No presentations found.</p>
          ) : (
            <div className="space-y-12">
              {sortedDays.map((day) => (
                <div key={day}>
                  <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary) mb-6 pb-2 border-b-2 border-(--color-roti)">
                    Day {day}
                  </h2>
                  <div className="space-y-4">
                    {grouped.get(day)!.map((p) => (
                      <Link
                        key={p._id}
                        href={`/summit/${year}/presentations/${p.slug.current}`}
                        className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-(--color-gallery)"
                      >
                        <div className="flex items-start gap-4">
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
                            <h3 className="text-lg font-bold text-(--color-primary)">{p.title}</h3>
                            <p className="text-sm text-(--color-primary)/70 mt-1">{p.speaker?.name}</p>
                            {p.timeSlot && (
                              <p className="text-sm text-(--color-roti) font-medium mt-1">{p.timeSlot}</p>
                            )}
                          </div>
                        </div>
                      </Link>
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
