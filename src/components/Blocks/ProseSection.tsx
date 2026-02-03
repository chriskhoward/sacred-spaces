interface ProseSectionBlockProps {
  heading?: string;
  paragraphs?: string[];
  style?: 'light' | 'cream';
}

export default function ProseSectionBlock({
  heading,
  paragraphs = [],
  style = 'cream'
}: ProseSectionBlockProps) {
  const bgClass = style === 'cream' ? 'bg-(--color-gallery)' : 'bg-white';

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {heading && (
            <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-8">
              {heading}
            </h2>
          )}
          <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
