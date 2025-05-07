import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from 'api/trpc/router'
import type { Session } from 'next-auth'

export async function handler(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Fake a Session-compatible object
  const session: Session | null = token
    ? {
        user: token,
        expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // 1 hour from now
      }
    : null

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({
      session,
    }),
  })
}

export { handler as GET, handler as POST }
