interface StatementLine {
  text?: string;
  style?: 'normal' | 'bold' | 'highlight' | 'largeHighlight';
}

interface ClosingStatementBlockProps {
  lines?: StatementLine[];
}

export default function ClosingStatementBlock({
  lines = []
}: ClosingStatementBlockProps) {
  const getLineClass = (style?: string) => {
    switch (style) {
      case 'bold':
        return 'font-bold';
      case 'highlight':
        return 'text-(--color-roti) font-bold';
      case 'largeHighlight':
        return 'text-(--color-roti) font-bold text-5xl lg:text-7xl mt-8';
      default:
        return '';
    }
  };

  return (
    <section className="py-24 bg-(--color-primary) text-white text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6 text-2xl lg:text-4xl leading-tight">
          {lines.map((line, index) => {
            // Add divider before bold lines (except first)
            const showDivider = line.style === 'bold' && index > 0 && lines[index - 1]?.style !== 'bold';

            return (
              <div key={index}>
                {showDivider && (
                  <div className="h-px w-24 bg-white/30 mx-auto my-8"></div>
                )}
                <p className={getLineClass(line.style)}>
                  {line.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
