export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/orders/:path*", "/admin/:path*", "/api/admin/:path*"],
};
