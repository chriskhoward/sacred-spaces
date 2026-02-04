'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { writeClient } from '@/sanity/lib/write';

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
  const specialtiesRaw = formData.get('specialties') as string;
  const certificationsRaw = formData.get('certifications') as string;

  // Validation
  if (!name?.trim() || !location?.trim() || !bio?.trim() || !website?.trim() || !specialtiesRaw?.trim() || !certificationsRaw?.trim()) {
    throw new Error('All fields are required');
  }

  // Parse comma-separated lists
  const specialties = specialtiesRaw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const certifications = certificationsRaw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    // 1. Update Clerk Metadata
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

    // 2. Sync to Sanity
    // Find existing teacher by clerkId or create new
    const existingTeacher = await writeClient.fetch(
      `*[_type == "teacher" && clerkId == $userId][0]`,
      { userId }
    );

    const teacherData = {
      _type: 'teacher',
      clerkId: userId,
      name,
      location,
      bio,
      image: clerkUser.imageUrl,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      website,
      specialties,
      certifications,
      lastSync: new Date().toISOString(),
    };

    if (existingTeacher) {
      await writeClient.patch(existingTeacher._id)
        .set(teacherData)
        .commit();
    } else {
      await writeClient.create(teacherData);
    }

  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }

  redirect('/dashboard');
}
