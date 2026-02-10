interface HighlightTextBlockProps {
  statements?: string[];
  style?: 'light' | 'dark' | 'cream';
  variant?: 'default' | 'bannerCentered' | 'bannerTwoLineGold' | 'bannerWhite' | 'bannerGoldLarge';
}

const sectionPad = 'py-14 md:py-20 px-6 sm:px-8';
const containerNarrow = 'max-w-4xl mx-auto';
const containerWide = 'max-w-6xl mx-auto';

export default function HighlightTextBlock({
  statements = [],
  style = 'light',
  variant = 'default',
}: HighlightTextBlockProps) {
  // Homepage banner variants: exact styles from original design
  if (variant === 'bannerCentered') {
    return (
      <section className={`bg-[#413356] ${sectionPad} overflow-hidden`}>
        <div className={containerNarrow}>
          <h2 className="text-white text-2xl md:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-center leading-tight lg:whitespace-nowrap">
            {statements[0] || ''}
          </h2>
        </div>
      </section>
    );
  }
  if (variant === 'bannerTwoLineGold') {
    return (
      <section className="bg-[#413356] pt-14 md:pt-20 pb-6 px-6 sm:px-8">
        <div className={containerWide}>
          {statements[0] && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#C7A254] text-center mb-4">
              {statements[0]}
            </h2>
          )}
          {statements[1] && (
            <p className="text-white text-lg md:text-xl lg:text-2xl text-center">{statements[1]}</p>
          )}
        </div>
      </section>
    );
  }
  if (variant === 'bannerWhite') {
    return (
      <section className={`bg-[#413356] ${sectionPad} text-center`}>
        <div className={containerNarrow}>
          <h2 className="text-white text-2xl md:text-[35px] lg:text-4xl font-bold text-center leading-tight">
            {statements[0] || ''}
          </h2>
        </div>
      </section>
    );
  }
  if (variant === 'bannerGoldLarge') {
    return (
      <section className={`bg-[#413356] ${sectionPad} text-center`}>
        <div className={containerNarrow}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#C7A254] font-bold leading-[1.2]">
            {statements.map((line, i) => (
              <span key={i}>
                {line}
                {i < statements.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>
      </section>
    );
  }

  // Default: use style
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-[#413356]',
    cream: 'bg-(--color-gallery)'
  }[style];

  const textClass = style === 'dark' ? 'text-white' : 'text-(--color-primary)';

  return (
    <section className={`${sectionPad} ${bgClass}`}>
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
