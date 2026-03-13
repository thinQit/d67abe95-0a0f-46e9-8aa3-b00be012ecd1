export type CurrencyCode = "USD";

export type StockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export type OrderStatus = "PENDING" | "PAID" | "FULFILLED" | "CANCELLED";

export interface NavItem {
  label: string;
  href: string;
}

export interface Genre {
  name: string;
  href?: string;
  description?: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  genre: string;
  description?: string;
  coverImage: string;
  price: number;
  currency: CurrencyCode;
  rating: number;
  reviewCount: number;
  featured: boolean;
  stock: number;
  stockStatus: StockStatus;
  isbn13?: string;
}

export interface CartItem {
  id: string;
  bookId: string;
  title: string;
  slug: string;
  coverImage: string;
  price: number;
  currency: CurrencyCode;
  quantity: number;
  stock: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface OrderLineItem {
  id: string;
  bookId: string;
  title: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Address {
  fullName: string;
  email: string;
  address1: string;
  address2?: string;
  city: string;
  stateRegion: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderLineItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}
