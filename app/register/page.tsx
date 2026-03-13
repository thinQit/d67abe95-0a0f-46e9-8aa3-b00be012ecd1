export const dynamic = 'force-dynamic';

import AuthCard from "@/components/AuthCard"
import GoogleOAuthButton from "@/components/GoogleOAuthButton"

export default function RegisterPage() {
  return (
    <main className="bg-background text-foreground min-h-[80vh] flex items-center py-20 md:py-28 animate-fade-in-up">
      <div className="mx-auto w-full max-w-md px-4 md:px-6">
        <AuthCard
          headline="Create your BookShop account"
          subheadline="Use Google to create your account instantly—no password needed."
          benefits={["Instant account setup", "Cart merges automatically", "Order tracking and history"]}
        >
          <GoogleOAuthButton href="/api/auth/signin/google" label="Sign up with Google" />
        </AuthCard>
      </div>
    </main>
  )
}
