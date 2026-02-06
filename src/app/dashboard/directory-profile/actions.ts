'use server';

import { currentUser, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { writeClient } from '@/sanity/lib/write';

export async function updateDirectoryProfile(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Double check authorization using the full user object (more reliable than session claims)
  if (user.publicMetadata?.membershipType !== 'teacher') {
    throw new Error('Unauthorized');
  }

  const userId = user.id;
  const name = formData.get('name') as string;
  const location = formData.get('location') as string;
  const bio = formData.get('bio') as string;
  const website = formData.get('website') as string;
  const specialtiesRaw = formData.getAll('specialties'); // Use getAll for multiple select
  const certificationsRaw = formData.get('certifications') as string;

  // Validation (website and social media are optional)
  if (!name?.trim() || !location?.trim() || !bio?.trim() || !certificationsRaw?.trim()) {
    throw new Error('Name, Location, Bio, and Certifications are required');
  }

  // Handle specialties - getAll returns array of strings
  const specialties = (Array.isArray(specialtiesRaw) ? specialtiesRaw : [specialtiesRaw])
    .map(s => String(s).trim())
    .filter(Boolean);

  // Parse comma-separated certifications
  const certifications = certificationsRaw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Get optional social media fields
  const socialMedia: Record<string, string | undefined> = {
    instagram: (formData.get('instagram') as string)?.trim() || undefined,
    facebook: (formData.get('facebook') as string)?.trim() || undefined,
    twitter: (formData.get('twitter') as string)?.trim() || undefined,
    tiktok: (formData.get('tiktok') as string)?.trim() || undefined,
    youtube: (formData.get('youtube') as string)?.trim() || undefined,
    linkedin: (formData.get('linkedin') as string)?.trim() || undefined,
  };

  // Remove undefined values
  Object.keys(socialMedia).forEach(key => {
    if (!socialMedia[key]) {
      delete socialMedia[key];
    }
  });

  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    // 1. Update Clerk Metadata
    const teacherProfileData: Record<string, any> = {
      name,
      location,
      bio,
      specialties,
      certifications,
      lastUpdated: new Date().toISOString(),
    };

    // Add optional fields if provided
    if (website?.trim()) {
      teacherProfileData.website = website.trim();
    }
    if (Object.keys(socialMedia).length > 0) {
      teacherProfileData.socialMedia = socialMedia;
    }

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        teacherProfile: teacherProfileData,
      },
    });

    // 2. Sync to Sanity
    const existingTeacher = await writeClient.fetch(
      `*[_type == "teacher" && clerkId == $userId][0]`,
      { userId }
    );

    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    if (existingTeacher) {
      // When patching, do NOT include _type (Sanity does not allow changing _type)
      const patchData: Record<string, any> = {
        clerkId: userId,
        name,
        slug: { _type: 'slug', current: slug },
        status: 'active',
        location,
        bio,
        image: clerkUser.imageUrl,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        specialties,
        certifications,
        lastSync: new Date().toISOString(),
      };

      if (website?.trim()) {
        patchData.website = website.trim();
      }
      if (Object.keys(socialMedia).length > 0) {
        patchData.socialMedia = socialMedia;
      }

      await writeClient.patch(existingTeacher._id)
        .set(patchData)
        .commit();
    } else {
      // When creating, include _type
      const createData: Record<string, any> = {
        _type: 'teacher',
        clerkId: userId,
        name,
        slug: { _type: 'slug', current: slug },
        status: 'active',
        location,
        bio,
        image: clerkUser.imageUrl,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        specialties,
        certifications,
        lastSync: new Date().toISOString(),
      };

      if (website?.trim()) {
        createData.website = website.trim();
      }
      if (Object.keys(socialMedia).length > 0) {
        createData.socialMedia = socialMedia;
      }

      await writeClient.create(createData);
    }

  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile. Please try again.');
  }

  redirect('/dashboard/teacher-collective');
}
