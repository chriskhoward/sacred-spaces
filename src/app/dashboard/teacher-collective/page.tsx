import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function TeacherCollectiveDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Ensure only teachers can access this
  if (user.publicMetadata.membershipType !== 'teacher') {
    redirect('/dashboard');
  }

  const profile = (user.publicMetadata.teacherProfile as any) || {};
  const hasProfile = profile.name && profile.location && profile.bio;
  const tier = (user.publicMetadata.tier as string) || 'professional';
  const isPro = tier === 'pro' || tier === 'professional';
  const tierLabel = isPro ? 'Pro' : tier === 'core' ? 'Core' : 'Pro';

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      {/* Header Navigation */}
      <section className="pt-[160px] pb-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-(--color-primary) mb-8">Teacher Collective Dashboard</h1>
            <nav className="flex flex-wrap gap-4 border-b border-gray-200">
              <Link 
                href="/teacher-collective/resources" 
                className="px-6 py-3 font-bold text-gray-700 hover:text-(--color-roti) border-b-2 border-transparent hover:border-(--color-roti) transition-colors"
              >
                Resources
              </Link>
              <Link 
                href="/teacher-collective/calls" 
                className="px-6 py-3 font-bold text-gray-700 hover:text-(--color-roti) border-b-2 border-transparent hover:border-(--color-roti) transition-colors"
              >
                Live Classes
              </Link>
              <a
                href="https://chat.whatsapp.com/IUiYAER2VWW0OnFPoZwLmZ?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 font-bold text-gray-700 hover:text-(--color-roti) border-b-2 border-transparent hover:border-(--color-roti) transition-colors"
              >
                Community
              </a>
              <Link 
                href="/video-library" 
                className="px-6 py-3 font-bold text-gray-700 hover:text-(--color-roti) border-b-2 border-transparent hover:border-(--color-roti) transition-colors"
              >
                On-Demand Library
              </Link>
              <Link 
                href="/directory" 
                className="px-6 py-3 font-bold text-gray-700 hover:text-(--color-roti) border-b-2 border-transparent hover:border-(--color-roti) transition-colors"
              >
                Teacher Directory
              </Link>
            </nav>
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
              {/* Resources Card */}
              <Link 
                href="/teacher-collective/resources"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Teaching Resources</h3>
                <p className="text-gray-600">Access curated resources, guides, and materials for Christ-Centered Yoga Teachers.</p>
              </Link>

              {/* Schedule Card */}
              <Link 
                href="/teacher-collective/calls"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Live Classes & Workshops</h3>
                <p className="text-gray-600">View upcoming live sessions and workshops with fellow teachers.</p>
              </Link>

              {/* Community Card */}
              <a
                href="https://chat.whatsapp.com/IUiYAER2VWW0OnFPoZwLmZ?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 block"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Community</h3>
                <p className="text-gray-600 mb-3">Creating community guidelines.</p>
                <span className="text-(--color-roti) font-bold text-sm">Join WhatsApp Group →</span>
              </a>

              {/* On-Demand Library Card */}
              <Link 
                href="/video-library"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">On-Demand Library</h3>
                <p className="text-gray-600">Browse the on-demand video library with classes, workshops, and teachings.</p>
              </Link>

              {/* Directory Card */}
              <Link 
                href="/directory"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Teacher Directory</h3>
                <p className="text-gray-600">View all teachers in the collective and manage your directory profile.</p>
              </Link>

              {/* Profile Card */}
              <Link 
                href="/dashboard/directory-profile"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Edit Profile</h3>
                <p className="text-gray-600">Update your directory profile, bio, specialties, and contact information.</p>
              </Link>

              {/* Account Card */}
              <Link 
                href="/user-profile"
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-(--color-primary) mb-2">Account Settings</h3>
                <p className="text-gray-600 mb-3">Manage your account settings, profile photo, and preferences.</p>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-(--color-roti)/15 text-(--color-roti) border border-(--color-roti)/40">
                  {tierLabel} Member
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
