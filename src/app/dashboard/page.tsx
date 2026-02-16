import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { isTeacher } from '@/lib/tier'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Redirect to onboarding if selection is missing
  const membershipType = user.publicMetadata.membershipType as string;
  if (!membershipType) {
    redirect('/onboarding');
  }

  const isTeacherUser = isTeacher(user.id, membershipType);

  // Redirect teachers to Teacher Collective Dashboard
  if (isTeacherUser) {
    redirect('/dashboard/teacher-collective');
  }

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-24 min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block py-2 px-6 rounded-full bg-(--color-roti)/10 text-(--color-roti) font-bold tracking-[3px] text-sm mb-6 border border-(--color-roti)/20 uppercase">
              Dashboard
            </span>
            <h1 className="text-(--color-primary) text-6xl mb-6 font-bold">
              Welcome, {user.firstName || 'Friend'}!
            </h1>
            <p className="text-(--color-text) text-xl max-w-2xl mx-auto">
              You&apos;re now part of the Flow in Faith community. Explore your personalized {isTeacherUser ? 'teaching resources' : 'practice area'} below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:-translate-y-2 transition-all group">
              <h3 className="text-(--color-primary) text-3xl mb-6 font-bold">My Account</h3>
              <div className="space-y-3 text-gray-600 mb-8">
                <p><span className="font-bold">Email:</span> {user.emailAddresses[0]?.emailAddress}</p>
                <p><span className="font-bold">Role:</span> <span className="capitalize">{membershipType}</span></p>
                <p><span className="font-bold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <Link href="/user-profile" className="text-(--color-roti) font-bold hover:underline transition-all">Manage Account →</Link>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl hover:-translate-y-2 transition-all">
              <h3 className="text-(--color-primary) text-3xl mb-6 font-bold">Quick Access</h3>
              <ul className="space-y-4">
                {isTeacherUser ? (
                  <>
                    <li><Link href="/dashboard/directory-profile" className="text-xl text-gray-700 hover:text-(--color-roti) transition-colors">Manage Directory Profile</Link></li>
                    <li><Link href="/teacher-collective/resources" className="text-xl text-gray-700 hover:text-(--color-roti) transition-colors">Teaching Resources</Link></li>
                    <li><Link href="/teacher-collective/calls" className="text-xl text-gray-700 hover:text-(--color-roti) transition-colors">Live Classes & Workshops</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/video-library" className="text-xl text-gray-700 hover:text-(--color-roti) transition-colors">On-Demand Library</Link></li>
                    <li><Link href="/live-classes" className="text-xl text-gray-700 hover:text-(--color-roti) transition-colors">Class Schedule</Link></li>
                    <li><Link href="/directory" className="text-xl text-gray-700 hover:text-(--color-roti) transition-colors">Teacher Directory</Link></li>
                  </>
                )}
              </ul>
            </div>

            <div className="bg-(--color-martinique) p-10 rounded-3xl shadow-xl text-white">
              <h3 className="text-white text-3xl mb-6 font-bold">Community</h3>
              <p className="text-white/80 mb-10 text-lg leading-relaxed">
                Connect with other {isTeacherUser ? 'Christ-Centered Yoga Teachers of Color' : 'practitioners'} and grow in your faith-led journey.
              </p>
              <Link href="/community" className="btn btn-primary w-full text-center font-bold">Enter Forum</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
