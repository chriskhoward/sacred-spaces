import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PortableTextOrString from '@/components/summit/PortableTextOrString';
import { isTeacher, isTeacherOnboarded } from '@/lib/tier';
import { client } from '@/sanity/lib/client';

const DASHBOARD_QUERY = `*[_type == "teacherCollectiveDashboard" && _id == "teacherCollectiveDashboard"][0]{
  cards[]{
    _key,
    title,
    description,
    href,
    linkLabel
  }
}`;

type DashboardCard = {
  _key: string;
  title: string;
  description?: any;
  href: string;
  linkLabel?: string | null;
};

const DEFAULT_CARDS: DashboardCard[] = [
  { _key: 'start', title: 'Start here', description: 'Videos, guides, and resources to get started with the Collective.', href: '/dashboard/teacher-collective/start' },
  { _key: 'community', title: 'Community', description: 'Creating community guidelines.', href: '/community', linkLabel: 'Go to Community →' },
  { _key: 'calls', title: 'Live Classes & Workshops', description: 'View upcoming live sessions and workshops with fellow teachers.', href: '/teacher-collective/calls' },
  { _key: 'video-library', title: 'On-Demand Library', description: 'Browse the on-demand video library with classes, workshops, and teachings.', href: '/video-library' },
  { _key: 'directory-profile', title: 'Edit Teacher Profile', description: 'Update your directory profile, bio, specialties, and contact information.', href: '/dashboard/directory-profile' },
  { _key: 'directory', title: 'Teacher Directory', description: 'View all teachers in the collective and manage your directory profile.', href: '/directory' },
  { _key: 'resources', title: 'Teaching Resources', description: 'Access curated resources, guides, and materials for Christ-Centered Yoga Teachers.', href: '/teacher-collective/resources' },
];

export default async function TeacherCollectiveDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const membershipType = user.publicMetadata.membershipType as string;
  const role = (user.publicMetadata.role as string) || null;

  if (!isTeacher(role, membershipType)) {
    redirect('/dashboard');
  }

  const hasProfile = isTeacherOnboarded(user);

  let cards: DashboardCard[] = DEFAULT_CARDS;
  try {
    const data = await client.fetch<{ cards?: DashboardCard[] } | null>(DASHBOARD_QUERY);
    if (data?.cards?.length) {
      cards = data.cards;
    }
  } catch {
    // use default cards on fetch error
  }

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block py-2 px-6 rounded-full bg-(--color-roti)/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-(--color-roti)/20 uppercase">Teachers Collective</span>
            <h1 className="text-4xl font-bold text-(--color-primary)">Teacher Collective Dashboard</h1>
          </div>
        </div>
      </section>

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
              {cards.map((card) => (
                <Link
                  key={card._key}
                  href={card.href}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <h3 className="text-2xl font-bold text-(--color-primary) mb-2">{card.title}</h3>
                  {card.description && <PortableTextOrString value={card.description} className="text-gray-600" />}
                  {card.linkLabel && <span className="mt-3 block text-(--color-roti) font-bold text-sm">{card.linkLabel}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
