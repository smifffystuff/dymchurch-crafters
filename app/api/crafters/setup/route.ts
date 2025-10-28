import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Crafter } from '@/lib/models/Crafter';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { businessName, bio, specialty, phone, location } = await req.json();

    // Check if user already has a crafter profile
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.crafterId) {
      return NextResponse.json(
        { error: 'Crafter profile already exists' },
        { status: 400 }
      );
    }

    // Create crafter profile
    const crafter = await Crafter.create({
      name: businessName,
      bio,
      specialty,
      contactEmail: user.email,
      contactPhone: phone,
      location,
      userId: user._id,
      verified: false, // Admin needs to verify
    });

    // Update user with crafter reference
    await User.findByIdAndUpdate(user._id, {
      crafterId: crafter._id,
    });

    return NextResponse.json({
      success: true,
      crafter: {
        id: crafter._id,
        name: crafter.name,
        verified: crafter.verified,
      },
    });
  } catch (error) {
    console.error('Error creating crafter profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
