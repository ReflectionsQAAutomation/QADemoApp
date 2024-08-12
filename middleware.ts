import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import anymatch from 'anymatch'

const protectedRoutes = [
  '/',
  '/dashboard',      // Matches any route under /dashboard
  '/dashboard/*',      // Matches any route under /dashboard
];

const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {

  const path = req.nextUrl.pathname
  const isProtectedRoute = anymatch(protectedRoutes, path)
  const isPublicRoute = publicRoutes.includes(path)

  const token = cookies().get('token')?.value

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && (!token || token === undefined)) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    token &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}