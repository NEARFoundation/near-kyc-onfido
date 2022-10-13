import csrf from 'edge-csrf';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// initalize protection function
const csrfProtect = csrf();

// eslint-disable-next-line import/prefer-default-export
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // csrf protection
  const csrfError = await csrfProtect(request, response);

  // check result
  if (csrfError) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/csrf-invalid';
    return NextResponse.rewrite(url);
  }

  return response;
}
