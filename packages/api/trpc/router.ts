import { router } from '@cirq/api/trpc/trpc'
import { userRouter } from '@cirq/api/trpc/routers/user'
import { reportRouter } from '@cirq/api/trpc/routers/report'

export const appRouter = router({
  user: userRouter,
  report: reportRouter,
})
