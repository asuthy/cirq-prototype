const { execSync } = require('child_process')

if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.error('Please use pnpm to install dependencies. npm or yarn is not allowed.')
  process.exit(1)
}
