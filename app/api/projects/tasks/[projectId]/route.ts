import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface contextProps {
  params: {
    id: string;
  };
}
// ─── create task ────────────────────────────────── 🟩 ─

export async function POST(req: NextRequest, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    console.log('this is the body', body);
    const user = await validateJWT(
      req.cookies.get(process.env.COOKIE_NAME)?.value
    );
    console.log('this is the user:', user);
    const task = await db.task.create({
      data: {
        name: body.name,
        ownerId: user?.id,
        projectId: params?.id,
      },
    });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'could not Create post!!💥' },
      { status: 500 }
    );
  }
}

// ─── Delete Data ──────────────────────────────────── 🟩 ─

export async function DELETE(req: NextRequest, context: contextProps) {
  try {
    const { params } = context;
    await db.project.delete({
      where: {
        id: params.projectId,
      },
    });
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Post Can not be deleted!!💥' },
      { status: 500 }
    );
  }
}

// ─── Update Data ──────────────────────────────────── 🟩 ─

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    await db.post.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        content: body.content,
        tagId: body.tag,
      },
    });
    return NextResponse.json(
      { message: 'Updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Post Can not be Updated!!💥' },
      { status: 500 }
    );
  }
}

// ─── Get Post Data ────────────────────────────────── 🟩 ─

export async function GET(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const tasks = await db.task.findFirst({
      where: {
        projectId: params.id,
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'could not Create post!!💥' },
      { status: 500 }
    );
  }
}
