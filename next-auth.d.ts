import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    token?: string;
  }

  interface Session extends DefaultSession {
    token?: string;
    error?: string;
    accessTokenExpires?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string;
    error?: string;
    accessTokenExpires?: number;
  }
}
