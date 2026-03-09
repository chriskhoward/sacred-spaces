import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import { Mic } from 'lucide-react'
import {
  SUMMIT_BY_YEAR_QUERY,
  SUMMIT_PRESENTATIONS_QUERY,
  getUniqueSpeakers,
  getSpeakerPresentationTitles,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import { getSectionStyles } from '@/lib/summit-styles'
import SummitButton from '@/components/summit/SummitButton'
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
    title: summit ? `Speakers — ${summit.title}` : 'Speakers',
    description: typeof summit?.description === 'string' ? summit.description : undefined,
  }
}

export default async function ArchiveSpeakersPage({ params }: PageProps) {
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  const presentations = await client.fetch<SummitPresentation[]>(
    SUMMIT_PRESENTATIONS_QUERY,
    { summitId: summit._id }
  )
  const speakers = getUniqueSpeakers(presentations)
  const titleMap = getSpeakerPresentationTitles(presentations)

  const sectionStyles = getSectionStyles({
    summitStyles: summit.styles,
    pageKey: 'speakersBg',
    fallbackPadding: 'normal',
  })

  return (
    <section className={sectionStyles.className} style={sectionStyles.style}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            Speakers
          </h1>
          {speakers.length === 0 ? (
            <p className="text-(--color-primary)/70">No speakers found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {speakers.map((speaker) => {
                const titles = titleMap.get(speaker._id) || []
                return (
                  <div key={speaker._id} className="bg-white rounded-2xl p-6 shadow-sm border border-(--color-gallery) text-center">
                    {speaker.headshot ? (
                      <Image
                        src={urlForImage(speaker.headshot).width(200).height(200).url()}
                        alt={speaker.name}
                        width={200}
                        height={200}
                        className="rounded-full mx-auto mb-4 object-cover w-32 h-32"
                        unoptimized
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-(--color-gallery) mx-auto mb-4 flex items-center justify-center">
                        <Mic className="w-10 h-10 text-(--color-primary)/30" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-(--color-primary)">{speaker.name}</h3>
                    {titles.length > 0 && (
                      <div className="mt-1">
                        {titles.map((title, i) => (
                          <p key={i} className="text-sm text-(--color-roti) font-medium">
                            {title}
                          </p>
                        ))}
                      </div>
                    )}
                    {speaker.bio && (
                      <div className="mt-2">
                        <PortableTextOrString
                          value={speaker.bio}
                          className="text-sm text-(--color-primary)/70 line-clamp-3"
                        />
                      </div>
                    )}
                    <div className="flex justify-center gap-3 mt-4 flex-wrap">
                      {speaker.websiteUrl && (
                        <a href={speaker.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-(--color-roti) hover:opacity-80 text-sm font-medium">Website</a>
                      )}
                      {speaker.socialLinks?.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-(--color-roti) hover:opacity-80 text-sm font-medium capitalize">{link.platform}</a>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Bottom navigation */}
          <div className="mt-12 flex justify-center">
            <SummitButton
              label="View Schedule"
              href={`/summit/${year}/schedule`}
              preset={summit.styles?.buttonPrimary}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
