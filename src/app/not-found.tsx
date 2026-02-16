import Link from 'next/link';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Flow in Faith',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-(--color-gallery) flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center pt-[100px] pb-24">
        <div className="container mx-auto px-4 text-center">
          {/* Decorative 404 */}
          <div className="relative mb-8">
            <h1 className="text-[12rem] md:text-[16rem] font-bold text-(--color-primary)/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <span className="text-6xl">✨</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-(--color-primary) mb-6">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              It seems you've wandered off the path.
            </p>
            <p className="text-lg text-gray-500 mb-12 italic">
              "For I know the plans I have for you... plans to give you hope and a future."
              <span className="block mt-2 text-sm not-italic text-(--color-roti) font-bold">— Jeremiah 29:11</span>
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="btn btn-primary inline-flex items-center justify-center gap-2"
              >
                <span>←</span> Return Home
              </Link>
              <Link
                href="/directory"
                className="px-6 py-3 border-2 border-(--color-primary) text-(--color-primary) rounded-full font-bold text-sm hover:bg-(--color-primary) hover:text-white transition-all text-center"
              >
                Find a Teacher
              </Link>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-16 flex justify-center gap-8 opacity-30">
            <div className="w-16 h-16 rounded-full bg-(--color-roti)/50 animate-pulse"></div>
            <div className="w-12 h-12 rounded-full bg-(--color-primary)/50 animate-pulse delay-100"></div>
            <div className="w-8 h-8 rounded-full bg-(--color-sidecar)/50 animate-pulse delay-200"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
