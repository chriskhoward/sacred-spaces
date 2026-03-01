import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import {
  SUMMIT_BY_YEAR_QUERY,
  SUMMIT_PRESENTATIONS_QUERY,
  getUniqueSpeakers,
  type Summit,
  type SummitPresentation,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

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

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            Speakers
          </h1>
          {speakers.length === 0 ? (
            <p className="text-(--color-primary)/70">No speakers found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {speakers.map((speaker) => (
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
                    <div className="w-32 h-32 rounded-full bg-(--color-gallery) mx-auto mb-4 flex items-center justify-center text-3xl text-(--color-primary)/30">
                      🎤
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-(--color-primary)">{speaker.name}</h3>
                  {speaker.bio && <p className="text-sm text-(--color-primary)/70 mt-2 line-clamp-3">{speaker.bio}</p>}
                  <div className="flex justify-center gap-3 mt-4 flex-wrap">
                    {speaker.websiteUrl && (
                      <a href={speaker.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-(--color-roti) hover:opacity-80 text-sm font-medium">Website</a>
                    )}
                    {speaker.socialLinks?.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-(--color-roti) hover:opacity-80 text-sm font-medium capitalize">{link.platform}</a>
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
