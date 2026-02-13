import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    try {
        const client = await clerkClient();

        // Use the clerk instance to update the user's public metadata
        // We know they just paid for Core or Pro, so they are a teacher
        await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                membershipType: 'teacher',
                onboardingComplete: false, // Ensures the profile banner shows on dashboard
            },
        });

        console.log(`[Pay Success] Updated user ${userId} to membershipType: teacher`);
    } catch (error) {
        console.error('[Pay Success] Error updating user metadata:', error);
        // We still redirect to dashboard, the banner might just not show if metadata fails
    }

    // Redirect to the dashboard as requested
    redirect('/dashboard');
}
