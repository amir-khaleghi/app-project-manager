import { comparePassword, createJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  console.log('this is the bosy', body);
  const user = await db.user.findUnique({
    where: {
      email: body.formState.email,
    },
  });

  const isUser = await comparePassword(body.formState.password, user?.password);

  if (isUser) {
    const jwt = await createJWT(user?.password);
    const token = serialize(jwt, {
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
}
