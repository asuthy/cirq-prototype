import { router, publicProcedure } from '@cirq/api/trpc/trpc'
import { isAuthed } from '@cirq/api/trpc/middleware'
import { db } from '@cirq/api/utils/db'

export const userRouter = router({
  getUsers: publicProcedure.use(isAuthed).query(async ({ ctx }) => {
    try {
      const users = await db.selectFrom('t_user').selectAll().execute()
      return users
    } catch (err) {
      console.log(err)
    }
  }),
})
