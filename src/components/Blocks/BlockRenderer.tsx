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

interface BlockRendererProps {
  blocks: Array<{ _type: string; _key: string; [key: string]: any }>;
  documentId?: string;
  documentType?: string;
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

export default function BlockRenderer({ blocks, documentId, documentType }: BlockRendererProps) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block) => {
        // Destructure out Sanity internal fields, keep the rest as props
        const { _type, _key, ...blockProps } = block;

        // Create the path for this block in the content array
        const blockPath = `content[_key=="${_key}"]`;
        const sanityAttrs = createSanityDataAttribute(documentId, documentType, blockPath);

        // Wrapper div with data-sanity for click-to-edit
        const wrapWithSanity = (component: React.ReactNode) => (
          <div key={_key} {...sanityAttrs}>
            {component}
          </div>
        );

        switch (_type) {
          case 'homeHeroBlock':
            return wrapWithSanity(<HomeHeroBlock {...blockProps} />);
          case 'heroBlock':
            return wrapWithSanity(<HeroBlock {...blockProps} />);
          case 'pillarsBlock':
            return wrapWithSanity(<PillarsBlock {...blockProps} />);
          case 'benefitsBlock':
            return wrapWithSanity(<BenefitsBlock {...blockProps} />);
          case 'brandBlock':
            return wrapWithSanity(<BrandBlock {...blockProps} />);
          case 'mediaTextBlock':
            return wrapWithSanity(<MediaTextBlock {...blockProps} />);
          case 'imageBlock':
            return wrapWithSanity(<ShowcaseImage {...blockProps} />);
          case 'videoBlock':
            return wrapWithSanity(<VideoBlock {...blockProps} />);
          case 'testimonialBlock':
            return wrapWithSanity(<TestimonialsBlock {...blockProps} />);
          case 'teamBlock':
            return wrapWithSanity(<TeamBlock {...blockProps} />);
          case 'richTextBlock':
            return wrapWithSanity(<RichTextBlock {...blockProps} />);
          case 'ctaBlock':
            return wrapWithSanity(<CTABlock {...blockProps} />);
          case 'faqBlock':
            return wrapWithSanity(<FAQBlock {...blockProps} />);
          case 'empathySectionBlock':
            return wrapWithSanity(<EmpathySectionBlock {...blockProps} />);
          case 'highlightTextBlock':
            return wrapWithSanity(<HighlightTextBlock {...blockProps} />);
          case 'featureGridBlock':
            return wrapWithSanity(<FeatureGridBlock {...blockProps} />);
          case 'premiumFeaturesBlock':
            return wrapWithSanity(<PremiumFeaturesBlock {...blockProps} />);
          case 'founderBioBlock':
            return wrapWithSanity(<FounderBioBlock {...blockProps} />);
          case 'textCtaBlock':
            return wrapWithSanity(<TextCtaBlock {...blockProps} />);
          case 'checklistBlock':
            return wrapWithSanity(<ChecklistBlock {...blockProps} />);
          case 'introTextBlock':
            return wrapWithSanity(<IntroTextBlock {...blockProps} />);
          case 'proseSectionBlock':
            return wrapWithSanity(<ProseSectionBlock {...blockProps} />);
          case 'twoColumnCompareBlock':
            return wrapWithSanity(<TwoColumnCompareBlock {...blockProps} />);
          case 'spaceCardsBlock':
            return wrapWithSanity(<SpaceCardsBlock {...blockProps} />);
          case 'pathChooserBlock':
            return wrapWithSanity(<PathChooserBlock {...blockProps} />);
          case 'closingStatementBlock':
            return wrapWithSanity(<ClosingStatementBlock {...blockProps} />);
          case 'bannerTextBlock':
            return wrapWithSanity(<BannerTextBlock {...blockProps} />);
          default:
            return <div key={_key}>Unknown block type: {_type}</div>;
        }
      })}
    </>
  );
}
