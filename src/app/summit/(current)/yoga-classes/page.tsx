import { getClient } from '@/sanity/lib/client'
import { draftMode } from 'next/headers'
import { isAllowedIframeUrl } from '@/lib/iframe-utils'
import Link from 'next/link'
import {
  CURRENT_SUMMIT_QUERY,
  SUMMIT_YOGA_CLASSES_QUERY,
  getYogaCalendarUrl,
  type Summit,
  type SummitYogaClass,
} from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import AllAccessButton from '@/components/summit/AllAccessButton'
import AddToCalendarButton from '@/components/summit/AddToCalendarButton'
import SummitBreadcrumbs from '@/components/summit/SummitBreadcrumbs'
import { getSectionStyles } from '@/lib/summit-styles'
import SummitButton from '@/components/summit/SummitButton'
import PortableTextOrString from '@/components/summit/PortableTextOrString'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `${summit.labels?.yogaTitle || 'Yoga Classes'} — ${summit.title}` : 'Yoga Classes',
    description: typeof summit?.description === 'string' ? summit.description : undefined,
  }
}

export default async function YogaClassesPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
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
          <SummitBreadcrumbs summitTitle={summit.title} basePath="/summit" current={summit.labels?.yogaTitle || 'Yoga Classes'} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            {summit.labels?.yogaTitle || 'Yoga Classes'}
          </h1>

          {yogaClasses.length === 0 ? (
            <p className="text-(--color-primary)/70">
              {summit.labels?.yogaEmptyMessage || 'Yoga classes coming soon.'}
            </p>
          ) : (
            <div className="space-y-8">
              {yogaClasses.map((yc) => (
                <div
                  key={yc._id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery)"
                >
                  <h3 className="text-xl font-bold text-(--color-primary)">
                    {yc.title}
                  </h3>
                  {yc.instructor && (
                    <p className="text-sm text-(--color-primary)/70 mt-1">
                      with {yc.instructor}
                    </p>
                  )}
                  {yc.description && (
                    <div className="mt-3">
                      <PortableTextOrString
                        value={yc.description}
                        className="prose prose-lg max-w-none text-(--color-primary)/80"
                      />
                    </div>
                  )}
                  <div className="mt-3">
                    <AddToCalendarButton calendarUrl={getYogaCalendarUrl(yc)} />
                  </div>
                  {yc.videoUrl && isAllowedIframeUrl(yc.videoUrl) && (
                    <div className="aspect-video mt-4 rounded-lg overflow-hidden bg-black">
                      <iframe
                        src={yc.videoUrl}
                        title={yc.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-presentation"
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Bottom navigation */}
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <SummitButton
              label={summit.labels?.viewScheduleButton || 'View Schedule'}
              href="/summit/schedule"
              preset={summit.styles?.buttonPrimary}
            />
            <AllAccessButton basePath="/summit" label={summit.labels?.getAllAccessButton ?? undefined} />
          </div>
        </div>
      </div>
    </section>
  )
}
