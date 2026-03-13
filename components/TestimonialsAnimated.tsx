"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

interface TestimonialItem {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface TestimonialsAnimatedProps {
  headline: string;
  subheadline?: string;
  testimonials: TestimonialItem[];
  autoplay?: boolean;
}

export default function TestimonialsAnimated({
  headline = "Loved by thousands of happy shoppers",
  subheadline = "Real feedback from customers who trust us for quality, value, and fast delivery.",
  testimonials = [],
  autoplay = true,
}: Partial<TestimonialsAnimatedProps>) {
  const safeTestimonials =
    testimonials.length > 0
      ? testimonials
      : [
          {
            quote:
              "Checkout was super smooth and my order arrived earlier than expected. The product quality is excellent.",
            name: "Maya Thompson",
            designation: "Verified Buyer",
            src: "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577321/site-images/team-people/1181622.jpg",
          },
          {
            quote:
              "I found exactly what I needed in minutes. Great prices, clear descriptions, and hassle-free returns.",
            name: "Daniel Brooks",
            designation: "Repeat Customer",
            src: "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577358/site-images/team-people/1181401.jpg",
          },
          {
            quote:
              "Customer support was fast and helpful. This is now my go-to store for everyday essentials.",
            name: "Sofia Ramirez",
            designation: "Loyal Member",
            src: "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577335/site-images/team-people/1181734.jpg",
          },
        ];

  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="animate-fade-in-up mx-auto max-w-2xl text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{headline}</h2>
          {subheadline && <p className="mt-4 text-lg text-muted-foreground">{subheadline}</p>}
        </div>
        <AnimatedTestimonials testimonials={safeTestimonials} autoplay={autoplay} />
      </div>
    </section>
  );
}
