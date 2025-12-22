import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  image?: any;
}

interface TestimonialBlockProps {
  heading?: string;
  items?: TestimonialItem[];
}

export default function TestimonialsBlock({
  heading = "Voices from the Collective",
  items = [
    { 
      quote: "Finally, a space where I don't have to check my culture at the door to practice my faith.", 
      author: "Sarah J.", 
      role: "Yoga Teacher" 
    },
    { 
      quote: "The combination of theological depth and professional support is unmatched.", 
      author: "Michael K.", 
      role: "Collective Member" 
    }
  ]
}: TestimonialBlockProps) {
  return (
    <section className="py-24 bg-(--color-gallery)">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="text-4xl lg:text-6xl font-bold text-center text-(--color-primary) mb-20">{heading}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white p-12 rounded-[5rem_0_5rem_0] shadow-xl relative mt-8">
              <div className="absolute -top-10 left-12 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image 
                  src={item.image?.asset ? urlForImage(item.image).url() : "/assets/images/team/placeholder.png"} 
                  alt={item.author} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pt-8">
                <p className="text-xl italic text-gray-700 leading-relaxed mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <h4 className="font-bold text-(--color-primary) text-lg">{item.author}</h4>
                  {item.role && <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{item.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
