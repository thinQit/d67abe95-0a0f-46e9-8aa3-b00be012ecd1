import './globals.css';
import React from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import Navigation from '@/components/layout/Navigation';

export const metadata = {
  title: "Webapp",
  description: "Next.js 14 application"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider><><Navigation />{children}</></AuthProvider>
      </body>
    </html>
  );
}
