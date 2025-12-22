'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function completeOnboarding(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const membershipType = formData.get('membershipType') as string;

  if (!membershipType || !['teacher', 'practitioner'].includes(membershipType)) {
    return;
  }

  try {
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        membershipType,
        tier: 'free', // Default tier
        onboardingComplete: true,
      },
    });
  } catch (error) {
    console.error('Error updating user metadata:', error);
    return;
  }

  return redirect('/dashboard');
}
