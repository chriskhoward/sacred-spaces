import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import HeroButtons from '@/components/Home/HeroButtons';

interface HeroBlockProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  image?: { asset?: any };
  secondaryImage?: { asset?: any };
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

export default function HeroBlock({
  badge = "Teacher's Collective",
  title = "Where Your Calling Meets Community",
  subtitle = "A community-powered home created exclusively for Christ-Centered Yoga Teachers of Color—a space where your faith, culture, and calling are honored without compromise.",
  image,
  secondaryImage,
  primaryButtonText = "Join the Collective",
  secondaryButtonText = "Learn More"
}: HeroBlockProps) {
  const imageUrl = image?.asset ? urlForImage(image).url() : '/assets/images/shkrabaanthony.jpg';
  const secondaryImageUrl = secondaryImage?.asset ? urlForImage(secondaryImage).url() : null;

  return (
    <section className="relative min-h-screen flex items-center pt-[150px] pb-[75px] bg-(--color-primary) overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/images/banner_section_background.jpg')] bg-cover bg-center opacity-10"></div>
      
      {/* Secondary Decorative Image */}
      {secondaryImageUrl && (
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <Image 
            src={secondaryImageUrl} 
            alt="Decorative Element" 
            fill
            className="object-contain object-top-right"
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:flex-1 text-center lg:text-left">
            <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-white/20">
              {badge}
            </span>
            <h1 className="text-white text-4xl lg:text-7xl font-bold mb-8 leading-tight">
              {title}
            </h1>
            <p className="text-white/80 text-xl mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {subtitle}
            </p>
            <HeroButtons primaryText={primaryButtonText} secondaryText={secondaryButtonText} />
          </div>
          <div className="lg:flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] aspect-square">
              <div className="absolute inset-0 bg-linear-to-br from-(--color-roti) to-transparent opacity-20 rounded-full blur-2xl animate-pulse"></div>
              <Image 
                src={imageUrl} 
                alt={title} 
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover rounded-[50px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
