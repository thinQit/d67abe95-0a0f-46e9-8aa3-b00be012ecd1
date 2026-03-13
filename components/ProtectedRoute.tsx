"use client";

import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

// Server component: wrapped in /orders,/admin routes
export default async function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/login");
  }
  if (adminOnly && session.user.role !== "ADMIN") {
    redirect("/");
  }
  return <>{children}</>;
}
