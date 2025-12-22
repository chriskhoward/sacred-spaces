import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { clerkClient } from '@clerk/nextjs/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { teachers, Teacher } from '@/data/teachers';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TeacherProfile({ params }: PageProps) {
  const { id } = await params;
  
  // Try to find in static data first
  let teacher: Teacher | undefined = teachers.find(t => t.id === id);

  // If not found, try to fetch from Clerk
  if (!teacher) {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(id);
      
      // Ensure the user is actually a teacher
      if (user && user.publicMetadata?.membershipType === 'teacher') {
         const profile: any = user.publicMetadata.teacherProfile || {};
         teacher = {
            id: user.id,
            name: profile.name || `${user.firstName} ${user.lastName}`.trim(),
            location: profile.location || 'Online',
            specialties: Array.isArray(profile.specialties) ? profile.specialties : [],
            certifications: Array.isArray(profile.certifications) ? profile.certifications : [],
            bio: profile.bio || 'Member of the Sacred Spaces Teacher Collective.',
            image: user.imageUrl,
            email: user.emailAddresses[0]?.emailAddress,
            website: profile.website,
         };
      }
    } catch (error) {
      // User not found or error fetching
      // We'll let it fall through to the 404 check
    }
  }

  if (!teacher) {
    notFound();
  }

  return (
    <main className="bg-white">
      <Navbar />
      
      <section className="bg-(--color-primary) pt-[220px] pb-32 text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/directory" className="text-(--color-roti) hover:text-white mb-16 inline-flex items-center gap-2 transition-colors font-bold uppercase tracking-wider text-sm group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Directory
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20 items-center">
            <div className="flex justify-center">
              <div className="relative w-[380px] h-[500px]">
                <Image 
                   src={teacher.image || '/assets/images/placeholder_teacher.png'} 
                   alt={teacher.name} 
                   fill
                   className="rounded-[4rem_0_4rem_0] shadow-[0_40px_80px_rgba(0,0,0,0.5)] object-cover"
                   priority
                />
              </div>
            </div>
            <div className="profile-header-info">
              <span className="text-(--color-roti) font-bold tracking-[3px] uppercase mb-6 block">📍 {teacher.location}</span>
              <h1 className="text-6xl lg:text-8xl text-white font-bold mb-10 leading-tight">{teacher.name}</h1>
              <div className="flex flex-wrap gap-4 mb-16">
                {teacher.specialties.map(s => (
                  <span key={s} className="bg-white/10 text-white px-6 py-2 rounded-full border border-white/30 font-semibold whitespace-nowrap backdrop-blur-sm">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href={`mailto:${teacher.email}`} className="px-10 py-5 bg-(--color-sidecar) text-(--color-bronzetone) rounded-[2rem_0_2rem_0] font-bold hover:bg-(--color-roti) hover:text-white transition-all text-center min-w-[220px]">
                  Contact via Email
                </a>
                {teacher.website && (
                  <a href={teacher.website} target="_blank" rel="noopener noreferrer" className="px-10 py-5 border-2 border-white text-white rounded-[2rem_0_2rem_0] font-bold hover:bg-white hover:text-(--color-primary) transition-all text-center min-w-[220px]">
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-24">
          <div>
            <h2 className="text-4xl font-bold mb-8 text-(--color-primary)">About {teacher.name.split(' ')[0]}</h2>
            <p className="text-xl leading-relaxed text-gray-700">{teacher.bio}</p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-(--color-gallery) p-10 rounded-[2.5rem_0_2.5rem_0]">
              <h3 className="text-2xl font-bold mb-6 text-(--color-primary)">Certifications</h3>
              <ul className="space-y-3">
                {teacher.certifications.map(cert => (
                  <li key={cert} className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-(--color-roti) before:font-bold">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-(--color-gallery) p-10 rounded-[2.5rem_0_2.5rem_0]">
              <h3 className="text-2xl font-bold mb-6 text-(--color-primary)">Practice Style</h3>
              <p className="text-gray-700">Specialized in {teacher.specialties.join(', ')}.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-(--color-gallery)">
        <div className="container mx-auto px-4">
          <div className="bg-(--color-primary) p-20 rounded-[4rem_0_4rem_0] text-center text-white">
            <h2 className="text-white text-5xl font-bold mb-6">Experience a Sacred Space</h2>
            <p className="text-(--color-sidecar) text-xl mb-12 max-w-2xl mx-auto">
              Join {teacher.name.split(' ')[0]} for a session that honors your faith and your body.
            </p>
            <Link href="/live-classes" className="btn btn-primary">Book a Class</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
