interface HighlightTextBlockProps {
  statements?: string[];
  style?: 'light' | 'dark' | 'cream';
}

export default function HighlightTextBlock({
  statements = [],
  style = 'light'
}: HighlightTextBlockProps) {
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-(--color-primary)',
    cream: 'bg-(--color-gallery)'
  }[style];

  const textClass = style === 'dark' ? 'text-white' : 'text-(--color-primary)';

  return (
    <section className={`py-20 lg:py-28 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          {statements.map((statement, index) => (
            <h3
              key={index}
              className={`text-2xl lg:text-3xl font-bold leading-relaxed ${textClass} ${
                index > 0 ? 'pt-6 border-t border-gray-200' : ''
              }`}
            >
              {statement}
            </h3>
          ))}
        </div>
      </div>
    </section>
  );
}
