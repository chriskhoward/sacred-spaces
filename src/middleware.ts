import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/about',
  '/teacher-collective',
  '/directory',
  '/teachers(.*)',
  '/services',
  '/team',
  '/contact',
  '/studio(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth()

  // Protect non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  // Check for onboarding completion on protected routes
  if (userId && !isPublicRoute(request) && !request.nextUrl.pathname.startsWith('/onboarding')) {
    // Selection logic would go here if using custom claims
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
