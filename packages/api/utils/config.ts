if (process.env.NODE_ENV !== 'production') {
  const { config } = require('dotenv')
  config({ path: '/workspaces/cirq/packages/api/.env' })
}

import { z } from 'zod'

const envSchema = z.object({
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_SERVER: z.string(),
  DB_PORT: z.string().regex(/^\d+$/, 'DB_PORT must be a valid number'),
  DB_NAME: z.string(),
})

const env = envSchema.parse(process.env) // This throws if any env variables are missing or invalid

export const config = {
  db: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    server: env.DB_SERVER,
    port: Number(env.DB_PORT),
    name: env.DB_NAME,
  },
}
