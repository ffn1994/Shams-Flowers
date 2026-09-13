import { NextResponse, type NextRequest } from 'next/server';

const LANGS = ['ar', 'en'];
const DEFAULT_LANG = 'ar';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLang = LANGS.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
  );
  if (hasLang) return NextResponse.next();

  const preferred = request.headers.get('accept-language')?.toLowerCase().startsWith('en')
    ? 'en'
    : DEFAULT_LANG;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|products|favicon.ico|.*\\.svg).*)'],
};
