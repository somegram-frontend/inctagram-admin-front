import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {Path} from "@/shared/const/path";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(Path.Admin.UserList, req.url));
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET ?? '' });

  if (!token?.token) {
    console.log('token', token);
    return NextResponse.redirect(new URL(Path.Auth.SignIn, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/userList', '/paymentsList', '/postsList', '/statistics'],
};
