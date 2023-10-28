import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
    const { pathname } = request.nextUrl

    const session = await getToken({ req: request });

    if (!session && !pathname.startsWith("/auth")) return NextResponse.redirect(new URL("/auth/login", request.nextUrl))

    if (session.role !== "admin" && pathname === "/items") return NextResponse.rewrite(new URL("/not-found", request.nextUrl))

    return NextResponse.next()
}

export const config = {
    matcher: "/((?!_next/static|_next/image|favicon.ico|api|auth/*).*)",
}