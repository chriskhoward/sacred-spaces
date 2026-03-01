import Link from 'next/link';
import { Check } from 'lucide-react';

interface ChecklistBlockProps {
  heading?: string;
  items?: string[];
  closingText?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function ChecklistBlock({
  heading,
  items = [],
  closingText,
  buttonText,
  buttonLink
}: ChecklistBlockProps) {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {heading && (
            <h3 className="text-2xl lg:text-3xl font-bold text-(--color-primary) mb-10 text-center">
              {heading}
            </h3>
          )}
          <ul className="space-y-5">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-4 bg-(--color-gallery) p-5 rounded-2xl">
                <span className="w-8 h-8 bg-(--color-roti) text-white rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </span>
                <p className="text-lg text-gray-700 leading-relaxed pt-0.5">
                  {item}
                </p>
              </li>
            ))}
          </ul>
          {closingText && (
            <p className="text-xl font-semibold text-(--color-primary) mt-10 text-center">
              {closingText}
            </p>
          )}
          {buttonText && buttonLink && (
            <div className="mt-8 text-center">
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
