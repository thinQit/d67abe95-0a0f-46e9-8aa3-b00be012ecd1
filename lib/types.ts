export interface NavItem {
  label: string;
  href: string;
}

export interface CTA {
  label: string;
  href: string;
}

export interface SectionBase {
  id: string;
  type: string;
  headline: string;
  subheadline?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  content?: Record<string, unknown>;
}

export interface PageConfig {
  path: string;
  name: string;
  sections: SectionBase[];
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  coverUrl?: string;
}

export interface CartItem {
  id: string;
  bookId: string;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  stock: number;
  coverUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "paid" | "fulfilled" | "cancelled";
  total: number;
  createdAt: string;
  items: CartItem[];
}
