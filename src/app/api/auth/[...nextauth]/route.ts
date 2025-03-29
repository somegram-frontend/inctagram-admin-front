import NextAuth from 'next-auth';

import { authConfigs } from '@/shared/configs/auth-config';

const handler = NextAuth(authConfigs);

export { handler as GET, handler as POST };
