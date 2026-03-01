import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    // Rate limit: 5 requests per minute per user
    if (!rateLimit(`pay-success:${userId}`, 5, 60_000)) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Membership metadata is set by the Clerk billing webhook (user.updated event).
    // Do NOT set membershipType here — this endpoint is unauthenticated beyond Clerk
    // session and would allow privilege escalation if it wrote metadata directly.
    redirect('/dashboard');
}
