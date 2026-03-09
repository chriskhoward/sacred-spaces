import { getClient } from '@/sanity/lib/client'
import { draftMode } from 'next/headers'
import { isAllowedIframeUrl } from '@/lib/iframe-utils'
import {
  SUMMIT_BY_YEAR_QUERY,
  SUMMIT_YOGA_CLASSES_QUERY,
  type Summit,
  type SummitYogaClass,
} from '@/sanity/lib/summit'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import SummitBreadcrumbs from '@/components/summit/SummitBreadcrumbs'
import { getSectionStyles } from '@/lib/summit-styles'
import PortableTextOrString from '@/components/summit/PortableTextOrString'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type PageProps = { params: Promise<{ year: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  return {
    title: summit ? `${summit.labels?.yogaTitle || 'Yoga Classes'} — ${summit.title}` : 'Yoga Classes',
    description: typeof summit?.description === 'string' ? summit.description : undefined,
  }
}

export default async function ArchiveYogaClassesPage({ params }: PageProps) {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  const { year } = await params
  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: parseInt(year, 10),
  })
  if (!summit) notFound()

  const yogaClasses = await client.fetch<SummitYogaClass[]>(
    SUMMIT_YOGA_CLASSES_QUERY,
    { summitId: summit._id }
  )

  const sectionStyles = getSectionStyles({
    summitStyles: summit.styles,
    pageKey: 'yogaClassesBg',
    fallbackPadding: 'normal',
  })

  return (
    <section className={sectionStyles.className} style={sectionStyles.style}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SummitBreadcrumbs summitTitle={summit.title} basePath={`/summit/${year}`} current={summit.labels?.yogaTitle || 'Yoga Classes'} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            Yoga Classes
          </h1>
          {yogaClasses.length === 0 ? (
            <p className="text-(--color-primary)/70">No yoga classes found.</p>
          ) : (
            <div className="space-y-8">
              {yogaClasses.map((yc) => {
                const thumbnail = yc.image
                return (
                  <div key={yc._id} className="bg-white rounded-xl shadow-sm border border-(--color-gallery) overflow-hidden">
                    {/* Replay video for archives */}
                    {yc.videoUrl && isAllowedIframeUrl(yc.videoUrl) ? (
                      <div className="aspect-video bg-black">
                        <iframe
                          src={yc.videoUrl}
                          title={yc.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin allow-presentation"
                          className="w-full h-full"
                        />
                      </div>
                    ) : thumbnail ? (
                      <div className="aspect-[3/1] relative">
                        <Image
                          src={urlForImage(thumbnail).width(800).height(267).url()}
                          alt={yc.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : null}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-(--color-primary)">{yc.title}</h3>
                      {yc.instructor && <p className="text-sm text-(--color-primary)/70 mt-1">with {yc.instructor}</p>}
                      {yc.description && (
                        <div className="mt-3">
                          <PortableTextOrString
                            value={yc.description}
                            className="prose prose-lg max-w-none text-(--color-primary)/80"
                          />
                        </div>
                      )}
                    </div>
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
