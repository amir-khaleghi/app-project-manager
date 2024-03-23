import { createJWT, hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

import { serialize } from 'cookie';
import { NextRequest } from 'next/server';

/* Register Api --------------------- */
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.json();
  const user = await db.user.create({
    data: {
      email: body.user.email,
      password: await hashPassword(body.user.password),
      firstName: body.user.firstName,
      lastName: body.user.lastName,
    },
  });
  console.log('created user:', user);
  const jwt = await createJWT(user);
  console.log('this is jwt:', jwt);

  // Set the JWT as a cookie in the response
  const serialized = serialize(process.env.COOKIE_NAME, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set secure flag only in production
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // One week
  });
  console.log('this is serilaized: ', serialized);
  // setting the cookies when the browser response back
  res.setHeader('Set-Cookie', serialized);
  res.status(201);
  res.json({});
}

//why not local storage?
/**
 * different resposibility
 * no access to localstorage beacuse localstorage is client side
 * cookies get sent in every request
 */
