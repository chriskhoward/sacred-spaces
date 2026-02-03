interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

interface FeatureGridBlockProps {
  heading?: string;
  subheading?: string;
  items?: FeatureItem[];
  style?: 'light' | 'cream';
}

export default function FeatureGridBlock({
  heading,
  subheading,
  items = [],
  style = 'light'
}: FeatureGridBlockProps) {
  const bgClass = style === 'cream' ? 'bg-(--color-gallery)' : 'bg-white';

  return (
    <section className={`py-20 lg:py-28 ${bgClass}`}>
      <div className="container mx-auto px-4">
        {(heading || subheading) && (
          <div className="text-center mb-16">
            {heading && (
              <h2 className="text-4xl lg:text-5xl font-bold text-(--color-primary) mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-1"
            >
              {item.icon && (
                <div className="w-14 h-14 bg-(--color-sidecar) text-2xl flex items-center justify-center rounded-2xl mb-6">
                  {item.icon}
                </div>
              )}
              <h3 className="text-xl font-bold text-(--color-primary) mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
