import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  role: z.enum(['buyer', 'seller', 'admin']).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.parse(body);

    const existing = await db.user.findUnique({ where: { email: parsed.email } });
    if (existing) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
    }

    const passwordHash = await hashPassword(parsed.password);
    const user = await db.user.create({
      data: {
        email: parsed.email,
        name: parsed.name,
        role: parsed.role ?? 'buyer',
        oauthProvider: 'local',
        passwordHash
      }
    });

    const token = signToken({ sub: user.id, role: user.role, email: user.email });
    return NextResponse.json({ success: true, data: { token, user } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to register' }, { status: 500 });
  }
}
