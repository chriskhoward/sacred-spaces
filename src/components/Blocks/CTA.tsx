import Link from 'next/link';
import FilloutSliderButton from '@/components/FilloutSliderButton';

interface CTABlockProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  useFillout?: boolean;
}

export default function CTABlock({
  title = "Ready to Begin Your Journey?",
  description = "Join a community that honors your practice, your faith, and your culture.",
  buttonText = "Join the Collective",
  buttonLink = "/sign-up",
  useFillout: useFilloutProp,
}: CTABlockProps) {
  const useFillout = useFilloutProp ?? /join the collective/i.test(buttonText ?? '');

  return (
    <section className="py-24 bg-(--color-primary) relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/images/banner_section_background.jpg')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">{title}</h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        {useFillout ? (
          <FilloutSliderButton buttonText={buttonText} variant="cta" className="inline-flex justify-center" />
        ) : (
          <Link 
            href={buttonLink}
            className="inline-block px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold text-sm hover:bg-white hover:text-(--color-primary) transition-all shadow-2xl"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
