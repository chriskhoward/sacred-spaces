import HeroBlock from './Hero';
import HomeHeroBlock from './HomeHero';
import PillarsBlock from './Pillars';
import BenefitsBlock from './Benefits';
import BrandBlock from './Brand';
import TeamBlock from './Team';
import RichTextBlock from './RichText';
import CTABlock from './CTA';
import MediaTextBlock from './MediaText';
import ShowcaseImage from './ShowcaseImage';
import VideoBlock from './VideoBlock';
import TestimonialsBlock from './Testimonials';
import FAQBlock from './FAQ';
import EmpathySectionBlock from './EmpathySection';
import HighlightTextBlock from './HighlightText';
import FeatureGridBlock from './FeatureGrid';
import PremiumFeaturesBlock from './PremiumFeatures';
import FounderBioBlock from './FounderBio';
import TextCtaBlock from './TextCta';
import ChecklistBlock from './Checklist';
import IntroTextBlock from './IntroText';
import ProseSectionBlock from './ProseSection';
import TwoColumnCompareBlock from './TwoColumnCompare';
import SpaceCardsBlock from './SpaceCards';
import PathChooserBlock from './PathChooser';
import ClosingStatementBlock from './ClosingStatement';
import BannerTextBlock from './BannerText';
import { getSectionStyles } from '@/lib/summit-styles';
import type { PageStyles } from '@/sanity/lib/pageStyles';

interface BlockRendererProps {
  blocks: Array<{ _type: string; _key: string; [key: string]: any }>;
  documentId?: string;
  documentType?: string;
  pageStyles?: PageStyles | null;
}

// Helper to create data-sanity attribute for visual editing
function createSanityDataAttribute(
  documentId: string | undefined,
  documentType: string | undefined,
  path: string
): Record<string, string> | undefined {
  if (!documentId || !documentType) return undefined;

  return {
    'data-sanity': JSON.stringify({
      origin: 'sanity.io',
      href: `/studio/intent/edit/id=${documentId};type=${documentType};path=${path}`,
    }),
  };
}

