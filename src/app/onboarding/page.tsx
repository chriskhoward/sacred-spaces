import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { completeOnboarding, completeTeacherOnboarding } from './actions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OnboardingClient from './OnboardingClient';

export default async function OnboardingPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  // If already onboarded, redirect to dashboard
  if (user.publicMetadata.onboardingComplete) {
    redirect('/dashboard');
  }

  // Check if user selected teacher path but hasn't completed profile
  const membershipType = user.publicMetadata.membershipType as string;
  const needsTeacherProfile = membershipType === 'teacher' && !user.publicMetadata.teacherProfile;

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-(--color-primary) mb-6 font-heading">Final Step: Choose Your Path</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Welcome to Flow in Faith, {user.firstName}! To personalize your experience, please tell us how you&apos;ll be using the platform.
            </p>
          </div>

          <OnboardingClient
            needsTeacherProfile={needsTeacherProfile}
            userFirstName={user.firstName ?? ''}
            userLastName={user.lastName ?? ''}
            completeOnboarding={completeOnboarding}
            completeTeacherOnboarding={completeTeacherOnboarding}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
