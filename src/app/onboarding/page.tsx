import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { completeTeacherOnboarding } from './actions';
import Navbar from '@/components/Navbar';
import OnboardingClient from './OnboardingClient';
import { client } from '@/sanity/lib/client';

/** Shape of pre-fill data passed to the onboarding form */
export interface AlignmentPrefill {
  name?: string;
  location?: string;
  yogaFormats?: string[];
  whyJoin?: string;
}

const ALIGNMENT_QUERY = `*[_type == "alignmentSubmission" && email == $email] | order(submittedAt desc) [0]{
  name, location, yogaFormats, whyJoin
}`;

export default async function OnboardingPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  // If already onboarded, redirect to dashboard
  if (user.publicMetadata.onboardingComplete) {
    redirect('/dashboard');
  }

  // Ensure user is a teacher (paid member)
  if (user.publicMetadata.membershipType !== 'teacher') {
    redirect('/join');
  }

  // Fetch alignment form data to pre-fill the profile
  const userEmail = user.emailAddresses[0]?.emailAddress;
  let prefill: AlignmentPrefill = {};

  if (userEmail) {
    try {
      const submission = await client.fetch<AlignmentPrefill | null>(
        ALIGNMENT_QUERY,
        { email: userEmail }
      );
      if (submission) {
        prefill = submission;
      }
    } catch (err) {
      // Non-critical – form will just be empty if fetch fails
      console.error('[Onboarding] Failed to fetch alignment data:', err);
    }
  }

  return (
    <main className="bg-(--color-gallery) min-h-screen">
      <Navbar />

      <section className="pt-[160px] pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-(--color-primary) mb-6 font-heading">Complete Your Profile</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Welcome to Flow in Faith, {user.firstName}! Complete your directory profile to get started.
            </p>
          </div>

          <OnboardingClient
            userFirstName={user.firstName ?? ''}
            userLastName={user.lastName ?? ''}
            currentImageUrl={user.imageUrl}
            prefill={prefill}
            completeTeacherOnboarding={completeTeacherOnboarding}
          />
        </div>
      </section>
    </main>
  );
}
