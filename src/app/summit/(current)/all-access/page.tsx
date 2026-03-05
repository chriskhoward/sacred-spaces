import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { auth } from '@clerk/nextjs/server'
import { PricingTable } from '@clerk/nextjs'
import { PortableText } from '@portabletext/react'
import { Check } from 'lucide-react'
import { CURRENT_SUMMIT_QUERY, type Summit } from '@/sanity/lib/summit'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const summit = await client.fetch<Summit | null>(CURRENT_SUMMIT_QUERY)
  return {
    title: summit ? `All Access Pass — ${summit.title}` : 'All Access Pass',
    description: summit?.description,
  }
}

export default async function AllAccessPage() {
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
            All Access Pass
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
            <div className="bg-(--color-sidecar) rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary) mb-4">
                You Have All Access! <Check className="w-6 h-6 inline" />
              </h2>
              <p className="text-(--color-primary)/80">
                You have permanent, unlimited access to all summit content,
                presentations, resources, and bonus material.
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
                <div className="text-center">
                  <a
                    href={summit.allAccessSalesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-10 py-4 bg-(--color-roti) text-white rounded-full font-bold text-lg uppercase tracking-wide hover:opacity-90 transition-opacity shadow-lg"
                  >
                    Get All Access Pass
                  </a>
                </div>
              ) : (
                <PricingTable />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
