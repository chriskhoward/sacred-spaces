import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flowinfaith.com'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/studio/',
        '/api/',
        '/dashboard/',
        '/onboarding/',
        '/user-profile/',
        '/sign-in/',
        '/sign-up/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
