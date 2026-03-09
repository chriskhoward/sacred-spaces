import { getClient } from '@/sanity/lib/client'
import { draftMode } from 'next/headers'
import { urlForImage } from '@/sanity/lib/image'
import { auth } from '@clerk/nextjs/server'
import { PricingTable } from '@clerk/nextjs'
import { PortableText } from '@portabletext/react'
import { Check } from 'lucide-react'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import SummitBreadcrumbs from '@/components/summit/SummitBreadcrumbs'
import { getSectionStyles } from '@/lib/summit-styles'
import SummitButton from '@/components/summit/SummitButton'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `${summit.labels?.allAccessTitle || 'All Access Pass'} — ${summit.title}` : 'All Access Pass',
    description: typeof summit?.description === 'string' ? summit.description : undefined,
  }
}

export default async function AllAccessPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  if (!summit) notFound()

  const { has } = await auth()
  const hasAllAccess = summit.clerkPlanId
    ? await has({ plan: summit.clerkPlanId })
    : false

  const sectionStyles = getSectionStyles({
    summitStyles: summit.styles,
    pageKey: 'allAccessBg',
    fallbackPadding: 'normal',
  })

  return (
    <section className={sectionStyles.className} style={sectionStyles.style}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <SummitBreadcrumbs summitTitle={summit.title} basePath="/summit" current={summit.labels?.allAccessTitle || 'All Access'} />

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">
            {summit.labels?.allAccessTitle || 'All Access Pass'}
          </h1>

          {summit.allAccessImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={urlForImage(summit.allAccessImage).width(800).url()}
                alt="All Access Pass"
                width={800}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Already purchased */}
          {hasAllAccess ? (
            <div className="bg-(--color-sidecar) rounded-2xl p-8 md:p-12 text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary) mb-4">
                {summit.labels?.allAccessSuccessHeading || 'You Have All Access!'} <Check className="w-6 h-6 inline" />
              </h2>
              <p className="text-(--color-primary)/80">
                {summit.labels?.allAccessSuccessMessage || 'You have permanent, unlimited access to all summit content, presentations, resources, and bonus material.'}
              </p>
            </div>
          ) : (
            <>
              {/* Perks description */}
              {summit.allAccessPerks && summit.allAccessPerks.length > 0 && (
                <div className="prose prose-lg max-w-none text-(--color-primary) mb-12">
                  <PortableText value={summit.allAccessPerks} />
                </div>
              )}

              {/* Purchase option */}
              {summit.allAccessSalesUrl ? (
                <div className="text-center mb-10">
                  <SummitButton
                    label={summit.labels?.getAllAccessButton || 'Get All Access Pass'}
                    href={summit.allAccessSalesUrl}
                    external
                    preset={summit.styles?.buttonPrimary}
                  />
                </div>
              ) : (
                <div className="mb-10">
                  <PricingTable />
                </div>
              )}
            </>
          )}

          {/* Custom content section - client can build anything here */}
          {summit.allAccessContent && summit.allAccessContent.length > 0 && (
            <div className="prose prose-lg max-w-none text-(--color-primary)">
              <PortableText value={summit.allAccessContent} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
