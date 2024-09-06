import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/himig/home"];

// Middleware function
export async function middleware(req: NextRequest) {
  // Check if the requested page is a protected route
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    // Retrieve the token (session) from the request
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If no session exists, redirect to sign-in page
    if (!session) {
      const signInUrl = new URL("/", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow the request to proceed if there is a session
  return NextResponse.next();
}

// Apply middleware only to routes under /himig
export const config = {
  matcher: ["/himig/:path*"],
};
