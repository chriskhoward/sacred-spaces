import { Check } from 'lucide-react';
import PortableTextOrString from '@/components/summit/PortableTextOrString';

interface TwoColumnCompareBlockProps {
  heading?: string;
  leftIntro?: string;
  leftItems?: string[];
  rightHeading?: string;
  rightIntro?: string;
  rightItems?: string[];
  closingText?: any;
}

export default function TwoColumnCompareBlock({
  heading,
  leftIntro,
  leftItems = [],
  rightHeading,
  rightIntro,
  rightItems = [],
  closingText
}: TwoColumnCompareBlockProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              {heading && (
                <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-8">
                  {heading}
                </h2>
              )}
              {leftIntro && (
                <p className="text-xl text-gray-700 mb-6 font-medium">
                  {leftIntro}
                </p>
              )}
              <ul className="space-y-4 mb-8 text-lg text-gray-600">
                {leftItems.map((item, index) => (
                  <li key={index} className="flex gap-3 items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-(--color-primary)/5 p-10 rounded-3xl border-l-4 border-(--color-roti)">
              {rightHeading && (
                <p className="text-2xl font-bold text-(--color-primary) mb-6">
                  {rightHeading}
                </p>
              )}
              {rightIntro && (
                <p className="text-lg text-gray-700 mb-6">
                  {rightIntro}
                </p>
              )}
              <ul className="space-y-3 mb-8 text-lg text-gray-700">
                {rightItems.map((item, index) => (
                  <li key={index} className="flex gap-3 items-center">
                    <Check className="w-5 h-5 text-(--color-roti) shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {closingText && (
                <PortableTextOrString value={closingText} className="text-xl font-medium text-(--color-primary) italic" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
