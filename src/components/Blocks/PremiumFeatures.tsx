import Link from 'next/link';
import { Leaf } from 'lucide-react';
import PortableTextOrString from '@/components/summit/PortableTextOrString';

interface PremiumFeatureItem {
  title: string;
  description: any;
}

interface PremiumFeaturesBlockProps {
  heading?: string;
  items?: PremiumFeatureItem[];
  buttonText?: string;
  buttonLink?: string;
}

export default function PremiumFeaturesBlock({
  heading,
  items = [],
  buttonText,
  buttonLink
}: PremiumFeaturesBlockProps) {
  return (
    <section className="py-20 lg:py-24 bg-(--color-gallery)">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {heading && (
            <h3 className="text-2xl lg:text-3xl font-bold text-(--color-primary) mb-10 text-center">
              {heading}
            </h3>
          )}
          <div className="space-y-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm"
              >
                <Leaf className="w-6 h-6 text-(--color-roti) shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-(--color-primary) text-lg mb-1">
                    {item.title}
                  </h4>
                  <PortableTextOrString value={item.description} className="text-gray-600 leading-relaxed" />
                </div>
              </div>
            ))}
          </div>
          {buttonText && buttonLink && (
            <div className="mt-12 text-center">
              <Link
                href={buttonLink}
                className="inline-block px-6 py-3 bg-(--color-primary) text-white rounded-full font-bold text-sm hover:bg-(--color-roti) transition-all shadow-xl"
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
