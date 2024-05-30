import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthModelView } from './model/auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {


  // ** share data fetching

  // const auth: any = new AuthModelView()
  // const res = await auth.login( { email: "groob@example8HH589.org", password: "Aa123456", } )
  
  // const requestHeaders = new Headers(request.headers)
  //       requestHeaders.set('auth-CT5', JSON.stringify({ ...res }  ) )
 
  // const response = NextResponse.next({ request: { headers: requestHeaders, }, })
 
  // return response
    
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more

export const config = {
  matcher: ['/((?!about|contact|sales|_next|images|login).*)'],
}