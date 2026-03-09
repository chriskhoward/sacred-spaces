// ---------- Types ----------

export interface SummitButtonPreset {
  bgColor?: string
  textColor?: string
  size?: string
}

export interface SummitStyles {
  buttonPrimary?: SummitButtonPreset
  buttonSecondary?: SummitButtonPreset
  defaultSectionBg?: string
  defaultSectionPadding?: string
  defaultSectionPaddingCustom?: string
  scheduleBg?: string
  contactBg?: string
  startHereBg?: string
  allAccessBg?: string
  communityBg?: string
  yogaClassesBg?: string
  speakersBg?: string
}

export interface SummitNavLink {
  label: string
  path: string
}

export interface SummitFaqItem {
  question: string
  answer: any[]
}

export interface SummitSpeaker {
  _id: string
  name: string
  headshot?: any // Sanity image reference
  bio?: any[]
  websiteUrl?: string
  socialLinks?: Array<{
    platform: string
    url: string
  }>
}

export interface SummitPresentationResource {
  title: string
  url?: string
  file?: {
    asset: {
      url: string
    }
  }
}

export interface SummitPresentation {
  _id: string
  title: string
  slug: { current: string }
  speaker: SummitSpeaker
  image?: any
  description?: any[]
  videoUrl?: string
  availableDate?: string
  expiresDate?: string
  dayNumber?: number
  timeSlot?: string
  startTime?: string
  resources?: SummitPresentationResource[]
  displayOrder?: number
  sessionType?: 'live' | 'recorded'
  buttonBgColor?: string
  buttonTextColor?: string
  buttonSize?: string
}

export interface SummitYogaClass {
  _id: string
  title: string
  instructor?: string
  videoUrl?: string
  description?: any[]
  startTime?: string
  displayOrder?: number
}

export interface Summit {
  _id: string
  title: string
  year: number
  slug?: { current: string }
  isCurrent?: boolean
  description?: any[]
  heroImage?: any
  startDate?: string
  endDate?: string
  communityLink?: string
  registrationUrl?: string
  allAccessSalesUrl?: string
  clerkPlanId?: string
  welcomeContentFree?: any[]
  welcomeContentAllAccess?: any[]
  welcomeBannerImage?: any
  welcomeVideoUrl?: string
  allAccessPerks?: any[]
  allAccessImage?: any
  communityDescription?: any[]
  scheduleBannerImage?: any
  navLinks?: SummitNavLink[]
  faqItems?: SummitFaqItem[]
  contactEmail?: string
  labels?: {
    welcomeTitle?: string | null
    welcomeEmptyMessage?: string | null
    joinCommunityButton?: string | null
    upgradeMessage?: string | null
    scheduleTitle?: string | null
    scheduleEmptyMessage?: string | null
    recordedSessionsLabel?: string | null
    dayPrefix?: string | null
    backToWelcome?: string | null
    backToSchedule?: string | null
    allAccessTitle?: string | null
    allAccessSuccessHeading?: string | null
    allAccessSuccessMessage?: string | null
    getAllAccessButton?: string | null
    communityTitle?: string | null
    communityFallback?: string | null
    yogaTitle?: string | null
    yogaEmptyMessage?: string | null
    viewScheduleButton?: string | null
    aboutPresentationHeading?: string | null
    includedInAllAccess?: string | null
    resourcesHeading?: string | null
    signInPrompt?: string | null
    noLongerFreeMessage?: string | null
    permanentAccessPrompt?: string | null
    communityNavLabel?: string | null
    signInButton?: string | null
    upgradeCtaHeading?: string | null
    upgradeCtaDescription?: string | null
    upgradeCtaButton?: string | null
    footerTermsLabel?: string | null
    footerPrivacyLabel?: string | null
    footerContactLabel?: string | null
    footerCopyrightText?: string | null
  } | null
  styles?: SummitStyles
}

// ---------- GROQ Projections ----------

const speakerProjection = `{
  _id,
  name,
  headshot,
  bio,
  websiteUrl,
  socialLinks
}`

