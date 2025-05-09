'use client'

import type { appRouter } from '@cirq/api/trpc/router'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<typeof appRouter>()
