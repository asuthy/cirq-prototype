import { TRPCError } from '@trpc/server'
import { middleware } from '@cirq/api/trpc//trpc'

export const isAuthed = middleware(({ ctx, next }) => {
  console.log('ctx.session', ctx.session)
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  })
})
