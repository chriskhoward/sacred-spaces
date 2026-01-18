import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'
import { writeClient } from '@/sanity/lib/write'

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    // Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    // Verify payload with headers
    try {
        const wh = new Webhook(SIGNING_SECRET)
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }

    // Do something with payload
    // For this guide, log payload to console
    const eventType = evt.type
    console.log(`Received webhook with type ${eventType}`)
    console.log('Webhook body:', body)

    if (eventType === 'user.created') {
        const { id, email_addresses } = evt.data
        const email = email_addresses[0]?.email_address

        if (email) {
            console.log(`[Clerk Webhook] Checking if user ${email} is allowed...`)

            // Check Sanity for allowlist
            const allowedUser = await writeClient.fetch(
                `*[_type == "allowedUser" && email == $email][0]`,
                { email }
            )

            if (allowedUser) {
                console.log(`[Clerk Webhook] User ${email} IS allowed. Upgrading...`)

                try {
                    const client = await clerkClient()

                    await client.users.updateUserMetadata(id, {
                        publicMetadata: {
                            membershipType: 'teacher',
                            tier: 'professional' // Default to professional for now, or use allowedUser.plan to map
                        }
                    })

                    // Mark as redeemed in Sanity
                    await writeClient.patch(allowedUser._id)
                        .set({ redeemed: true })
                        .commit()

                    console.log(`[Clerk Webhook] Successfully upgraded ${email}`)
                } catch (error) {
                    console.error(`[Clerk Webhook] Failed to upgrade user:`, error)
                }
            } else {
                console.log(`[Clerk Webhook] User ${email} is NOT in the allowed list.`)
            }
        }
    }

    return new Response('Webhook received', { status: 200 })
}
