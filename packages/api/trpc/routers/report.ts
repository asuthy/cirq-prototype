import { router, publicProcedure } from '@cirq/api/trpc/trpc'
import { isAuthed } from '@cirq/api/trpc/middleware'
import { db } from '@cirq/api/utils/db'

export const reportRouter = router({
  netSaleReport: publicProcedure.use(isAuthed).query(async ({ ctx }) => {
    try {
      const reportDetails = await db.selectFrom('t_r0001_net_sale_detail').selectAll().execute()
      return reportDetails
    } catch (err) {
      console.log(err)
    }
  }),
})
