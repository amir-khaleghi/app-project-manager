import { createJWT, hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';

import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/* Register Api --------------------- */
export async function POST(req: Request, res: Response) {
  const body = await req.json();
  // console.log('this is the body', body);
  const user = await db.user.create({
    data: {
      email: body.formState.email,
      password: await hashPassword(body.formState.password),
      firstName: body.formState.firstName,
      lastName: body.formState.lastName,
    },
  });

  const jwt = await createJWT(user);
  const token = serialize(jwt, {
    // can not access to cookies
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookies().set({
    name: `${process.env.COOKIE_NAME}`,
    value: token,
    httpOnly: true,
    path: '/',
  });

  return NextResponse.json(201);
}
