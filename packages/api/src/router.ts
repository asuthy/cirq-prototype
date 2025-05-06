import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { db } from './utils/db'

const t = initTRPC.create()
export const appRouter = t.router({
  getUsers: t.procedure.query(async () => {
    try {
      const publications = await db.selectFrom('t_user').selectAll().execute()
      return publications
    } catch (err) {
      console.log(err)
    }
  }),

  userLogin: t.procedure
    .input(
      z.object({
        loginName: z.string(),
        password: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const user = await db
          .selectFrom('t_user')
          .selectAll()
          .where('login_name', '=', input.loginName)
          .where('password', '=', input.password)
          .executeTakeFirst()

        if (!user) {
          throw new Error('Invalid credentials')
        }

        return user
      } catch (err) {
        console.error(err)
        throw new Error('Login failed')
      }
    }),
})

export type AppRouter = typeof appRouter
