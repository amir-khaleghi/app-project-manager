import { createJWT, hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

import { serialize } from 'cookie';

/* Register Api --------------------- */
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await db.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });

    const jwt = await createJWT(user);

    // setting the cookies when the browser response back
    res.setHeader(
      'Set-Cookie',
      serialize(process.env.COOKIE_NAME, jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    res.status(201);
    res.end();
  }
}

//why not local storage?
/**
 * different resposibility
 * no access to localstorage beacuse localstorage is client side
 * cookies get sent in every request
 */
