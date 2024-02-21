import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';

/* Hash Password -------------------- */
export const hashPassword = (password) => bcrypt.hash(password, 10);

/* Compare Pass --------------------- */

export const comparePassword = (inputPassword, hashPassword) => {
  bcrypt.compare(inputPassword, hashPassword);
};

/* Create JWT ----------------------- */
export const createJWT = (user) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;
  return new SignJWT({
    payload: { id: user.id, email: user.email },
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

/* VALIDATE JWT --------------------- */

export const validateJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  return payload.payload as any;
};

/* GETTING JWT From Cookies --------- */

export const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  const { id } = await validateJWT(jwt);

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
