import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await validateJWT(
      req.cookies.get(process.env.COOKIE_NAME)?.value
    );
    const project = await db.project.create({
      data: {
        name: body.name,
        ownerId: user.id,
      },
    });
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'could not Create post!!💥' },
      { status: 500 }
    );
  }
}
