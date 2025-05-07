'use client'

import { createTRPCReact } from '@trpc/react-query'
import type { appRouter } from 'api/trpc/router'

export const trpc = createTRPCReact<typeof appRouter>()
