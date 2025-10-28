import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId, sessionClaims } = await auth();
    const user = await currentUser();

    return NextResponse.json({
      userId,
      sessionClaims,
      unsafeMetadata: user?.unsafeMetadata,
      publicMetadata: user?.publicMetadata,
      role: (user?.unsafeMetadata as any)?.role,
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}
