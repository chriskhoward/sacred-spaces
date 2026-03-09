import { notFound } from 'next/navigation'
import { getClient } from '@/sanity/lib/client'
import { draftMode } from 'next/headers'
import { urlForImage } from '@/sanity/lib/image'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import SummitNav from '@/components/summit/SummitNav'

export const dynamic = 'force-dynamic'

export default async function CurrentSummitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)

  if (!summit) {
    notFound()
  }

  const logoUrl = summit.heroImage
    ? urlForImage(summit.heroImage).width(200).height(200).url()
    : undefined

  return (
    <>
      <SummitNav
        navLinks={summit.navLinks ?? []}
        basePath="/summit"
        summitTitle={summit.title}
        communityLink={summit.communityLink}
        logoUrl={logoUrl}
        communityNavLabel={summit.labels?.communityNavLabel ?? undefined}
        signInLabel={summit.labels?.signInButton ?? undefined}
      />
      {/* Spacer for fixed nav — matches h-20 + py-4 */}
      <div className="pt-28" />
      <main className="min-h-screen">{children}</main>
    </>
  )
}
