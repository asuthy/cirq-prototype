import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { db } from './utils/db'

const t = initTRPC.create()
export const appRouter = t.router({
  hello: t.procedure.input(z.string()).query(({ input }) => {
    return `Hello, ${input}!!`
  }),

  getUsers: t.procedure.query(async () => {
    try {
      const publications = await db.selectFrom('t_user').selectAll().execute()
      return publications
    } catch (err) {
      console.log(err)
    }
  }),
})

export type AppRouter = typeof appRouter
