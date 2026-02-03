import { type SchemaTypeDefinition } from 'sanity'
import { videoType } from './video'
import { resourceType } from './resource'
import { liveClassType } from './liveClass'
import { homeType } from './home'
import { aboutType } from './about'
import { allowedUserType } from './allowedUser'
import { pageType } from './page'
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
    resourceType,
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
    allowedUserType
  ],
}
