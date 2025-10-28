import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Crafter } from '@/lib/models/Crafter';
import User from '@/lib/models/User';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Find user and populate crafter profile
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.crafterId) {
      return NextResponse.json(
        { error: 'No crafter profile found' },
        { status: 404 }
      );
    }

    const crafter = await Crafter.findById(user.crafterId);
    if (!crafter) {
      return NextResponse.json(
        { error: 'Crafter profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      crafter: {
        id: crafter._id,
        name: crafter.name,
        specialty: crafter.specialty,
        location: crafter.location,
        bio: crafter.bio,
        contactEmail: crafter.contactEmail,
        contactPhone: crafter.contactPhone,
        verified: crafter.verified,
        productsCount: crafter.productsCount,
        profileImage: crafter.profileImage,
      },
    });
  } catch (error) {
    console.error('Error fetching crafter profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
