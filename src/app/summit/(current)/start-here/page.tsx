import { client } from '@/sanity/lib/client'
import { auth } from '@clerk/nextjs/server'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import UpgradeCTA from '@/components/summit/UpgradeCTA'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `Start Here — ${summit.title}` : 'Summit',
    description: summit?.description,
  }
}

const navCards = [
  {
    title: 'Schedule',
    description: 'View all presentations organized by day and time.',
    path: '/schedule',
  },
  {
    title: 'Speakers',
    description: 'Meet the inspiring speakers sharing at this summit.',
    path: '/speakers',
  },
  {
    title: 'Yoga Classes',
    description: 'Bonus yoga classes available for All Access members.',
    path: '/yoga-classes',
  },
  {
    title: 'Contact',
    description: 'Questions? Reach out to our team for support.',
    path: '/contact',
  },
]

export default async function StartHerePage() {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const { has } = await auth()
  const hasAllAccess = summit.clerkPlanId
    ? await has({ plan: summit.clerkPlanId })
    : false

  const content = hasAllAccess
    ? summit.welcomeContentAllAccess
    : summit.welcomeContentFree

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Welcome */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            Welcome to {summit.title}
          </h1>

          {content && content.length > 0 ? (
            <div className="prose prose-lg max-w-none text-(--color-primary) mb-10">
              <PortableText value={content} />
            </div>
          ) : (
            <p className="text-(--color-primary)/70 mb-10">
              Welcome content coming soon.
            </p>
          )}

          {/* Community Link */}
          {summit.communityLink && (
            <div className="mb-10">
              <a
                href={summit.communityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-(--color-primary) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-md"
              >
                Join the Community
              </a>
            </div>
          )}

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {navCards.map((card) => (
              <Link
                key={card.path}
                href={`/summit${card.path}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-(--color-primary) mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-(--color-primary)/70">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Upgrade CTA for non-All Access users */}
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
