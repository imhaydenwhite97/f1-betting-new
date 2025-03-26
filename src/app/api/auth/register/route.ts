import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth/auth-utils';
import { getDB } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Get database connection
    const db = getDB();

    // Check if email already exists
    const existingUser = await db.prepare(
      'SELECT id FROM users WHERE email = ?'
    )
    .bind(email.toLowerCase())
    .first();

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await db.prepare(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?) RETURNING id, username, email'
    )
    .bind(username, email.toLowerCase(), hashedPassword)
    .first();

    if (!result) {
      return NextResponse.json(
        { message: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Generate JWT token
    const token = generateToken(result.id);

    // Set auth cookie
    setAuthCookie(token);

    // Return user data
    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: result.id,
        username: result.username,
        email: result.email
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
