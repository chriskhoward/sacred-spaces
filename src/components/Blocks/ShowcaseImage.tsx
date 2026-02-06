import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface ShowcaseImageProps {
  image?: any;
  caption?: string;
  fullWidth?: boolean;
}

export default function ShowcaseImage({
  image,
  caption,
  fullWidth = true
}: ShowcaseImageProps) {
  const imageUrl = image?.asset ? urlForImage(image).url() : '/assets/images/about-group.jpg';

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
