import type { User } from '@prisma/client';
import { NextRequest } from 'next/server';
import db from './db';
import { getTokenFromHeader, verifyToken } from './auth';

export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  const token = getTokenFromHeader(request.headers.get('authorization'));
  if (!token) return null;
  try {
    const payload = verifyToken(token);
    const userId = typeof payload.sub === 'string' ? payload.sub : null;
    if (!userId) return null;
    return db.user.findUnique({ where: { id: userId } });
  } catch (_error) {
    return null;
  }
}

export function userHasRole(user: User | null, roles: string[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}
