import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    /* Get Body --------------------- */
    const body = await req.json();

    // console.log('🟩 // POST // body:', body);

    // console.log('this is the cookie', req.cookies.get(process.env.COOKIE_NAME));

    /* get user  ------------------ */
    const user = await validateJWT(
      req.cookies.get(process.env.COOKIE_NAME)?.value
    );
    console.log('this is the user', user);

    /* Create Project --------------- */
    const project = await db.project.create({
      data: {
        name: body.name,
        ownerId: user.id,
      },
    });
    // ──────────────────────────────────────────────────── 🟩 ─

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    // ─── Error handling ───────────────────────────── 🟩 ─

    console.error('Error creating project:', error);
    return NextResponse.json(
      { message: 'Could not create project' },
      { status: 500 }
    );
  }
}