const presentationProjection = `{
  _id,
  title,
  slug,
  speaker->${speakerProjection},
  image,
  description,
  videoUrl,
  availableDate,
  expiresDate,
  dayNumber,
  timeSlot,
  startTime,
  resources[] {
    title,
    url,
    file { asset-> { url } }
  },
  displayOrder,
  sessionType
}`

// ---------- GROQ Queries ----------

const summitProjection = `{
  ...,
  labels{...}
}`

export const CURRENT_SUMMIT_QUERY = `*[_type == "summit" && isCurrent == true][0] ${summitProjection}`

export const SUMMIT_BY_YEAR_QUERY = `*[_type == "summit" && year == $year][0] ${summitProjection}`

export const SUMMIT_PRESENTATIONS_QUERY = `*[_type == "summitPresentation" && summit._ref == $summitId] | order(dayNumber asc, displayOrder asc) ${presentationProjection}`

export const SUMMIT_PRESENTATION_BY_SLUG_QUERY = `*[_type == "summitPresentation" && summit._ref == $summitId && slug.current == $slug][0] ${presentationProjection}`

export const SUMMIT_YOGA_CLASSES_QUERY = `*[_type == "summitYogaClass" && summit._ref == $summitId] | order(displayOrder asc) {
  _id,
  title,
  instructor,
  videoUrl,
  description,
  startTime,
  displayOrder
}`

// ---------- Helpers ----------

/**
 * Check if a presentation is currently available for free users.
 * Returns true if now is between availableDate and expiresDate.
 */
export function isPresentationAvailableFree(presentation: SummitPresentation): boolean {
  if (!presentation.availableDate || !presentation.expiresDate) return false
  const now = new Date()
  return now >= new Date(presentation.availableDate) && now <= new Date(presentation.expiresDate)
}

/**
 * Group presentations by dayNumber for schedule display.
 */
export function groupPresentationsByDay(presentations: SummitPresentation[]): Map<number, SummitPresentation[]> {
  const grouped = new Map<number, SummitPresentation[]>()
  for (const p of presentations) {
    const day = p.dayNumber ?? 0
    if (!grouped.has(day)) grouped.set(day, [])
    grouped.get(day)!.push(p)
  }
  return grouped
}

/**
 * Generate a Google Calendar URL for a presentation.
 */
export function getGoogleCalendarUrl(presentation: SummitPresentation, durationMin = 60): string | null {
  if (!presentation.startTime) return null
  const start = new Date(presentation.startTime)
  const end = new Date(start.getTime() + durationMin * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: presentation.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${presentation.title}\n\nSpeaker: ${presentation.speaker?.name || 'TBA'}`,
    location: 'Online',
  })
  return `https://www.google.com/calendar/render?${params.toString()}`
}

/**
 * Generate a Google Calendar URL for a yoga class.
 */
export function getYogaCalendarUrl(yogaClass: SummitYogaClass, durationMin = 60): string | null {
  if (!yogaClass.startTime) return null
  const start = new Date(yogaClass.startTime)
  const end = new Date(start.getTime() + durationMin * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: yogaClass.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${yogaClass.title}\n\nInstructor: ${yogaClass.instructor || 'TBA'}`,
    location: 'Online',
  })
  return `https://www.google.com/calendar/render?${params.toString()}`
}

/**
 * Map speaker ID to list of presentation titles.
 */
export function getSpeakerPresentationTitles(presentations: SummitPresentation[]): Map<string, string[]> {
  const map = new Map<string, string[]>()
  for (const p of presentations) {
    if (!p.speaker?._id) continue
    const list = map.get(p.speaker._id) || []
    list.push(p.title)
    map.set(p.speaker._id, list)
  }
  return map
}

/**
 * Deduplicate speakers from presentations array.
 */
export function getUniqueSpeakers(presentations: SummitPresentation[]): SummitSpeaker[] {
  const seen = new Set<string>()
  const speakers: SummitSpeaker[] = []
  for (const p of presentations) {
    if (p.speaker && !seen.has(p.speaker._id)) {
      seen.add(p.speaker._id)
      speakers.push(p.speaker)
    }
  }
  return speakers
}
