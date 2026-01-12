import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { completeOnboarding } from './actions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function OnboardingPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  // If already onboarded, redirect to dashboard
  if (user.publicMetadata.onboardingComplete) {
    redirect('/dashboard');
  }

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />
      
      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-(--color-primary) mb-6 font-heading">Final Step: Choose Your Path</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Welcome to Sacred Spaces, {user.firstName}! To personalize your experience, please tell us how you&apos;ll be using the platform.
            </p>
          </div>

          <form action={completeOnboarding} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button 
              type="submit" 
              name="membershipType" 
              value="teacher"
              className="bg-white p-10 rounded-[30px_0_30px_0] shadow-xl border-2 border-transparent hover:border-(--color-roti) transition-all text-left group"
            >
              <div className="text-5xl mb-6">🧘‍♀️</div>
              <h3 className="text-2xl font-bold text-(--color-primary) mb-4">I am a Teacher</h3>
              <p className="text-gray-600 mb-8">
                I want to join the Teacher Collective, list myself in the directory, and access resources for Christ-Centered Yoga Teachers of Color.
              </p>
              <span className="inline-block px-6 py-2 bg-(--color-sidecar) text-(--color-bronzetone) font-bold rounded-full group-hover:bg-(--color-roti) group-hover:text-white transition-colors">
                Select Teacher Path
              </span>
            </button>

            <button 
              type="submit" 
              name="membershipType" 
              value="practitioner"
              className="bg-white p-10 rounded-[30px_0_30px_0] shadow-xl border-2 border-transparent hover:border-(--color-roti) transition-all text-left group"
            >
              <div className="text-5xl mb-6">✨</div>
              <h3 className="text-2xl font-bold text-(--color-primary) mb-4">I am a Practitioner</h3>
              <p className="text-gray-600 mb-8">
                I want to join the community, access the on-demand video library, and find Christ-centered yoga classes.
              </p>
              <span className="inline-block px-6 py-2 bg-(--color-sidecar) text-(--color-bronzetone) font-bold rounded-full group-hover:bg-(--color-roti) group-hover:text-white transition-colors">
                Select Practitioner Path
              </span>
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
