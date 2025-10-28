import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 400 }
    );
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the webhook
  const eventType = evt.type;

  try {
    await connectDB();

    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data;

      await User.create({
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        imageUrl: image_url,
        role: unsafe_metadata?.role || 'customer',
        onboardingComplete: unsafe_metadata?.onboardingComplete || false,
      });

      console.log('User created in database:', id);
    }

    if (eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data;

      await User.findOneAndUpdate(
        { clerkId: id },
        {
          email: email_addresses[0].email_address,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
          role: unsafe_metadata?.role,
          onboardingComplete: unsafe_metadata?.onboardingComplete,
        },
        { new: true, upsert: true }
      );

      console.log('User updated in database:', id);
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;

      await User.findOneAndDelete({ clerkId: id });

      console.log('User deleted from database:', id);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
