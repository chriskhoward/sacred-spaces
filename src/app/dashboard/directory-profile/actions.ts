'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function updateDirectoryProfile(formData: FormData) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // Double check authorization
  const metadata = sessionClaims?.public_metadata as any;
  if (metadata?.membershipType !== 'teacher') {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name') as string;
  const location = formData.get('location') as string;
  const bio = formData.get('bio') as string;
  const website = formData.get('website') as string;
  
  // Parse comma-separated lists
  const specialties = (formData.get('specialties') as string)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
    
  const certifications = (formData.get('certifications') as string)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  try {
    const client = await clerkClient();
    
    // We store the profile data in publicMetadata so it's readable by the frontend
    // and potentially by other public APIs we might build.
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        teacherProfile: {
          name,
          location,
          bio,
          website,
          specialties,
          certifications,
          lastUpdated: new Date().toISOString(),
        }
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }

  redirect('/dashboard');
}
