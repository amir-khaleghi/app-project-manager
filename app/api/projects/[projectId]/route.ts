import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface contextProps {
  params: {
    id: string;
  };
}

// ─── Create task ──────────────────────────────────── 🟩 ─

export async function POST(req: NextRequest, context: any) {
  const { params } = context;

  try {
    /* Get Body --------------------- */
    const body = await req.json();

    /* get user  ------------------ */
    const user = await validateJWT(
      req.cookies.get(process.env.COOKIE_NAME)?.value
    );

    /* Create Project --------------- */
    const project = await db.task.create({
      data: {
        name: body.name,
        ownerId: user.id,
        projectId: params.projectId,
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

// ─── Delete Data ──────────────────────────────────── 🟩 ─

export async function DELETE(req: Request, context: any) {
  try {
    const { params } = context;

    // console.log('🟩 // DELETE // params:', params);

    // Delete all tasks associated with the project
    await db.task.deleteMany({
      where: {
        projectId: params.projectId,
      },
    });

    // delete the project
    await db.project.delete({
      where: {
        id: params.projectId,
      },
    });
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { message: 'Project deletion failed.' },
      { status: 500 }
    );
  }
}

// ─── Update Data ──────────────────────────────────── 🟩 ─

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();

    await db.project.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        description: body.description,
        id: body.id,
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
    const post = await db.post.findFirst({
      where: {
        id: params.id,
      },
      include: {
        tag: true,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'could not Create post!!💥' },
      { status: 500 }
    );
  }
}
