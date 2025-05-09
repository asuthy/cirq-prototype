import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@cirq/api/trpc/router'
import type { Session } from 'next-auth'

export async function handler(req: NextRequest) {
  // Fetch the JWT token from the request
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Create a session object based on the token
  const session: Session | null = token
    ? {
        user: token,
        expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // 1 hour from now
      }
    : null

  // Use TRPC's fetchRequestHandler to handle the request and create the context with the session
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({
      session, // Pass the session to the TRPC context
    }),
  })
}

export { handler as GET, handler as POST }
