import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

type DecodedJWT = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  groups: string[];
  superuser: boolean;
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");

  if (!token) return NextResponse.redirect(new URL("/logout", request.url));

  const { value } = token;
  try {
    const decoded = await jwtVerify(
      value,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );

    const payload = decoded.payload as DecodedJWT;

    if (payload.superuser || payload.groups.includes("moderator")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/logout", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
