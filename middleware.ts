export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*", "/account/orders/:path*", "/checkout/:path*"],
};
