import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import AllAccessButton from '@/components/summit/AllAccessButton'
import UpgradeCTA from '@/components/summit/UpgradeCTA'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { getSectionStyles } from '@/lib/summit-styles'
import SummitButton from '@/components/summit/SummitButton'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `${summit.labels?.communityTitle || 'Community'} — ${summit.title}` : 'Community',
    description: typeof summit?.description === 'string' ? summit.description : undefined,
  }
}

export default async function CommunityPage() {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const { has } = await auth()
  const hasAllAccess = summit.clerkPlanId
    ? await has({ plan: summit.clerkPlanId })
    : false

  const sectionStyles = getSectionStyles({
    summitStyles: summit.styles,
    pageKey: 'communityBg',
    fallbackPadding: 'normal',
  })

  return (
    <section className={sectionStyles.className} style={sectionStyles.style}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/summit/start-here"
            className="text-(--color-roti) hover:opacity-80 text-sm font-medium mb-6 inline-block"
          >
            &larr; {summit.labels?.backToWelcome || 'Back to Welcome'}
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            {summit.labels?.communityTitle || 'Community'}
          </h1>

          {summit.communityDescription &&
          summit.communityDescription.length > 0 ? (
            <div className="prose prose-lg max-w-none text-(--color-primary) mb-10">
              <PortableText value={summit.communityDescription} />
            </div>
          ) : (
            <p className="text-(--color-primary)/70 mb-10">
              {summit.labels?.communityFallback || 'Join our vibrant community of like-minded individuals committed to faith, wellness, and transformation.'}
            </p>
          )}

          <div className="mb-12 text-center">
            <SummitButton
              label={summit.labels?.joinCommunityButton || 'Join the Community'}
              href={summit.communityLink}
              external
              preset={summit.styles?.buttonPrimary}
            />
          </div>

          {!hasAllAccess && (
            <UpgradeCTA
              allAccessSalesUrl={summit.allAccessSalesUrl}
              basePath="/summit"
              message={summit.labels?.upgradeMessage || 'Get lifetime access to all presentations, resources, and bonus yoga classes.'}
              heading={summit.labels?.upgradeCtaHeading ?? undefined}
              description={summit.labels?.upgradeCtaDescription ?? undefined}
              buttonLabel={summit.labels?.upgradeCtaButton ?? undefined}
            />
          )}
        </div>
      </div>
    </section>
  )
}
