import Link from 'next/link';

interface PathButton {
  text?: string;
  link?: string;
  style?: 'primary' | 'secondary';
}

interface PathChooserBlockProps {
  heading?: string;
  intro?: string;
  options?: string[];
  closingText?: string;
  buttons?: PathButton[];
}

export default function PathChooserBlock({
  heading,
  intro,
  options = [],
  closingText,
  buttons = []
}: PathChooserBlockProps) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {heading && (
            <h2 className="text-3xl lg:text-5xl font-bold text-(--color-primary) mb-8">
              {heading}
            </h2>
          )}
          <div className="text-xl text-gray-700 mb-12 space-y-2">
            {intro && <p>{intro}</p>}
            {options.length > 0 && (
              <ul className="list-none space-y-2 font-medium text-gray-900">
                {options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            )}
            {closingText && (
              <p className="mt-6 text-2xl text-(--color-roti) font-bold">
                {closingText}
              </p>
            )}
          </div>

          {buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {buttons.map((button, index) => (
                button.text && button.link && (
                  <Link
                    key={index}
                    href={button.link}
                    className={`inline-block px-6 py-3 rounded-full font-bold text-sm transition-all shadow-xl hover:scale-105 transform ${
                      button.style === 'secondary'
                        ? 'bg-(--color-martinique) text-white hover:bg-(--color-primary)'
                        : 'bg-(--color-primary) text-white hover:bg-(--color-roti)'
                    }`}
                  >
                    {button.text}
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
