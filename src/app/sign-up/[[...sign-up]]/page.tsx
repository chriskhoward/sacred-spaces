import { SignUp } from '@clerk/nextjs'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY, type SiteSettings } from '@/sanity/lib/siteSettings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | Flow in Faith',
  robots: { index: false, follow: false },
}

export default async function SignUpPage() {
  const settings = await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY).catch(() => null)

  const heading = settings?.signUpHeading || 'Join Flow in Faith'
  const subtext = settings?.signUpSubtext || 'Create your account and become part of our community'

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-(--color-primary) to-(--color-secondary) py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">{heading}</h2>
          <p className="text-(--color-sidecar)">{subtext}</p>
        </div>
        <SignUp
          fallbackRedirectUrl="/onboarding"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-2xl",
            }
          }}
        />
      </div>
    </div>
  )
}
