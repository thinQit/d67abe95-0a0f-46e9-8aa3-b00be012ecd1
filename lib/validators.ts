import { z } from "zod";

export const booksQuerySchema = z.object({
  q: z.string().trim().optional(),
  genre: z.string().trim().optional(),
  featured: z.coerce.boolean().optional(),
  inStock: z.coerce.boolean().optional(),
  sort: z
    .enum(["featured", "created_desc", "price_asc", "price_desc", "rating_desc"])
    .default("featured"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
});

export const addCartItemSchema = z.object({
  bookId: z.string().cuid(),
  quantity: z.number().int().min(1).max(99),
});

export const patchCartItemSchema = z.object({
  quantity: z.number().int().min(0).max(99),
});

export const cartSyncSchema = z.object({
  items: z
    .array(
      z.object({
        bookId: z.string().cuid(),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .max(200),
});

export const checkoutSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(200),
  address1: z.string().min(3).max(200),
  city: z.string().min(2).max(100),
  postalCode: z.string().min(2).max(20),
  country: z.enum(["United States", "United Kingdom", "Germany", "France", "Netherlands"]),
});

export const adminInventoryQuerySchema = z.object({
  q: z.string().trim().optional(),
  genre: z.string().trim().optional(),
  stock: z.enum(["all", "in", "low", "out"]).default("all"),
  featured: z.enum(["all", "featured", "not_featured"]).default("all"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
});

export const adminInventoryPatchSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  author: z.string().min(1).max(200).optional(),
  genre: z.string().min(1).max(100).optional(),
  price: z.number().positive().optional(),
  compareAtPrice: z.number().positive().nullable().optional(),
  stock: z.number().int().min(0).max(100000).optional(),
  featured: z.boolean().optional(),
  archived: z.boolean().optional(),
});

export const adminOrdersQuerySchema = z.object({
  status: z.enum(["all", "pending", "paid", "fulfilled", "cancelled"]).default("all"),
  q: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
});

export const adminOrderPatchSchema = z.object({
  status: z.enum(["pending", "paid", "fulfilled", "cancelled"]).optional(),
  fulfillmentNote: z.string().max(2000).nullable().optional(),
});

export const seedSchema = z.object({
  token: z.string().min(1),
});
