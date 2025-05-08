import { withAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'

export default withAuth(
  function middleware(req: NextRequest) {
    console.log('Middleware applied on', req.nextUrl.pathname)
    // Additional custom logic can go here if needed
  },
  {
    pages: {
      signIn: '/', // Redirect here if unauthenticated
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
)

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|static).*)'],
}
