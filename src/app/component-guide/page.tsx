import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBlock from '@/components/Blocks/Hero';
import BrandBlock from '@/components/Blocks/Brand';
import PillarsBlock from '@/components/Blocks/Pillars';
import BenefitsBlock from '@/components/Blocks/Benefits';
import MediaTextBlock from '@/components/Blocks/MediaText';
import ShowcaseImage from '@/components/Blocks/ShowcaseImage';
import VideoBlock from '@/components/Blocks/VideoBlock';
import TestimonialsBlock from '@/components/Blocks/Testimonials';
import TeamBlock from '@/components/Blocks/Team';
import RichTextBlock from '@/components/Blocks/RichText';
import CTABlock from '@/components/Blocks/CTA';

export const metadata: Metadata = {
  title: 'Component Guide | Sacred Spaces',
  robots: {
    index: false,
    follow: false,
  },
};

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-gray-100 py-4 px-8 border-b border-gray-200">
      <div className="container mx-auto">
        <span className="text-xs font-bold uppercase tracking-[3px] text-gray-500">
          Component: <span className="text-(--color-primary)">{title}</span>
        </span>
      </div>
    </div>
  );
}

export default function ComponentGuidePage() {
  return (
    <main className="bg-white">
      <Navbar />
      
      {/* Introduction */}
      <section className="bg-(--color-gallery) pt-40 pb-24 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-7xl font-bold text-(--color-primary) mb-6">Component Guide</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A living library of modular building blocks designed for the Sacred Spaces platform. 
            All components are fully responsive and integrated with Sanity CMS.
          </p>
        </div>
      </section>

      {/* Hero Block */}
      <section>
        <SectionHeader title="Hero" />
        <HeroBlock 
          badge="Design System"
          title="The Hero Block Title"
          subtitle="This is where the main value proposition goes. It's designed to be big, bold, and immersive."
          primaryButtonText="Join Now"
          secondaryButtonText="Learn More"
        />
      </section>

      {/* Brand Block */}
      <section>
        <SectionHeader title="Brand Message / Quote" />
        <BrandBlock 
          quote="This is a featured brand quote or mission statement that spans the width of the page."
          body="Smaller supporting text can go here to add more context to the message above."
        />
      </section>

      {/* Pillars Block */}
      <section>
        <SectionHeader title="Pillars of Transformation" />
        <PillarsBlock 
          heading="Our Core Pillars"
          subheading="The Foundation"
          description="A demonstration of the four-column layout used for core values or pillars."
          items={[
            { title: 'Belonging', description: 'Feel seen, supported, and connected inside a community.', icon: '🤝' },
            { title: 'Visibility', description: 'Access opportunities that highlight your gifts.', icon: '✨' },
            { title: 'Connection', description: 'Build relationships that spark creativity.', icon: '🔗' },
            { title: 'Lead Boldly', description: 'Move with confidence into the spaces God is guiding you.', icon: '🛡️' },
          ]}
        />
      </section>

      {/* Media + Text Block (Left) */}
      <section>
        <SectionHeader title="Media + Text (Image Left)" />
        <MediaTextBlock 
          badge="Layout Option A"
          title="Image on the Left"
          imagePosition="left"
          body={[
            {
              _type: 'block',
              children: [{ _type: 'span', text: 'This layout is perfect for storytelling or explaining deep concepts. Notice how the image takes up 50% of the screen while text remains centered and readable.' }]
            }
          ]}
        />
      </section>

      {/* Media + Text Block (Right) */}
      <section>
        <SectionHeader title="Media + Text (Image Right)" />
        <MediaTextBlock 
          badge="Layout Option B"
          title="Image on the Right"
          imagePosition="right"
          body={[
            {
              _type: 'block',
              children: [{ _type: 'span', text: 'You can easily flip the positioning in Sanity. Using a mix of left and right-aligned blocks creates a balanced, professional scroll experience.' }]
            }
          ]}
        />
      </section>

      {/* Showcase Image Block */}
      <section>
        <SectionHeader title="Showcase Image (Full Width)" />
        <ShowcaseImage 
          caption="Immersive Photography / Full Width Brand Moment"
          fullWidth={true}
        />
      </section>

      {/* Video Block */}
      <section>
        <SectionHeader title="Video Embed" />
        <VideoBlock 
          title="Video Presentation Layout"
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
      </section>

      {/* Benefits Block */}
      <section>
        <SectionHeader title="Benefits Grid" />
        <BenefitsBlock 
          title="Core Membership Perks"
          description="A layout combining a left-side description with a right-side grid of benefits."
          items={[
            { title: 'Resource Library', description: 'Access to curated sequences and training materials.' },
            { title: 'Monthly Calls', description: 'Live sessions with the leadership team and peers.' },
            { title: 'Member Directory', description: 'Visibility for your teaching practice and services.' },
            { title: 'Secure Community', description: 'A private space for vulnerable and honest sharing.' },
          ]}
          buttonText="See All Benefits"
        />
      </section>

      {/* Team Block */}
      <section>
        <SectionHeader title="Leadership Team" />
        <TeamBlock 
          heading="Sticky Leadership Layout"
          description="This component features a sticky left column for the heading and an scrolling right column for the story content."
        />
      </section>

      {/* Testimonials Block */}
      <section>
        <SectionHeader title="Testimonial Grid" />
        <TestimonialsBlock 
          heading="Student Feedback"
          items={[
            { quote: "This collective has completely changed how I approach my teaching and my faith.", author: "Jane Doe", role: "Yoga Teacher" },
            { quote: "I've never felt more seen or supported in a professional space.", author: "John Smith", role: "Collective Member" },
          ]}
        />
      </section>

      {/* Rich Text Block */}
      <section>
        <SectionHeader title="Rich Text Center" />
        <RichTextBlock 
          heading="Long-form Content Layout"
          body={[
            {
              _type: 'block',
              children: [{ _type: 'span', text: 'The Rich Text block is designed for long-form reading. It uses a narrow container (max-w-3xl) to maintain optimal line length and readability across all devices.' }]
            },
            {
              _type: 'block',
              children: [{ _type: 'span', text: 'This block is used for "Our Difference", "Our Mission", and other deep-dive content sections.', marks: ['italic'] }]
            }
          ]}
        />
      </section>

      {/* CTA Block */}
      <section>
        <SectionHeader title="Call to Action (CTA)" />
        <CTABlock 
          title="The Final Step"
          description="Designed to catch the eye at the end of a page and drive users toward registration or discovery."
          buttonText="Get Started Today"
          buttonLink="/sign-up"
        />
      </section>

      <Footer />
    </main>
  );
}
