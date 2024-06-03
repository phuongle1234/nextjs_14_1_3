import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthModelView } from './model/auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  if (!request.nextUrl.pathname.startsWith('/adminOffice')) 
    return NextResponse.next()

  
  if( !request?.cookies?.has('access_token') )    
    return NextResponse.redirect( new URL("/adminOffice/login", request.url ) )
  
    
  // ** share data fetching

  // const auth: any = new AuthModelView()
  // const res = await auth.login( { email: "groob@example8HH589.org", password: "Aa123456", } )
  
  // const requestHeaders = new Headers(request.headers)
  //       requestHeaders.set('auth-CT5', JSON.stringify({ ...res }  ) )
 
  // const response = NextResponse.next({ request: { headers: requestHeaders, }, })
 
  // return response
    
  //return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
// '/adminOffice/((?!about|contact|sales|_next|images|login).*)'
// '/adminOffice/:path*', 
export const config = {
  matcher: [
            // '/adminOffice/:path*',
            '/((?!api|_next/static|images|_next/image|favicon.ico|adminOffice/images|adminOffice/login).*)',
           ],
}

// '/((?!api|_next/static|_next/image|favicon.ico).*)',