export const dynamic = 'force-dynamic';

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Contact BookShop</h1>
          <p className="mt-4 text-muted-foreground">
            Questions about orders, inventory, or OAuth setup? Send a message.
          </p>
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <p className="mt-2 text-muted-foreground">We typically respond within 1 business day.</p>
            <div className="mt-6">
              <Button className="transition-all duration-200 hover:scale-105">Send message</Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
