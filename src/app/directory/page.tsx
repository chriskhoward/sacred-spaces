import { clerkClient } from '@clerk/nextjs/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DirectoryClient from './DirectoryClient';
import { Teacher } from '@/data/teachers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Find a Teacher | Flow in Faith Directory",
  description: "Connect with Christ-Centered Yoga Teachers of Color worldwide. Find classes, workshops, and retreats that honor your faith and culture.",
};

export const dynamic = 'force-dynamic';

export default async function DirectoryPage() {
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
        location: profile.location || 'Online',
        specialties: Array.isArray(profile.specialties) ? profile.specialties : [],
        certifications: Array.isArray(profile.certifications) ? profile.certifications : [],
        bio: profile.bio || 'Member of the Flow in Faith Teacher Collective.',
        image: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress,
        website: profile.website,
      };
    });

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <header className="bg-(--color-primary) pt-[200px] pb-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">Teacher Directory</h1>
          <p className="text-xl text-(--color-sidecar) opacity-90">Find a Christ-centered yoga teacher near you or online.</p>
        </div>
      </header>

      <DirectoryClient teachers={teachers} />

      <Footer />
    </main>
  );
}
