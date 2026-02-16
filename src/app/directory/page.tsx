import { clerkClient, currentUser } from '@clerk/nextjs/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DirectoryClient from './DirectoryClient';
import { Teacher } from '@/data/teachers';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { isTeacherOnboarded } from '@/lib/tier';

export const metadata: Metadata = {
  title: "Find a Teacher | Flow in Faith Directory",
  description: "Connect with Christ-Centered Yoga Teachers of Color worldwide. Find classes, workshops, and retreats that honor your faith and culture.",
};

export const dynamic = 'force-dynamic';

export default async function DirectoryPage() {
  const user = await currentUser();

  // If user is a teacher, they must have completed onboarding to VIEW the directory
  const membershipType = user?.publicMetadata?.membershipType as string;
  const isTeacher = membershipType === 'teacher';

  if (user && isTeacher && !isTeacherOnboarded(user)) {
    return (
      <main className="bg-(--color-gallery) min-h-screen">
        <Navbar />
        <section className="pt-[200px] pb-24 text-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 shadow-xl border-2 border-(--color-roti)">
              <div className="flex justify-center mb-6">
                <Image
                  src="/assets/images/tc_logo.png"
                  alt="Flow in Faith Teachers Collective Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain brightness-0 opacity-20"
                />
              </div>
              <h1 className="text-3xl font-bold text-(--color-primary) mb-6 leading-tight">
                Complete Your Profile to Enter
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                To access the Teacher Directory and appear to practitioners, you must first complete your member profile.
              </p>
              <Link
                href="/onboarding"
                className="btn btn-primary px-8 py-4 text-lg"
              >
                Complete Onboarding →
              </Link>
              <p className="mt-6 text-sm text-gray-400 font-medium">
                Takes about 2 minutes. Your story matters!
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const client = await clerkClient();

  // 3. Fetch users and filter by membershipType 'teacher' AND onboardingComplete true
  const response = await client.users.getUserList({
    limit: 100,
  });

  // Only show real teachers from Clerk who have completed their profile onboarding
  const teachers: Teacher[] = response.data
    .filter((u: any) =>
      u.publicMetadata?.membershipType === 'teacher' &&
      u.publicMetadata?.onboardingComplete === true
    )
    .map((u: any) => {
      const profile = u.publicMetadata.teacherProfile || {};
      return {
        id: u.id,
        name: profile.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Teacher',
        location: profile.location || '',
        specialties: Array.isArray(profile.specialties) ? profile.specialties : [],
        certifications: Array.isArray(profile.certifications) ? profile.certifications : [],
        bio: profile.bio || 'Member of the Flow in Faith Teacher Collective.',
        image: u.imageUrl,
        email: u.emailAddresses[0]?.emailAddress,
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
          <span className="inline-block py-2 px-6 rounded-full bg-white/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-white/20 uppercase">Teacher Directory</span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">Teacher Directory</h1>
          <p className="text-xl text-(--color-sidecar) opacity-90">Find a Christ-centered yoga teacher near you.</p>
        </div>
      </header>

      <DirectoryClient teachers={teachers} />

      <Footer />
    </main>
  );
}
