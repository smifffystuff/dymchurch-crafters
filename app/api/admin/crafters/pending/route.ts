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

    // Check if user is admin
    const user = await User.findOne({ clerkId: userId });
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Get all unverified crafters
    const pendingCrafters = await Crafter.find({ verified: false }).sort({ createdAt: -1 });

    return NextResponse.json({
      crafters: pendingCrafters,
    });
  } catch (error) {
    console.error('Error fetching pending crafters:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
