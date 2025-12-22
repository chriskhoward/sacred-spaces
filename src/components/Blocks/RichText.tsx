import { PortableText } from '@portabletext/react';

interface RichTextBlockProps {
  heading?: string;
  body?: any[];
}

export default function RichTextBlock({
  heading,
  body = []
}: RichTextBlockProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {heading && (
          <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-(--color-primary) leading-tight text-center">
            {heading}
          </h2>
        )}
        <div className="prose prose-xl text-gray-700 mx-auto">
          <PortableText value={body} />
        </div>
      </div>
    </section>
  );
}
