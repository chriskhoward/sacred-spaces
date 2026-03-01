import { client } from '@/sanity/lib/client'
import { auth } from '@clerk/nextjs/server'
import { PortableText } from '@portabletext/react'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `Start Here — ${summit.title}` : 'Summit',
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            Welcome to {summit.title}
          </h1>

          {content && content.length > 0 ? (
            <div className="prose prose-lg max-w-none text-(--color-primary)">
              <PortableText value={content} />
            </div>
          ) : (
            <p className="text-(--color-primary)/70">
              Welcome content coming soon.
            </p>
          )}

          {summit.registrationUrl && !hasAllAccess && (
            <div className="mt-8">
              <a
                href={summit.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-(--color-roti) text-white rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-md"
              >
                Register Now
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
