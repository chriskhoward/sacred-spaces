import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


export default clerkMiddleware(async (auth, request) => {

  // For this project, many pages are public marketing pages built in Sanity.
  // We only really want to protect the /dashboard, /onboarding, and /user-profile routes.
  const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/onboarding(.*)',
    '/user-profile(.*)',
  ])

  // Protect designated routes
  if (isProtectedRoute(request)) {
    await auth.protect()
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
