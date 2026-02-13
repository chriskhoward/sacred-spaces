import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { isTeacher, isTeacherOnboarded } from '@/lib/tier';

export default async function TeacherCollectiveDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const membershipType = user.publicMetadata.membershipType as string;

  // Ensure only teachers can access this
  if (!isTeacher(user.id, membershipType)) {
    redirect('/dashboard');
  }

  const hasProfile = isTeacherOnboarded(user);

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-[160px] pb-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block py-2 px-6 rounded-full bg-(--color-roti)/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-(--color-roti)/20 uppercase">Teachers Collective</span>
            <h1 className="text-4xl font-bold text-(--color-primary)">Teacher Collective Dashboard</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {!hasProfile && (
              <div className="bg-(--color-roti)/10 border-2 border-(--color-roti) rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-(--color-primary) mb-2">Complete Your Directory Profile</h2>
                <p className="text-gray-700 mb-4">
                  To appear in the Teacher Directory, please complete your profile with your bio, location, specialties, and certifications.
                </p>
                <Link
                  href="/dashboard/directory-profile"
                  className="inline-block px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold hover:opacity-90 transition-opacity"
                >
                  Complete Profile →
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Start here Card */}
              <Link
                href="/dashboard/teacher-collective/start"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Start here</h3>
                <p className="text-gray-600">Videos, guides, and resources to get started with the Collective.</p>
              </Link>

              {/* Community Card */}
              <Link
                href="/community"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Community</h3>
                <p className="text-gray-600 mb-3">Creating community guidelines.</p>
                <span className="text-(--color-roti) font-bold text-sm">Go to Community →</span>
              </Link>

              {/* Live Classes Card */}
              <Link
                href="/teacher-collective/calls"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Live Classes & Workshops</h3>
                <p className="text-gray-600">View upcoming live sessions and workshops with fellow teachers.</p>
              </Link>

              {/* On-Demand Library Card */}
              <Link
                href="/video-library"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">On-Demand Library</h3>
                <p className="text-gray-600">Browse the on-demand video library with classes, workshops, and teachings.</p>
              </Link>

              {/* Edit Teacher Profile Card */}
              <Link
                href="/dashboard/directory-profile"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Edit Teacher Profile</h3>
                <p className="text-gray-600">Update your directory profile, bio, specialties, and contact information.</p>
              </Link>

              {/* Teacher Directory Card */}
              <Link
                href="/directory"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Teacher Directory</h3>
                <p className="text-gray-600">View all teachers in the collective and manage your directory profile.</p>
              </Link>

              {/* Teaching Resources Card */}
              <Link
                href="/teacher-collective/resources"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Teaching Resources</h3>
                <p className="text-gray-600">Access curated resources, guides, and materials for Christ-Centered Yoga Teachers.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
