import { notFound } from 'next/navigation'
import { getClient } from '@/sanity/lib/client'
import { draftMode } from 'next/headers'
import { urlForImage } from '@/sanity/lib/image'
import { SUMMIT_BY_YEAR_QUERY, type Summit } from '@/sanity/lib/summit'
import SummitNav from '@/components/summit/SummitNav'

export const dynamic = 'force-dynamic'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ year: string }>
}

export default async function ArchiveSummitLayout({
  children,
  params,
}: LayoutProps) {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  const { year } = await params
  const yearNum = parseInt(year, 10)
  if (isNaN(yearNum)) notFound()

  const summit = await client.fetch<Summit | null>(SUMMIT_BY_YEAR_QUERY, {
    year: yearNum,
  })
  if (!summit) notFound()

  // If this is the current summit, the (current) routes handle it
  if (summit.isCurrent) notFound()

  const logoUrl = summit.heroImage
    ? urlForImage(summit.heroImage).width(200).height(200).url()
    : undefined

  return (
    <>
      <SummitNav
        navLinks={summit.navLinks ?? []}
        basePath={`/summit/${year}`}
        summitTitle={`${summit.title} ${summit.year}`}
        communityLink={summit.communityLink}
        logoUrl={logoUrl}
        communityNavLabel={summit.labels?.communityNavLabel ?? undefined}
        signInLabel={summit.labels?.signInButton ?? undefined}
      />
      <div className="pt-28" />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-2">
          <div className="inline-block px-3 py-1 bg-(--color-primary)/10 text-(--color-primary) rounded-full text-xs font-medium mb-4">
            Archive — {summit.year}
          </div>
        </div>
        {children}
      </main>
    </>
  )
}
