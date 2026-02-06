import Link from 'next/link';

interface BenefitItem {
  title: string;
  description: string;
}

interface BenefitsBlockProps {
  badge?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  items?: BenefitItem[];
}

export default function BenefitsBlock({
  badge = "Core Benefits",
  title = "What You Receive Inside the Collective",
  description = "Beyond community, we provide the tools and opportunities you need to expand your reach and deepen your impact.",
  buttonText = "See All Member Perks",
  items = [
    { title: 'Daily Community Space', description: 'A private online space to connect, ask questions, share wins, and collaborate.' },
    { title: 'Monthly Check-ins', description: 'Virtual gatherings for networking and sharing challenges/opportunities.' },
    { title: 'Directory Placement', description: 'Public listing so practitioners can find and hire you worldwide.' },
    { title: 'Masterclasses', description: 'Quarterly workshops on business, theology, and trauma-informed practice.' },
    { title: 'Promotion', description: 'Highlighting your offerings on our social channels and newsletter.' },
    { title: 'Teaching Roles', description: 'Paid opportunities to host classes for our practitioner membership.' },
  ]
}: BenefitsBlockProps) {
  return (
    <section className="py-24 bg-(--color-gallery)">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h5 className="text-(--color-roti) font-bold uppercase tracking-[4px] mb-6">{badge}</h5>
            <h2 className="text-4xl lg:text-5xl font-bold text-(--color-primary) mb-8">{title}</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              {description}
            </p>
            <Link href="/sign-up" className="btn btn-primary">{buttonText}</Link>
          </div>
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-(--color-primary) text-lg mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
