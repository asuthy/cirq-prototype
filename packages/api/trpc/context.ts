import { getServerSession } from 'next-auth'
import { authOptions } from 'api/auth/auth-options'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const session = await getServerSession(opts.req, opts.res, authOptions)
  return { session }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
