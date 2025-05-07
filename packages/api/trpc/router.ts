import { router, publicProcedure } from 'api/trpc/trpc'
import { isAuthed } from 'api/trpc/middleware'
import { db } from 'api/utils/db'

export const appRouter = router({
  me: publicProcedure.use(isAuthed).query(({ ctx }) => {
    return ctx.session?.user
  }),

  getUsers: publicProcedure.use(isAuthed).query(async ({ ctx }) => {
    try {
      const publications = await db.selectFrom('t_user').selectAll().execute()
      return publications
    } catch (err) {
      console.log(err)
    }
  }),

  /*userLogin: publicProcedure
    .use(isAuthed)
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
    }),*/
})
