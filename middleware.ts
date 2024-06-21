import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthModelView } from './model/auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  if (!request.nextUrl.pathname.startsWith('/adminOffice')) 
    return NextResponse.next()

  const token = request?.cookies?.get('access_token')
   
  if (request.nextUrl.pathname.startsWith('/adminOffice/login')) 
    return NextResponse.next()

  if( !token )    
    return NextResponse.redirect( new URL("/adminOffice/login", request.url ) )

  try {
      
  // ** share data fetching
 

    const auth: any = new AuthModelView( { token: token?.value } )
    const res = await auth.me( )
    
    const requestHeaders = new Headers(request.headers)
          requestHeaders.set('auth-CT5', JSON.stringify({ ...( res?.users || {} ) }  ) )
  
    // if (request.nextUrl.pathname.startsWith('/adminOffice/login')) 
    //     return token ? NextResponse.redirect( new URL("/adminOffice", request.url ) ) : NextResponse.next()

    return NextResponse.next({ request: { headers: requestHeaders }, })
    
  
  } catch (error) {
    console.log( {  error } );
    const resError = NextResponse.redirect( new URL("/adminOffice/login", request.url ) )
          resError.cookies.delete('access_token')    
    return resError
  }

}
 
// See "Matching Paths" below to learn more
// '/adminOffice/((?!about|contact|sales|_next|images|login).*)'
// '/adminOffice/:path*', 

export const config = {
  matcher: [
            // '/adminOffice/:path*',
            '/((?!api|_next/static|images|_next/image|favicon.ico|adminOffice/images).*)',
           ],
}

//|adminOffice/login