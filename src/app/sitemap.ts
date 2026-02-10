
import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://flowinfaith.com'

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/apply',
        '/join',
        '/directory',
        '/teacher-collective',
        '/teacher-collective/calls',
        '/teacher-collective/resources',
        '/live-classes',
        '/video-library',
        '/sanctuary',
        '/community',
        '/de-bolton',
        '/queen-robertson',
        // Auth & onboarding
        '/sign-in',
        '/sign-up',
        '/onboarding',
        // Logged-in dashboards & profile
        '/dashboard',
        '/dashboard/directory-profile',
        '/dashboard/teacher-collective',
        '/user-profile',
        // Misc utility pages
        '/component-guide',
        '/studio',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Fetch Dynamic Pages (Generic Pages)
    const pagesQuery = `*[_type == "page"] { "slug": slug.current, _updatedAt }`
    const pages = await client.fetch(pagesQuery)

    const dynamicPages = pages.map((page: { slug: string, _updatedAt: string }) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // 3. Fetch Teachers
    const teachersQuery = `*[_type == "teacher"] { "id": _id, _updatedAt }`
    const teachers = await client.fetch(teachersQuery)

    const teacherPages = teachers.map((teacher: { id: string, _updatedAt: string }) => ({
        url: `${baseUrl}/teachers/${teacher.id}`,
        lastModified: new Date(teacher._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...staticRoutes, ...dynamicPages, ...teacherPages]
}
