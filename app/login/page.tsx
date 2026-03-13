export const dynamic = 'force-dynamic';

import AuthCard from '@/components/AuthCard'
import FeaturesCards3D from '@/components/FeaturesCards3D'

export default function LoginPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <AuthCard
            headline="Sign in to save your cart"
            subheadline="Continue with Google to sync your cart, view orders, and check out faster."
            primaryCta={{ label: 'Continue with Google', href: '/api/auth/signin?provider=google' }}
            secondaryCta={{ label: 'Back to catalog', href: '/catalog' }}
          />
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <FeaturesCards3D
            badge="Support"
            title="Having trouble signing in?"
            subtitle="Common fixes for OAuth flows in preview environments."
            features={[
              { icon: 'ShieldCheck', title: 'Pop-up blocked', description: 'Allow pop-ups for this site and retry Google sign-in.' },
              { icon: 'User', title: 'Wrong Google account', description: 'Switch accounts in Google and retry.' },
              { icon: 'Link', title: 'Redirect mismatch', description: 'Ensure deployed URL is in authorized OAuth redirect URIs.' },
            ]}
          />
        </div>
      </section>
    </div>
  )
}
