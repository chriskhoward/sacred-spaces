import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | Flow in Faith',
  description: 'Connect, share, and grow with fellow members in our private WhatsApp community.',
};

export default function CommunityPage() {
  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />
      
      <header className="bg-(--color-primary) pt-[200px] pb-24 text-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/images/tc_logo.png"
              alt="Flow in Faith Teachers Collective Logo"
              width={120}
              height={120}
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">Community Forum</h1>
          <p className="text-xl text-(--color-sidecar) opacity-90">
            Connect, share, and grow with fellow members in our private WhatsApp community.
          </p>
        </div>
      </header>

      {/* Join the Community */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-10 md:p-12 rounded-lg shadow-xl text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-(--color-primary) mb-4">Join Our WhatsApp Community</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
                Our community lives on WhatsApp! Connect with fellow teachers and practitioners in real time.
              </p>
              <a
                href="https://chat.whatsapp.com/IUiYAER2VWW0OnFPoZwLmZ?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-green-500 text-white font-bold text-sm rounded-full hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Join the WhatsApp Group
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-(--color-primary) mb-4">Community Guidelines</h2>
              <p className="text-gray-600 text-lg">
                To keep our space sacred and supportive, we ask that all members honor these guidelines.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-5 items-start p-6 bg-(--color-gallery) rounded-lg">
                <div className="w-10 h-10 bg-(--color-roti) text-white rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold text-(--color-primary) mb-2">Lead with Love & Respect</h3>
                  <p className="text-gray-600">Treat every member with kindness and respect. We are a diverse community united by faith — honor each person&apos;s journey, background, and perspective.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start p-6 bg-(--color-gallery) rounded-lg">
                <div className="w-10 h-10 bg-(--color-roti) text-white rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold text-(--color-primary) mb-2">Keep It Christ-Centered</h3>
                  <p className="text-gray-600">Our community is rooted in faith. Discussions should uplift and align with our shared values of Christ-centered wellness. Be mindful of the sacred nature of this space.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start p-6 bg-(--color-gallery) rounded-lg">
                <div className="w-10 h-10 bg-(--color-roti) text-white rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold text-(--color-primary) mb-2">Confidentiality Is Sacred</h3>
                  <p className="text-gray-600">What is shared in the community stays in the community. Do not screenshot, share, or repost another member&apos;s personal stories or content without their explicit permission.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start p-6 bg-(--color-gallery) rounded-lg">
                <div className="w-10 h-10 bg-(--color-roti) text-white rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-bold text-(--color-primary) mb-2">No Spam or Self-Promotion</h3>
                  <p className="text-gray-600">Please refrain from unsolicited promotions, sales pitches, or spam. If you&apos;d like to share a resource or offering, ask a community leader first. We have dedicated spaces for sharing opportunities.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start p-6 bg-(--color-gallery) rounded-lg">
                <div className="w-10 h-10 bg-(--color-roti) text-white rounded-full flex items-center justify-center font-bold shrink-0">5</div>
                <div>
                  <h3 className="text-xl font-bold text-(--color-primary) mb-2">Engage Authentically</h3>
                  <p className="text-gray-600">Show up as your genuine self. Ask questions, share your journey, encourage others. This community thrives when everyone participates with authenticity and vulnerability.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start p-6 bg-(--color-gallery) rounded-lg">
                <div className="w-10 h-10 bg-(--color-roti) text-white rounded-full flex items-center justify-center font-bold shrink-0">6</div>
                <div>
                  <h3 className="text-xl font-bold text-(--color-primary) mb-2">Disagree with Grace</h3>
                  <p className="text-gray-600">Healthy dialogue is welcome. If you disagree, do so respectfully and without personal attacks. Seek to understand before being understood. If a conversation becomes heated, step back and pray.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start p-6 bg-(--color-gallery) rounded-lg">
                <div className="w-10 h-10 bg-(--color-roti) text-white rounded-full flex items-center justify-center font-bold shrink-0">7</div>
                <div>
                  <h3 className="text-xl font-bold text-(--color-primary) mb-2">Report Concerns</h3>
                  <p className="text-gray-600">If you witness behavior that violates these guidelines or makes you feel unsafe, please reach out to a community leader directly. We take every concern seriously and will address it with care.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-(--color-primary) rounded-lg text-center text-white">
              <p className="text-lg font-medium text-(--color-sidecar) mb-4">
                By joining our community, you agree to uphold these guidelines and contribute to a space where faith, wellness, and community flourish together.
              </p>
              <a
                href="https://chat.whatsapp.com/IUiYAER2VWW0OnFPoZwLmZ?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-(--color-roti) text-white font-bold text-sm rounded-full hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                I Agree — Join the Community
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
