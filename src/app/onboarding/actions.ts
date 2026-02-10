'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { writeClient } from '@/sanity/lib/write';

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
    const clerkUser = await client.users.getUser(userId);
    
    const metadata: any = {
      membershipType,
      tier: 'free', // Default tier
    };

    // If teacher, mark that they need to complete profile
    if (membershipType === 'teacher') {
      metadata.onboardingComplete = false; // Will be set to true after profile completion
    } else {
      metadata.onboardingComplete = true;
    }

    await client.users.updateUserMetadata(userId, {
      publicMetadata: metadata,
    });

    // Redirect teachers to profile completion, others to dashboard
    if (membershipType === 'teacher') {
      return redirect('/onboarding'); // Will show profile form
    }
  } catch (error) {
    console.error('Error updating user metadata:', error);
    return;
  }

  return redirect('/dashboard');
}

export async function completeTeacherOnboarding(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

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
  const socialMedia = {
    instagram: (formData.get('instagram') as string)?.trim() || undefined,
    facebook: (formData.get('facebook') as string)?.trim() || undefined,
    twitter: (formData.get('twitter') as string)?.trim() || undefined,
    tiktok: (formData.get('tiktok') as string)?.trim() || undefined,
    youtube: (formData.get('youtube') as string)?.trim() || undefined,
    linkedin: (formData.get('linkedin') as string)?.trim() || undefined,
  };

  // Remove undefined values
  Object.keys(socialMedia).forEach(key => {
    if (!socialMedia[key as keyof typeof socialMedia]) {
      delete socialMedia[key as keyof typeof socialMedia];
    }
  });

  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    // Use the manually uploaded image if available, otherwise fall back to imageUrl
    // Clerk stores uploaded images in user.imageUrl, but we want to prioritize manually uploaded
    // The issue is that Clerk syncs from Google, so we need to check if there's a way to distinguish
    // For now, we'll use imageUrl but note that users should upload via Clerk's profile settings
    const imageUrl = clerkUser.imageUrl;

    // 1. Update Clerk Metadata with teacher profile
    const teacherProfileData: any = {
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
        membershipType: 'teacher',
        onboardingComplete: true,
        teacherProfile: teacherProfileData,
      },
    });

    // 2. Sync to Sanity immediately
    const teacherData: any = {
      _type: 'teacher',
      clerkId: userId,
      name,
      slug: { _type: 'slug', current: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') },
      status: 'active',
      location,
      bio,
      image: imageUrl, // This will use the manually uploaded image if user uploaded one
      email: clerkUser.emailAddresses[0]?.emailAddress,
      specialties,
      certifications,
      lastSync: new Date().toISOString(),
    };

    // Add optional fields if provided
    if (website?.trim()) {
      teacherData.website = website.trim();
    }
    if (Object.keys(socialMedia).length > 0) {
      teacherData.socialMedia = socialMedia;
    }

    // Check if teacher already exists
    const existingTeacher = await writeClient.fetch(
      `*[_type == "teacher" && clerkId == $userId][0]`,
      { userId }
    );

    if (existingTeacher) {
      await writeClient.patch(existingTeacher._id)
        .set(teacherData)
        .commit();
    } else {
      await writeClient.create(teacherData);
    }

  } catch (error) {
    console.error('Error completing teacher onboarding:', error);
    throw new Error('Failed to complete profile');
  }

  return redirect('/dashboard/teacher-collective');
}
