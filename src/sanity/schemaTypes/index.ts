import { type SchemaTypeDefinition } from 'sanity'
import { videoType } from './video'
import { videoCategoryType } from './videoCategory'
import { resourceType } from './resource'
import { resourceCategoryType } from './resourceCategory'
import { liveClassCategoryType } from './liveClassCategory'
import { liveClassType } from './liveClass'
import { homeType } from './home'
import { aboutType } from './about'
import { alignmentSubmissionType } from './alignmentSubmission'
import { allowedUserType } from './allowedUser'
import { pageType } from './page'
import { teacherType } from './teacher'
import { teacherOnboardingCategoryType } from './teacherOnboardingCategory'
import { teacherOnboardingItemType } from './teacherOnboardingItem'
import { teacherCollectiveFaqsType } from './teacherCollectiveFaqs'
import { teacherCollectiveDashboardType } from './teacherCollectiveDashboard'
import { membershipPlanType } from './membershipPlan'
import { siteSettingsType } from './siteSettings'
import { navigationType } from './navigation'
import { announcementBarType } from './announcementBar'
import {
  heroBlock,
  homeHeroBlock,
  brandBlock,
  pillarsBlock,
  benefitsBlock,
  mediaTextBlock,
  imageBlock,
  videoBlock,
  testimonialBlock,
  teamBlock,
  richTextBlock,
  ctaBlock,
  faqBlock,
  empathySectionBlock,
  highlightTextBlock,
  featureGridBlock,
  premiumFeaturesBlock,
  founderBioBlock,
  textCtaBlock,
  checklistBlock,
  introTextBlock,
  proseSectionBlock,
  twoColumnCompareBlock,
  spaceCardsBlock,
  pathChooserBlock,
  closingStatementBlock,
  bannerTextBlock
} from './pageBuilder'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    videoType,
    videoCategoryType,
    resourceType,
    resourceCategoryType,
    liveClassType,
    liveClassCategoryType,
    homeType,
    aboutType,
    pageType,
    heroBlock,
    homeHeroBlock,
    brandBlock,
    pillarsBlock,
    benefitsBlock,
    mediaTextBlock,
    imageBlock,
    videoBlock,
    testimonialBlock,
    teamBlock,
    richTextBlock,
    ctaBlock,
    faqBlock,
    empathySectionBlock,
    highlightTextBlock,
    featureGridBlock,
    premiumFeaturesBlock,
    founderBioBlock,
    textCtaBlock,
    checklistBlock,
    introTextBlock,
    proseSectionBlock,
    twoColumnCompareBlock,
    spaceCardsBlock,
    pathChooserBlock,
    closingStatementBlock,
    bannerTextBlock,
    alignmentSubmissionType,
    allowedUserType,
    teacherType,
    teacherOnboardingCategoryType,
    teacherOnboardingItemType,
    teacherCollectiveFaqsType,
    teacherCollectiveDashboardType,
    membershipPlanType,
    siteSettingsType,
    navigationType,
    announcementBarType
  ],
}
