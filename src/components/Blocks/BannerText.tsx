interface BannerTextBlockProps {
  heading?: string;
  subheading?: string;
  backgroundColor?: 'primary' | 'white';
}

export default function BannerTextBlock({
  heading = 'Flow in Faith is here to tell a different story',
  subheading = 'We exist to offer...',
  backgroundColor = 'primary'
}: BannerTextBlockProps) {
  const bgClass = backgroundColor === 'white' ? 'bg-white' : 'bg-[#413356]';
  const headingColor = backgroundColor === 'white' ? 'text-[#413356]' : 'text-[#C7A254]';
  const subheadingColor = backgroundColor === 'white' ? 'text-gray-700' : 'text-white';

  return (
    <section className={`py-14 md:py-20 px-6 sm:px-8 ${bgClass}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${headingColor} text-center mb-4`}>
          {heading}
        </h2>
        <p className={`text-lg md:text-xl lg:text-2xl ${subheadingColor} text-center`}>
          {subheading}
        </p>
      </div>
    </section>
  );
}
