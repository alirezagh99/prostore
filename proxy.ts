// import { NextRequest, NextResponse } from "next/server";

// export function proxy(request: NextRequest) {
//   const sessionCartId = request.cookies.get("sessionCartId");

//   if (!sessionCartId) {
//     const response = NextResponse.next();

//     response.cookies.set("sessionCartId", crypto.randomUUID(), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//     });

//     return response;
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Run middleware on application routes but skip
//      * Next.js internals and static files.
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export function proxy(...args: Parameters<typeof auth>) {
  return auth(...args);
}
