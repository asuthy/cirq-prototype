if (process.env.NODE_ENV !== 'production') {
  const { config } = require('dotenv')
  config({ path: '/workspaces/cirq/packages/api/.env' })
}

import { initTRPC } from '@trpc/server'
import type { Context } from '@cirq/api/trpc/context'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware
