import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { isAllowedIframeUrl } from '@/lib/iframe-utils'
import { auth } from '@clerk/nextjs/server'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import UpgradeCTA from '@/components/summit/UpgradeCTA'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `${summit.labels?.welcomeTitle || 'Welcome'} — ${summit.title}` : 'Summit',
    description: summit?.description,
  }
}

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
          {/* Optional banner */}
          {summit.welcomeBannerImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={urlForImage(summit.welcomeBannerImage).width(1200).url()}
                alt={`${summit.title} banner`}
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Welcome */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            {summit.labels?.welcomeTitle || `Welcome to ${summit.title}`}
          </h1>

          {/* Optional video */}
          {summit.welcomeVideoUrl && isAllowedIframeUrl(summit.welcomeVideoUrl) && (
            <div className="aspect-video mb-10 rounded-xl overflow-hidden bg-black">
              <iframe
                src={summit.welcomeVideoUrl}
                title={`${summit.title} welcome video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation"
                className="w-full h-full"
              />
            </div>
          )}

          {content && content.length > 0 ? (
            <div className="prose prose-lg max-w-none text-(--color-primary) mb-10">
              <PortableText value={content} />
            </div>
          ) : (
            <p className="text-(--color-primary)/70 mb-10">
              {summit.labels?.welcomeEmptyMessage || 'Welcome content coming soon.'}
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
                {summit.labels?.joinCommunityButton || 'Join the Community'}
              </a>
            </div>
          )}

          {/* Navigation Cards — driven by navLinks from Sanity */}
          {summit.navLinks && summit.navLinks.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {summit.navLinks.map((link) => {
                const isExternal = link.path.startsWith('http')
                const href = isExternal ? link.path : `/summit${link.path}`
                return isExternal ? (
                  <a
                    key={link.path}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-bold text-(--color-primary)">
                      {link.label}
                    </h3>
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    href={href}
                    className="bg-white rounded-xl p-6 shadow-sm border border-(--color-gallery) hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-bold text-(--color-primary)">
                      {link.label}
                    </h3>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Upgrade CTA for non-All Access users */}
          {!hasAllAccess && (
            <UpgradeCTA
              allAccessSalesUrl={summit.allAccessSalesUrl}
              basePath="/summit"
              message={summit.labels?.upgradeMessage || 'Get lifetime access to all presentations, resources, and bonus yoga classes.'}
            />
          )}
        </div>
      </div>
    </section>
  )
}
