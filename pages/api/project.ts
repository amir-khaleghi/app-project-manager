import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function handler(req, res) {
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  });
  revalidatePath('/(dashboard)/home');

  res.json({ data: { message: 'hi' } });
}
