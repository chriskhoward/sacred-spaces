import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/write';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.formData();

    // Thrivecart sends data as form-data
    const event = payload.get('thrivecart_secret');
    const customerEmail = payload.get('customer[email]') as string;
    const customerFirstName = payload.get('customer[first_name]') as string;
    const customerLastName = payload.get('customer[last_name]') as string;
    const orderId = payload.get('order_id');

    // Verify Secret (in a real app, check against your ENV variable)
    if (event !== process.env.THRIVECART_SECRET) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!customerEmail) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    // Check if teacher profile already exists
    const existingTeacher = await writeClient.fetch(
      `*[_type == "teacher" && email == $email][0]`,
      { email: customerEmail }
    );

    if (existingTeacher) {
      // Update existing teacher? (Optional logic here)
      console.log(`Teacher profile already exists for ${customerEmail}`);
      return NextResponse.json({ message: 'Profile already exists' }, { status: 200 });
    }

    // Create new Teacher Profile
    const newTeacher = await writeClient.create({
      _type: 'teacher',
      name: `${customerFirstName} ${customerLastName}`,
      email: customerEmail,
      slug: {
        _type: 'slug',
        current: `${customerFirstName}-${customerLastName}`.toLowerCase().replace(/\s+/g, '-'),
      },
      status: 'active', // You might want this to be 'pending' or 'active'
      membershipId: orderId,
      bio: [], // Empty Portable Text
    });

    console.log(`Created new teacher profile: ${newTeacher._id}`);

    return NextResponse.json({ success: true, id: newTeacher._id });

  } catch (error) {
    console.error('Thrivecart Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
