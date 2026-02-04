import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { updateDirectoryProfile } from './actions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function DirectoryProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Ensure only teachers can access this
  if (user.publicMetadata.membershipType !== 'teacher') {
    redirect('/dashboard');
  }

  // Get existing profile data from metadata
  const profile = (user.publicMetadata.teacherProfile as any) || {};

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12 text-center relative">
            <Link
              href={`/teachers/${user.id}`}
              target="_blank"
              className="hidden lg:flex absolute right-0 top-0 items-center gap-2 text-(--color-roti) font-bold hover:text-(--color-primary) transition-colors"
            >
              <span>View Public Profile</span>
              <span className="text-xl">↗</span>
            </Link>
            <h1 className="text-5xl font-bold text-(--color-primary) mb-4 font-heading">Edit Directory Profile</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Manage how you appear to practitioners in the Teacher Collective directory.
            </p>
            <Link
              href={`/teachers/${user.id}`}
              className="lg:hidden inline-flex items-center gap-2 text-(--color-roti) font-bold hover:text-(--color-primary) transition-colors"
            >
              <span>View Public Profile</span>
              <span className="text-xl">↗</span>
            </Link>
          </div>

          <div className="bg-white p-12 rounded-[3rem_0_3rem_0] shadow-xl border border-gray-100">
            {/* Profile Photo Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12 p-8 bg-(--color-gallery)/30 rounded-2xl border border-dashed border-(--color-primary)/20">
              <div className="relative w-32 h-32">
                <Image
                  src={user.imageUrl}
                  alt="Profile Picture"
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-(--color-primary) mb-2">Profile Photo</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Your profile photo is managed via your main account settings. This is the image that will appear on your directory card.
                </p>
                <Link href="/user-profile" className="inline-block px-6 py-2 bg-white border border-gray-300 rounded-full font-bold text-sm hover:border-(--color-roti) hover:text-(--color-roti) transition-colors">
                  Change Photo in Settings
                </Link>
              </div>
            </div>

            <form action={updateDirectoryProfile} className="space-y-10">

              {/* Basic Info */}
              <div>
                <h3 className="text-2xl font-bold text-(--color-primary) mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-(--color-sidecar) flex items-center justify-center text-sm text-(--color-bronzetone)">1</span>
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-3">Display Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={profile.name || user.firstName + ' ' + user.lastName}
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-3">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      defaultValue={profile.location || ''}
                      placeholder="e.g. Houston, TX"
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-2xl font-bold text-(--color-primary) mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-(--color-sidecar) flex items-center justify-center text-sm text-(--color-bronzetone)">2</span>
                  Tell Your Story
                </h3>
                <div>
                  <label htmlFor="bio" className="block text-gray-700 font-bold mb-3">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={6}
                    defaultValue={profile.bio || ''}
                    placeholder="Share your journey, your teaching philosophy, and what students can expect from your classes..."
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all placeholder:text-gray-400 leading-relaxed"
                    required
                  />
                  <p className="text-right text-sm text-gray-400 mt-2">Recommended: 300-500 characters</p>
                </div>
              </div>

              {/* Professional Details */}
              <div>
                <h3 className="text-2xl font-bold text-(--color-primary) mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-(--color-sidecar) flex items-center justify-center text-sm text-(--color-bronzetone)">3</span>
                  Expertise & Contact
                </h3>
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <label htmlFor="specialties" className="block text-gray-700 font-bold mb-3">Specialties</label>
                    <input
                      type="text"
                      id="specialties"
                      name="specialties"
                      defaultValue={profile.specialties?.join(', ') || ''}
                      placeholder="e.g. Vinyasa, Trauma-Informed, Meditation, Restorative"
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">Separate with commas</p>
                  </div>
                  <div>
                    <label htmlFor="certifications" className="block text-gray-700 font-bold mb-3">Certifications</label>
                    <input
                      type="text"
                      id="certifications"
                      name="certifications"
                      defaultValue={profile.certifications?.join(', ') || ''}
                      placeholder="e.g. RYT-200, RYT-500, YACEP"
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">Separate with commas</p>
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-gray-700 font-bold mb-3">Website URL</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      defaultValue={profile.website || ''}
                      placeholder="https://yourwebsite.com"
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-(--color-roti) rounded-xl outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-6 pt-8 border-t border-gray-100">
                <Link href="/dashboard" className="text-gray-500 font-bold hover:text-gray-700 transition-colors px-4 py-2">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="bg-(--color-roti) text-white px-10 py-4 rounded-[15px_0_15px_0] font-bold text-lg hover:bg-(--color-primary) transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 block"
                >
                  Save & Update Profile
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
