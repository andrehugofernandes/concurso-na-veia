import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * proxy.ts - Next.js 16 replacement for middleware.ts
 * Handles authentication session refresh and route protection
 */
export async function proxy(request: NextRequest) {
    const url = new URL(request.url);
    const tenantParam = url.searchParams.get('tenant');
    const host = request.headers.get('host') || '';
    
    let tenantSlug = 'petrobras';
    if (tenantParam) {
        tenantSlug = tenantParam;
    } else {
        const parts = host.split('.');
        if (parts.length > 1) {
            const possibleSubdomain = parts[0];
            if (possibleSubdomain !== 'www' && possibleSubdomain !== 'localhost' && possibleSubdomain !== '127') {
                tenantSlug = possibleSubdomain;
            }
        }
    }

    // Criar cliente Supabase temporario para buscar dados publicos do tenant
    const tempSupabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return [] },
                setAll() {},
            }
        }
    );

    const { data: tenant } = await tempSupabase
        .from('concursos')
        .select('slug, primary_color, secondary_color, nome')
        .eq('slug', tenantSlug)
        .single();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-tenant-slug', tenantSlug);
    requestHeaders.set('x-tenant-name', tenant?.nome || 'Passei no Concurso');
    requestHeaders.set('x-tenant-primary', tenant?.primary_color || '#0037C1');
    requestHeaders.set('x-tenant-secondary', tenant?.secondary_color || '#008C32');

    let supabaseResponse = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request: {
                            headers: requestHeaders,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Refresh session
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Protected routes check
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

    // Pages that logged-in users should NOT visit (because they are already logged in)
    const isGuestOnlyRoute = request.nextUrl.pathname === '/login' ||
        request.nextUrl.pathname === '/register' ||
        request.nextUrl.pathname === '/auth/login' ||
        request.nextUrl.pathname === '/auth/register'

    // 2FA pages are for authenticated users, so they are not guest-only

    if (!user && (isProtectedRoute || isAdminRoute)) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // Redirect logged-in users away from auth pages (login/register)
    if (user && isGuestOnlyRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    const isProd = process.env.NODE_ENV === 'production';
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://js.stripe.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' blob: data: https://firebasestorage.googleapis.com https://*.supabase.co https://lh3.googleusercontent.com;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://*.supabase.co wss://*.supabase.co https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebasestorage.googleapis.com https://api.stripe.com;
        frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        ${isProd ? 'upgrade-insecure-requests;' : ''}
    `.replace(/\s{2,}/g, ' ').trim();

    supabaseResponse.headers.set('Content-Security-Policy', cspHeader);
    supabaseResponse.headers.set('X-Content-Type-Options', 'nosniff');
    supabaseResponse.headers.set('X-Frame-Options', 'DENY');
    supabaseResponse.headers.set('X-XSS-Protection', '1; mode=block');
    supabaseResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
    if (process.env.NODE_ENV === 'production') {
        supabaseResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
