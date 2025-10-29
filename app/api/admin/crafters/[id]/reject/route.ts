import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Crafter } from '@/lib/models/Crafter';
import User from '@/lib/models/User';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    if (user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Delete crafter profile
    const crafter = await Crafter.findByIdAndDelete(id);

    if (!crafter) {
      return NextResponse.json(
        { error: 'Crafter not found' },
        { status: 404 }
      );
    }

    // Remove crafter reference from user
    await User.findOneAndUpdate(
      { crafterId: id },
      { $unset: { crafterId: 1 } }
    );

    return NextResponse.json({
      success: true,
      message: 'Crafter application rejected',
    });
  } catch (error) {
    console.error('Error rejecting crafter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
