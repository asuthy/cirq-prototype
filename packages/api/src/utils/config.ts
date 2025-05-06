import { z } from 'zod'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Try to load .env from the working directory (typical in production or direct package runs)
const localEnvPath = path.resolve(process.cwd(), '.env')

if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath })
  console.log(`Loaded .env from: ${localEnvPath}`)
} else {
  const monorepoRoot = path.resolve(__dirname, '../../../../../../../../../..') // adjust this if needed
  const fallbackEnvPath = path.resolve(monorepoRoot, 'packages/api/.env')

  if (fs.existsSync(fallbackEnvPath)) {
    dotenv.config({ path: fallbackEnvPath })
    console.log(`Fallback: Loaded .env from: ${fallbackEnvPath}`)
  } else {
    console.warn(`.env not found at ${localEnvPath} or ${fallbackEnvPath}`)
  }
}

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
