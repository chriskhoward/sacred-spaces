import { type SchemaTypeDefinition } from 'sanity'
import { videoType } from './video'
import { videoCategoryType } from './videoCategory'
import { resourceType } from './resource'
import { resourceCategoryType } from './resourceCategory'
import { liveClassType } from './liveClass'
import { homeType } from './home'
import { aboutType } from './about'
import { alignmentSubmissionType } from './alignmentSubmission'
import { allowedUserType } from './allowedUser'
import { pageType } from './page'
import { teacherType } from './teacher'
import {
  heroBlock,
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
  closingStatementBlock
} from './pageBuilder'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    videoType,
    videoCategoryType,
    resourceType,
    resourceCategoryType,
    liveClassType,
    homeType,
    aboutType,
    pageType,
    heroBlock,
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
    alignmentSubmissionType,
    allowedUserType,
    teacherType
  ],
}
