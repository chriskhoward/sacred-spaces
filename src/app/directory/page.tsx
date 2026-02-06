import { clerkClient, currentUser } from '@clerk/nextjs/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DirectoryClient from './DirectoryClient';
import { Teacher } from '@/data/teachers';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Find a Teacher | Flow in Faith Directory",
  description: "Connect with Christ-Centered Yoga Teachers of Color worldwide. Find classes, workshops, and retreats that honor your faith and culture.",
};

export const dynamic = 'force-dynamic';

export default async function DirectoryPage() {
  const user = await currentUser();

  // Require login to access directory
  if (!user) {
    return (
      <main className="bg-(--color-gallery) min-h-screen">
        <Navbar />
        <section className="pt-[160px] pb-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 shadow-xl">
              <h1 className="text-4xl font-bold text-(--color-primary) mb-6">
                Members Only
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sign in to access our directory of Christ-centered yoga teachers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sign-in"
                  className="btn btn-primary"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-6 py-3 border-2 border-(--color-primary) text-(--color-primary) rounded-full font-bold text-sm hover:bg-(--color-primary) hover:text-white transition-all text-center"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const client = await clerkClient();

  // Fetch users with membershipType 'teacher'
  const response = await client.users.getUserList({
    limit: 100,
  });

  // Only show real teachers from Clerk who have completed their profile
  const teachers: Teacher[] = response.data
    .filter((user: any) => user.publicMetadata?.membershipType === 'teacher')
    .map((user: any) => {
      const profile = user.publicMetadata.teacherProfile || {};
      return {
        id: user.id,
        name: profile.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Teacher',
        location: profile.location || '',
        specialties: Array.isArray(profile.specialties) ? profile.specialties : [],
        certifications: Array.isArray(profile.certifications) ? profile.certifications : [],
        bio: profile.bio || 'Member of the Flow in Faith Teacher Collective.',
        image: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress,
        website: profile.website,
        socialMedia: profile.socialMedia || {},
      };
    });

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
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">Teacher Directory</h1>
          <p className="text-xl text-(--color-sidecar) opacity-90">Find a Christ-centered yoga teacher near you.</p>
        </div>
      </header>

      <DirectoryClient teachers={teachers} />

      <Footer />
    </main>
  );
}
