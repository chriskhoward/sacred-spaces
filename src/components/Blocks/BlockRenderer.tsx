import HeroBlock from './Hero';
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
        // Create the path for this block in the content array
        const blockPath = `content[_key=="${block._key}"]`;
        const sanityAttrs = createSanityDataAttribute(documentId, documentType, blockPath);

        // Wrapper div with data-sanity for click-to-edit
        const wrapWithSanity = (component: React.ReactNode) => (
          <div key={block._key} {...sanityAttrs}>
            {component}
          </div>
        );

        switch (block._type) {
          case 'heroBlock':
            return wrapWithSanity(<HeroBlock {...block} />);
          case 'pillarsBlock':
            return wrapWithSanity(<PillarsBlock {...block} />);
          case 'benefitsBlock':
            return wrapWithSanity(<BenefitsBlock {...block} />);
          case 'brandBlock':
            return wrapWithSanity(<BrandBlock {...block} />);
          case 'mediaTextBlock':
            return wrapWithSanity(<MediaTextBlock {...block} />);
          case 'imageBlock':
            return wrapWithSanity(<ShowcaseImage {...block} />);
          case 'videoBlock':
            return wrapWithSanity(<VideoBlock {...block} />);
          case 'testimonialBlock':
            return wrapWithSanity(<TestimonialsBlock {...block} />);
          case 'teamBlock':
            return wrapWithSanity(<TeamBlock {...block} />);
          case 'richTextBlock':
            return wrapWithSanity(<RichTextBlock {...block} />);
          case 'ctaBlock':
            return wrapWithSanity(<CTABlock {...block} />);
          case 'faqBlock':
            return wrapWithSanity(<FAQBlock {...block} />);
          default:
            return <div key={block._key}>Unknown block type: {block._type}</div>;
        }
      })}
    </>
  );
}
