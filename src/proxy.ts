import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter
const ipCache = new Map<string, { count: number; resetTime: number }>();

export function proxy(request: NextRequest) {
  const ip = (request as { ip?: string }).ip || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  
  // Rate limiting configuration
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  
  // Check path
  const pathname = request.nextUrl.pathname;
  
  // Stricter rate limits for login and modifications
  const isSensitive = pathname.startsWith('/admin') || request.method === 'POST';
  const limit = isSensitive ? 15 : 100;
  
  // Clean up expired entries occasionally (1% chance per request to prevent Map growth)
  if (Math.random() < 0.01) {
    const current = Date.now();
    for (const [key, val] of ipCache.entries()) {
      if (current > val.resetTime) {
        ipCache.delete(key);
      }
    }
  }

  const cached = ipCache.get(ip);
  if (!cached || now > cached.resetTime) {
    ipCache.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    cached.count += 1;
    if (cached.count > limit) {
      return new NextResponse(
        JSON.stringify({
          error: 'Demasiadas peticiones. Por favor, inténtelo de nuevo más tarde.',
          retryAfterSeconds: Math.ceil((cached.resetTime - now) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Retry-After': String(Math.ceil((cached.resetTime - now) / 1000)),
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply to all paths except static assets, _next internal paths, and media files
    '/((?!_next/static|_next/image|favicon.ico|favicon.svg|icon.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)',
  ],
};
