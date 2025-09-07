import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      company?: string | null;
      phone?: string | null;
    };
  }

  interface User {
    id: string;
    role?: string;
    company?: string | null;
    phone?: string | null;
  }
}