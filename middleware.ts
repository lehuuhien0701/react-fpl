import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/i18n.config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// Thêm regex để check static files
const PUBLIC_FILE = /\.(.*)$/
const STATIC_ROUTES = ['/images/', '/favicon.ico', '/robots.txt', '/sitemap.xml']

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // Always return a locale, fallback to default if none matches
  return matchLocale(languages, locales, i18n.defaultLocale) || i18n.defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Allow static files
  if (PUBLIC_FILE.test(pathname) || STATIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Handle default locale paths - redirect /en to /
  if (pathname === `/${i18n.defaultLocale}` || pathname.startsWith(`/${i18n.defaultLocale}/`)) {
    const newPathname = pathname.replace(`/${i18n.defaultLocale}`, '') || '/'
    return NextResponse.redirect(new URL(newPathname, request.url))
  }

  // For root locale paths (e.g., /fr), append a trailing slash
  if (i18n.locales.some(locale => pathname === `/${locale}`)) {
    const url = request.nextUrl.clone()
    url.pathname = `${pathname}/`
    return NextResponse.rewrite(url)
  }

  // For root path or paths without locale, internally rewrite to default locale
  if (!i18n.locales.some(locale => pathname.startsWith(`/${locale}/`))) {
    const url = request.nextUrl.clone()
    url.pathname = `/${i18n.defaultLocale}${pathname === '/' ? '/' : pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    '/((?!api|_next/static|_next/image|favicon.ico).*)']
}