export default function BlockRenderer({ blocks, documentId, documentType, pageStyles }: BlockRendererProps) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block) => {
        // Destructure out Sanity internal fields, keep the rest as props
        const { _type, _key, ...blockProps } = block;

        // Merge page-level style fallbacks for blocks that support them
        const hasBlockButton = block.buttonSize != null || block.buttonColor != null || block.buttonAlignment != null;
        const blocksWithButtons = new Set([
          'heroBlock', 'homeHeroBlock', 'benefitsBlock', 'mediaTextBlock', 'ctaBlock',
          'founderBioBlock', 'textCtaBlock', 'checklistBlock', 'proseSectionBlock', 'empathySectionBlock',
        ]);
        const blocksWithSections = new Set([
          'checklistBlock', 'ctaBlock', 'richTextBlock', 'empathySectionBlock', 'textCtaBlock',
          'proseSectionBlock', 'introTextBlock',
        ]);
        const useMerged = blocksWithButtons.has(_type) || blocksWithSections.has(_type);
        const mergedProps = useMerged
          ? {
              ...blockProps,
              sectionSpacing: block.sectionSpacing ?? pageStyles?.defaultSectionPadding,
              sectionBgColor: block.sectionBgColor ?? pageStyles?.defaultSectionBg,
              sectionBgImage: block.sectionBgImage,
              ...(blocksWithButtons.has(_type) && !hasBlockButton && pageStyles?.buttonPrimary
                ? { buttonPreset: pageStyles.buttonPrimary }
                : {}),
            }
          : blockProps;

        // Create the path for this block in the content array
        const blockPath = `content[_key=="${_key}"]`;
        const sanityAttrs = createSanityDataAttribute(documentId, documentType, blockPath);

        // Wrapper div with data-sanity for click-to-edit
        const wrapWithSanity = (component: React.ReactNode) => {
          const bgColor = block.sectionBgColor ?? pageStyles?.defaultSectionBg ?? undefined;
          const sectionStyles = getSectionStyles({
            overrideBgColor: bgColor,
            overridePadding: block.sectionSpacing ?? pageStyles?.defaultSectionPadding ?? undefined,
            overridePaddingCustom: pageStyles?.defaultSectionPaddingCustom,
            pageStyles: pageStyles ?? undefined,
            fallbackPadding: 'normal',
          });

          const hasStyles = bgColor || block.sectionSpacing || pageStyles?.defaultSectionBg || pageStyles?.defaultSectionPadding;

          return (
            <div
              key={_key}
              {...sanityAttrs}
              className={hasStyles ? sectionStyles.className : undefined}
              style={hasStyles ? sectionStyles.style : undefined}
            >
              {component}
            </div>
          );
        };

        switch (_type) {
          case 'homeHeroBlock':
            return wrapWithSanity(<HomeHeroBlock {...mergedProps} />);
          case 'heroBlock':
            return wrapWithSanity(<HeroBlock {...mergedProps} />);
          case 'pillarsBlock':
            return wrapWithSanity(<PillarsBlock {...mergedProps} />);
          case 'benefitsBlock':
            return wrapWithSanity(<BenefitsBlock {...mergedProps} />);
          case 'brandBlock':
            return wrapWithSanity(<BrandBlock {...mergedProps} />);
          case 'mediaTextBlock':
            return wrapWithSanity(<MediaTextBlock {...mergedProps} />);
          case 'imageBlock':
            return wrapWithSanity(<ShowcaseImage {...mergedProps} />);
          case 'videoBlock':
            return wrapWithSanity(<VideoBlock {...mergedProps} />);
          case 'testimonialBlock':
            return wrapWithSanity(<TestimonialsBlock {...mergedProps} />);
          case 'teamBlock':
            return wrapWithSanity(<TeamBlock {...mergedProps} />);
          case 'richTextBlock':
            return wrapWithSanity(<RichTextBlock {...mergedProps} />);
          case 'ctaBlock':
            return wrapWithSanity(<CTABlock {...mergedProps} />);
          case 'faqBlock':
            return wrapWithSanity(<FAQBlock {...mergedProps} />);
          case 'empathySectionBlock':
            return wrapWithSanity(<EmpathySectionBlock {...mergedProps} />);
          case 'highlightTextBlock':
            return wrapWithSanity(<HighlightTextBlock {...mergedProps} />);
          case 'featureGridBlock':
            return wrapWithSanity(<FeatureGridBlock {...mergedProps} />);
          case 'premiumFeaturesBlock':
            return wrapWithSanity(<PremiumFeaturesBlock {...mergedProps} />);
          case 'founderBioBlock':
            return wrapWithSanity(<FounderBioBlock {...mergedProps} />);
          case 'textCtaBlock':
            return wrapWithSanity(<TextCtaBlock {...mergedProps} />);
          case 'checklistBlock':
            return wrapWithSanity(<ChecklistBlock {...mergedProps} />);
          case 'introTextBlock':
            return wrapWithSanity(<IntroTextBlock {...mergedProps} />);
          case 'proseSectionBlock':
            return wrapWithSanity(<ProseSectionBlock {...mergedProps} />);
          case 'twoColumnCompareBlock':
            return wrapWithSanity(<TwoColumnCompareBlock {...mergedProps} />);
          case 'spaceCardsBlock':
            return wrapWithSanity(<SpaceCardsBlock {...mergedProps} />);
          case 'pathChooserBlock':
            return wrapWithSanity(<PathChooserBlock {...mergedProps} />);
          case 'closingStatementBlock':
            return wrapWithSanity(<ClosingStatementBlock {...mergedProps} />);
          case 'bannerTextBlock':
            return wrapWithSanity(<BannerTextBlock {...mergedProps} />);
          default:
            return <div key={_key}>Unknown block type: {_type}</div>;
        }
      })}
    </>
  );
}
