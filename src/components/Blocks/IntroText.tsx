interface IntroTextBlockProps {
  lines?: string[];
  style?: 'light' | 'cream';
}

export default function IntroTextBlock({
  lines = [],
  style = 'light'
}: IntroTextBlockProps) {
  const bgClass = style === 'cream' ? 'bg-(--color-gallery)' : 'bg-white';

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <p className="text-xl lg:text-2xl text-(--color-primary) font-medium leading-relaxed max-w-4xl mx-auto text-center">
          {lines.map((line, index) => (
            <span key={index}>
              {line}
              {index < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
