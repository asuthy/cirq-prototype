import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthOptions } from 'next-auth'
import { userLogin } from '@cirq/api/db/queries/user'
import 'next-auth'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {}

        try {
          const user = await userLogin(username, password)
          return user
        } catch (err) {
          console.error(err)
          throw new Error('Login failed')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.forename = user.forename
        token.surname = user.surname
      }
      return token // The token is returned with the custom information
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.forename + ' ' + token.surname
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/', // Optional: redirect to your custom login page
  },
}
