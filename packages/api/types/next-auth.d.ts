// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    forename: string
    surname: string
  }

  interface Session {
    user: {
      name?: string
      email?: string
      image?: string
      forename?: string
      surname?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    forename?: string
    surname?: string
  }
}
