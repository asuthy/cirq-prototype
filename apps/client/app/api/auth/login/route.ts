// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { appRouter } from 'api/router'

const JWT_SECRET = 'REPLACE_WITH_REAL_SECRET'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  try {
    const user = await appRouter.createCaller({}).userLogin({ loginName: username, password })

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign({ userId: user.code }, JWT_SECRET, { expiresIn: '1h' })

    return NextResponse.json({ success: true, token }) // Send token in the response body
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}
