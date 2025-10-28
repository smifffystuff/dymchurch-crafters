import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/clerk',
  '/products(.*)',
  '/crafters(.*)',
  '/categories(.*)',
  '/api/products(.*)',
  '/api/crafters(.*)',
  '/api/categories(.*)',
  '/api/search(.*)',
  '/onboarding(.*)',
  '/api/debug(.*)',
]);

// Define routes that require admin role
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/admin(.*)',
]);

// Define routes that require crafter role
const isCrafterRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/dashboard(.*)',
  '/api/crafters/setup',
  '/api/crafters/me',
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims } = await auth();
  
  // If the route is not public and user is not authenticated, protect it
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  // Get user role from session claims
  const metadata = sessionClaims?.unsafeMetadata as { role?: string } | undefined;
  const userRole = metadata?.role;

  // Debug logging for admin routes
  if (isAdminRoute(request)) {
    console.log('🔍 Admin route accessed:', request.url);
    console.log('   User ID:', userId);
    console.log('   User Role:', userRole);
    console.log('   Session Claims:', JSON.stringify(sessionClaims, null, 2));
  }

  // Check for admin routes
  if (isAdminRoute(request)) {
    if (!userId || userRole !== 'admin') {
      console.log('❌ Admin access denied - redirecting to home');
      return NextResponse.redirect(new URL('/', request.url));
    }
    console.log('✅ Admin access granted');
  }

  // Check for crafter routes
  if (isCrafterRoute(request)) {
    if (!userId || (userRole !== 'crafter' && userRole !== 'admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
