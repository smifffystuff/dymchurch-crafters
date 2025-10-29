import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { Crafter } from '@/lib/models/Crafter';

// Helper function to transform Clerk user data to our User model format
function transformUserData(userData: any) {
  return {
    clerkId: userData.id,
    email: userData.email_addresses[0].email_address,
    firstName: userData.first_name,
    lastName: userData.last_name,
    imageUrl: userData.image_url,
    role: userData.unsafe_metadata?.role || 'customer',
    onboardingComplete: userData.unsafe_metadata?.onboardingComplete || false,
  };
}

// Handler for user.created event
async function handleUserCreated(evt: WebhookEvent) {
  const userData = transformUserData(evt.data);
  await User.create(userData);
  console.log('✅ User created in database:', userData.clerkId);
}

// Handler for user.updated event
async function handleUserUpdated(evt: WebhookEvent) {
  const userData = transformUserData(evt.data);
  const { clerkId, ...updateData } = userData;
  
  await User.findOneAndUpdate(
    { clerkId },
    updateData,
    { new: true, upsert: true }
  );
  
  console.log('✅ User updated in database:', clerkId);
}

// Handler for user.deleted event
async function handleUserDeleted(evt: WebhookEvent) {
  const { id } = evt.data as any;

  console.log('🗑️  Attempting to delete user from database:', id);
  console.log('Event data:', JSON.stringify(evt.data, null, 2));
  
  // Find the user first to check if they have a crafter profile
  const user = await User.findOne({ clerkId: id });
  
  if (!user) {
    console.log('⚠️  User not found in database:', id);
    return;
  }

  console.log('✅ Found user in database:', user.email);
  
  // If user has a crafter profile, delete that too
  if (user.crafterId) {
    console.log('🗑️  Deleting associated crafter profile:', user.crafterId);
    await Crafter.findByIdAndDelete(user.crafterId);
    console.log('✅ Crafter profile deleted');
  }
  
  // Delete the user
  await User.findOneAndDelete({ clerkId: id });
  console.log('✅ User deleted from database:', id, user.email);
}

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
    console.error('❌ Error verifying webhook signature:', err);
    console.error('Webhook secret exists?', !!process.env.CLERK_WEBHOOK_SECRET);
    console.error('Webhook secret length:', process.env.CLERK_WEBHOOK_SECRET?.length);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the webhook
  const eventType = evt.type;

  console.log('📨 Webhook received:', eventType);

  try {
    await connectDB();

    // Route to appropriate handler based on event type
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt);
        break;
      case 'user.updated':
        await handleUserUpdated(evt);
        break;
      case 'user.deleted':
        await handleUserDeleted(evt);
        break;
      default:
        console.log('⚠️  Unhandled event type:', eventType);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('❌ Error handling webhook:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
