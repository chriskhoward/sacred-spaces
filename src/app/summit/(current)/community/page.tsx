import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import AllAccessButton from '@/components/summit/AllAccessButton'
import UpgradeCTA from '@/components/summit/UpgradeCTA'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `Community — ${summit.title}` : 'Community',
    description: summit?.description,
  }
}

export default async function CommunityPage() {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const { has } = await auth()
  const hasAllAccess = summit.clerkPlanId
    ? await has({ plan: summit.clerkPlanId })
    : false

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/summit/start-here"
            className="text-(--color-roti) hover:opacity-80 text-sm font-medium mb-6 inline-block"
          >
            &larr; Back to Welcome
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            Community
          </h1>

          {summit.communityDescription &&
          summit.communityDescription.length > 0 ? (
            <div className="prose prose-lg max-w-none text-(--color-primary) mb-10">
              <PortableText value={summit.communityDescription} />
            </div>
          ) : (
            <p className="text-(--color-primary)/70 mb-10">
              Join our vibrant community of like-minded individuals committed to
              faith, wellness, and transformation.
            </p>
          )}

          {summit.communityLink && (
            <div className="mb-12 text-center">
              <a
                href={summit.communityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-(--color-roti) text-white rounded-full font-bold text-lg uppercase tracking-wide hover:opacity-90 transition-opacity shadow-lg"
              >
                Join the Community
              </a>
            </div>
          )}

          {!hasAllAccess && (
            <UpgradeCTA
              allAccessSalesUrl={summit.allAccessSalesUrl}
              basePath="/summit"
              message="Get lifetime access to all presentations, resources, and bonus yoga classes."
            />
          )}
        </div>
      </div>
    </section>
  )
}
