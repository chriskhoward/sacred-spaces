import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start here | Teacher Collective',
  description: 'Get started with the Flow in Faith Teachers Collective. Videos, guides, and resources for new members.',
};

export default async function TeacherCollectiveStartPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (user.publicMetadata.membershipType !== 'teacher') {
    redirect('/dashboard');
  }

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/dashboard/teacher-collective"
              className="inline-block text-(--color-roti) font-bold mb-6 hover:underline"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="text-4xl font-bold text-(--color-primary) mb-4">Start here</h1>
            <p className="text-xl text-gray-600 mb-12">
              Welcome to the Collective. Use the resources below to get oriented—videos, guides, and PDFs will appear here as they’re added.
            </p>

            {/* Placeholder for onboarding items (videos, PDFs, links). Content can be driven by Sanity or config later. */}
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
              <h2 className="text-2xl font-bold text-(--color-primary) mb-4">Getting started</h2>
              <p className="text-gray-600 mb-8">
                Onboarding content—including videos and PDFs—can be added to this page. Check back soon or explore the rest of the dashboard.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/dashboard/teacher-collective"
                  className="px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold hover:opacity-90 transition-opacity"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/community"
                  className="px-6 py-3 border-2 border-(--color-primary) text-(--color-primary) rounded-full font-bold hover:bg-(--color-primary)/5 transition-colors"
                >
                  Visit Community
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
