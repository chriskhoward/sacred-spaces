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
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'heroBlock':
            return <HeroBlock key={block._key} {...block} />;
          case 'pillarsBlock':
            return <PillarsBlock key={block._key} {...block} />;
          case 'benefitsBlock':
            return <BenefitsBlock key={block._key} {...block} />;
          case 'brandBlock':
            return <BrandBlock key={block._key} {...block} />;
          case 'mediaTextBlock':
            return <MediaTextBlock key={block._key} {...block} />;
          case 'imageBlock':
            return <ShowcaseImage key={block._key} {...block} />;
          case 'videoBlock':
            return <VideoBlock key={block._key} {...block} />;
          case 'testimonialBlock':
            return <TestimonialsBlock key={block._key} {...block} />;
          case 'teamBlock':
            return <TeamBlock key={block._key} {...block} />;
          case 'richTextBlock':
            return <RichTextBlock key={block._key} {...block} />;
          case 'ctaBlock':
            return <CTABlock key={block._key} {...block} />;
          case 'faqBlock':
            return <FAQBlock key={block._key} {...block} />;
          default:
            return <div key={block._key}>Unknown block type: {block._type}</div>;
        }
      })}
    </>
  );
}
