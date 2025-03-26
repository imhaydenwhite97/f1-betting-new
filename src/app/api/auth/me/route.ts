import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/auth-utils';
import { getDB } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get database connection
    const db = getDB();

    // Get current user
    const user = await getCurrentUser(db);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Return user data
    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching user data' },
      { status: 500 }
    );
  }
}
