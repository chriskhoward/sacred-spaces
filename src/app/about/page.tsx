import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

// Force dynamic rendering to avoid Clerk publishableKey error during static generation
export const dynamic = 'force-dynamic';

export default function AboutPage() {
  const beliefs = [
    {
      title: "Growth Happens in Community",
      desc: "We believe that teachers grow stronger in community, not in isolation — especially when surrounded by people who share their values, faith, and lived experiences."
    },
    {
      title: "Calling is Sacred",
      desc: "We believe that teaching yoga is a sacred calling, and every Christian Yoga Teacher of Color deserves support that honors their identity, their faith, and the work God has placed in their hands."
    },
    {
      title: "Visibility Matters",
      desc: "We believe that when teachers are truly seen - in their culture, their voice, and their spiritual expression - their presence becomes a powerful force for transformation in the communities they serve."
    }
  ];

  const team = [
    { name: "‘Queen’ Robertson", role: "Founder / Vision Holder", image: "/assets/images/team/queen_robertson.png" },
    { name: "De Bolton", role: "Founder / Vision Holder", image: "/assets/images/team/de_bolton.png" },
    { name: "Eboni Howell", role: "Visibility & Media", image: "/assets/images/team/eboni_howell.png" },
    { name: "Morenike Olorunnisomo", role: "Community Steward", image: "/assets/images/team/morenike_olorunnisomo.png" }
  ];

  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-(--color-primary) pt-[220px] pb-32 text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/assets/images/banner_section_background.jpg')] bg-cover opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
               Affirming Your <br />
               <span className="text-(--color-roti)">Identity & Faith</span>
            </h1>
            <p className="text-(--color-sidecar) text-xl max-w-3xl mx-auto leading-relaxed">
               A space built by Christian Yoga Teachers of Color, for Christian Yoga Teachers of Color.
            </p>
        </div>
      </section>

      {/* Brand Message Section */}
      <section className="py-24">
         <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative h-[650px] rounded-[5rem_0_5rem_0] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
               <Image 
                  src="/assets/images/about_img_1.jpg" 
                  alt="Flow in Faith Collective" 
                  fill
                  className="object-cover"
               />
            </div>
            <div>
               <h5 className="text-(--color-roti) font-bold uppercase tracking-[4px] mb-6">Our Difference</h5>
               <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-(--color-primary) leading-tight">
                  Because You Deserve to Be Fully Seen.
               </h2>
               <div className="prose prose-xl text-gray-700 space-y-8">
                  <p>
                    Flow in Faith Teachers Collective is a community-powered home created exclusively for Christian Yoga Teachers of Color — a space where their faith, culture, and calling are honored without compromise.
                  </p>
                  <p>
                    We are the only collective designed to offer culturally grounded visibility, meaningful collaboration, and spiritually aligned continuing education, all within a community that reflects their lived experiences.
                  </p>
                  <p>
                    Our difference matters because you deserve a space that supports you deeply and empowers you to grow confidently in the work God has entrusted to you.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Beliefs Section */}
      <section className="py-24 bg-(--color-gallery)">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-5xl font-bold text-(--color-primary) mb-6">We Believe</h2>
               <div className="w-24 h-1 bg-(--color-roti) mx-auto mb-10"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {beliefs.map((belief, idx) => (
                 <div key={idx} className="bg-white p-12 rounded-[3.5rem_0_3.5rem_0] shadow-xl border border-gray-100 flex flex-col justify-between hover:scale-[1.02] transition-transform">
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-(--color-primary) uppercase tracking-wide leading-tight">
                        {belief.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {belief.desc}
                      </p>
                    </div>
                    <div className="text-(--color-roti) text-4xl font-serif">0{idx + 1}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32">
         <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/3 sticky top-[150px]">
                <h2 className="text-5xl font-bold text-(--color-primary) mb-8">Leadership Team</h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  When we gather, we’re reminded we were never meant to walk this calling alone.
                </p>
                <div className="space-y-6">
                  {team.map((m, i) => (
                    <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-(--color-gallery) transition-colors">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-(--color-roti) bg-white shrink-0 shadow-lg">
                          <Image src={m.image} alt={m.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-(--color-primary) text-xl">{m.name}</h4>
                        <p className="text-gray-600 font-medium">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-2/3 bg-(--color-sidecar)/30 p-12 lg:p-20 rounded-[4rem_0_4rem_0]">
                <h3 className="text-3xl font-bold text-(--color-primary) mb-12">How we started...</h3>
                <div className="prose prose-xl text-(--color-bronzetone) space-y-10">
                  <p>
                    In July 2025, Queen hosted the inaugural Flow in Faith Virtual Summit and put out a call for Christian Yoga Teachers of Color to teach and speak. More than 50 teachers registered, showing just how many of us were out here doing this work.
                  </p>
                  <p>
                    Throughout the summit, it became clear that we needed a community where our voices, faith, and practice could belong together.
                  </p>
                  <p>
                    De and Queen began imagining what that could look like, a space made for us and by us. Soon after, Eboni and Morenike joined the vision, bringing their gifts and leadership to help shape what is now the Flow in Faith Teachers Collective.
                  </p>
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-(--color-primary) text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-7xl font-bold mb-10">Ready to belong?</h2>
            <Link href="/sign-up" className="px-12 py-6 bg-(--color-roti) text-white rounded-[2rem_0_2rem_0] font-bold text-xl hover:bg-white hover:text-(--color-primary) transition-all inline-block">
               Join the Collective
            </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
