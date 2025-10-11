import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
const protectedRoutes = ["/account", "/checkout", "/wishlist"];

// Auth routes that should redirect to home if already authenticated
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check for current user in cookies/storage (client-side check will be more robust)
  // For now, we'll rely on client-side protection in the actual pages
  // This middleware serves as an additional layer
  
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

