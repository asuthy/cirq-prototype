import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'REPLACE_WITH_REAL_SECRET'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { username, password } = body

  const user = await fakeValidateUser(username, password)
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })

  const response = NextResponse.json({ success: true })
  response.cookies.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })

  return response
}

// 🔒 Replace this with your legacy DB logic later
async function fakeValidateUser(username: string, password: string) {
  if (username === 'admin' && password === 'password') {
    return { id: 1, username: 'admin' }
  }
  return null
}
