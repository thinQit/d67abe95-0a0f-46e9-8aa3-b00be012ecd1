import { z } from "zod";

export const bookListQuerySchema = z.object({
  search: z.string().optional(),
  genre: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  inStock: z.coerce.boolean().optional(),
  sort: z.enum(["featured", "created_desc", "price_asc", "price_desc", "rating_desc"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
});

export const addCartItemSchema = z.object({
  bookId: z.string().cuid(),
  quantity: z.number().int().min(1).max(99),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1).max(99),
});

export const checkoutSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  addressLine1: z.string().min(3),
  addressLine2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(2),
  country: z.string().min(2),
});

export const adminCreateBookSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  author: z.string().min(2),
  description: z.string().min(10),
  price: z.number().nonnegative(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
  stock: z.number().int().nonnegative(),
  featured: z.boolean().optional(),
  coverUrl: z.string().url().optional(),
  isbn: z.string().optional(),
  format: z.string().optional(),
  pages: z.number().int().positive().optional(),
  publisher: z.string().optional(),
  publicationDate: z.string().datetime().optional(),
  language: z.string().optional(),
  genreName: z.string().min(2),
});

export const adminUpdateBookSchema = adminCreateBookSchema.partial();

export const adminOrderUpdateSchema = z.object({
  status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]).optional(),
  trackingNumber: z.string().optional(),
});
