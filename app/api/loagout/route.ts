// pages/api/logout.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Clear the JWT cookie from the client-side
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    response.cookies.set(process.env.COOKIE_NAME, '', { maxAge: 0 });
    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json(
      { message: 'Error during logout' },
      { status: 500 }
    );
  }
}
