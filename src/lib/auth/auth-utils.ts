import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key-for-development';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: number): string {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { id: number } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number };
  } catch (error) {
    return null;
  }
}

export function setAuthCookie(token: string) {
  cookies().set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function getAuthCookie(): string | undefined {
  return cookies().get('auth_token')?.value;
}

export function removeAuthCookie() {
  cookies().delete('auth_token');
}

export async function getCurrentUser(db: any) {
  const token = getAuthCookie();
  
  if (!token) {
    return null;
  }
  
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return null;
  }
  
  const user = await db.prepare(
    'SELECT id, username, email FROM users WHERE id = ?'
  )
  .bind(decoded.id)
  .first();
  
  return user;
}
