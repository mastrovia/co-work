import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { api } from '@/lib/api';
import { AxiosError } from 'axios';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          try {
            const res = await api.post('/auth/login', { email, password });
            const data = res.data;

            if (data.success) {
              // Return user object expected by NextAuth
              return {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                role: data.user.role,
                token: data.token,
              };
            }
          } catch (error) {
            console.error('Login error:', error);
            if (error instanceof AxiosError) {
              console.error('Axios error data:', error.response?.data);
            }
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
