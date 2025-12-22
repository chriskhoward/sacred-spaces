import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export default async function TeachingResourcesPage() {
  const user = await currentUser();
  const membershipType = user?.publicMetadata?.membershipType as string || 'practitioner';

  const query = `*[_type == "resource" && (targetAudience == "all" || targetAudience == "${membershipType}")] {
    _id,
    title,
    category,
    description,
    isLocked
  }`;

  const resources = await client.fetch(query);

  // Group resources by category
  const categories = Array.from(new Set(resources.map((r: any) => r.category)));
  const groupedResources = categories.map(cat => ({
    category: cat as string,
    items: resources.filter((r: any) => r.category === cat)
  }));

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />
      
      <section className="pt-[160px] pb-16 bg-(--color-primary) text-white">
        <div className="container mx-auto px-4 text-center">
            <span className="text-(--color-roti) font-bold uppercase tracking-widest mb-4 block">Teacher&apos;s Collective</span>
            <h1 className="text-5xl font-bold mb-6">Teaching Resources</h1>
            <p className="text-xl text-(--color-sidecar) max-w-2xl mx-auto">
              Curated tools to help you deepen your practice, grow your business, and lead with confidence.
            </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16">
            {groupedResources.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    No resources found. Check back later!
                </div>
            ) : (
                groupedResources.map((section, idx) => (
                <div key={idx}>
                    <h2 className="text-3xl font-bold text-(--color-primary) mb-8 flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-(--color-roti) block"></span>
                    {section.category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.items.map((item: any) => (
                        <div key={item._id} className="bg-white p-8 rounded-[20px_0_20px_0] shadow-md hover:shadow-xl transition-all border border-transparent hover:border-(--color-roti) group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-(--color-gallery) text-(--color-primary) px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Resource
                            </span>
                            {item.isLocked && (
                                <span className="text-gray-400 text-lg">🔒</span>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-(--color-primary) mb-3 group-hover:text-(--color-roti) transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                            {item.description}
                        </p>
                        <button className="text-(--color-primary) font-bold text-sm uppercase tracking-wider hover:underline">
                            Access Resource →
                        </button>
                        </div>
                    ))}
                    </div>
                </div>
                ))
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-(--color-primary) mb-6">Have a resource to share?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
            We believe in collective wisdom. If you have a sequence, playlist, or guide that has blessed your teaching, share it with the community.
          </p>
          <a href="mailto:collective@flowinfaith.com" className="btn btn-primary px-10 py-4">
            Submit a Resource
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
