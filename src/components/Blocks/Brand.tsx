interface BrandBlockProps {
  quote?: string;
  body?: string;
}

export default function BrandBlock({
  quote = '"Christian Meta Teachers of Color have carried their callings in silos for far too long. We’re here to change that."',
  body = "We created the Flow in Faith Teachers Collective so teachers could have a place to grow, collaborate, and be affirmed in the fullness of their identity, their faith, and their culture—without shrinking or separating pieces of themselves to belong."
}: BrandBlockProps) {
  return (
    <section className="py-24 lg:py-32 bg-(--color-gallery)">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl text-(--color-bronzetone) font-bold mb-10 leading-relaxed italic">
            {quote}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            {body}
          </p>
          <div className="w-20 h-1 bg-(--color-roti) mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
