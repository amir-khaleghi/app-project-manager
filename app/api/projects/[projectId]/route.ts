import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface contextProps {
  params: {
    id: string;
  };
}

// ─── Delete Data ──────────────────────────────────── 🟩 ─

export async function DELETE(req: Request, context: any) {
  try {
    const { params } = context;

    console.log('🟩 // DELETE // params:', params);

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
