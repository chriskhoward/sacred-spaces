import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface ShowcaseImageProps {
  image?: any;
  caption?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'logo';
}

export default function ShowcaseImage({
  image,
  caption,
  fullWidth = true,
  variant = 'default',
}: ShowcaseImageProps) {
  const imageUrl = image?.asset ? urlForImage(image).url() : variant === 'logo' ? '/images/homepage/logo-gold.png' : '/assets/images/about-group.jpg';

  if (variant === 'logo') {
    return (
      <section className="pt-14 md:pt-20 pb-4 px-6 sm:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className="relative w-52 h-52 md:w-64 md:h-64 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={caption || 'Logo'}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={fullWidth ? "py-0" : "py-24 container mx-auto px-4"}>
      <div className={`relative w-full overflow-hidden ${fullWidth ? 'h-[600px] lg:h-[800px]' : 'h-[500px] rounded-3xl shadow-2xl'}`}>
        <Image 
          src={imageUrl} 
          alt={caption || "Gallery Image"} 
          fill
          className="object-cover"
          priority
        />
        {caption && (
          <div className="absolute bottom-10 left-10 z-20 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm font-medium">
            {caption}
          </div>
        )}
      </div>
    </section>
  );
}
