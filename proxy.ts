import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const accesstoken = request.cookies.get('access_token')?.value 
  const preAuthtoken = request.cookies.get('pre_auth_token')?.value 
  console.log('Middleware: Checking access token for path:', pathname, 'Access Token:', accesstoken, 'Pre-Auth Token:', preAuthtoken)

  if (pathname.startsWith('/dashboard') && (!accesstoken && !preAuthtoken)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [ '/dashboard/:path*'],
}