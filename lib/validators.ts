import { OrderStatus } from "@prisma/client";
import { z } from "zod";

export const booksQuerySchema = z.object({
  search: z.string().trim().optional(),
  genre: z.string().trim().optional(),
  featured: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  inStock: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  sort: z.enum(["featured", "new", "price_asc", "price_desc", "rating"]).optional(),
  cursor: z.string().optional(),
  take: z.coerce.number().min(1).max(50).optional().default(24),
});

export const cartMergeSchema = z.object({
  items: z.array(
    z.object({
      bookId: z.string().min(1),
      quantity: z.number().int().min(1),
    })
  ),
});

export const addCartItemSchema = z.object({
  bookId: z.string().min(1),
  quantity: z.number().int().min(1),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0),
});

export const createOrderSchema = z.object({
  shippingName: z.string().min(1),
  shippingEmail: z.string().email(),
  shippingAddress1: z.string().min(1),
  shippingAddress2: z.string().optional(),
  shippingCity: z.string().min(1),
  shippingState: z.string().min(1),
  shippingPostal: z.string().min(1),
  shippingCountry: z.string().min(1),
});

export const adminBookCreateSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  featured: z.boolean().optional().default(false),
  rating: z.number().min(0).max(5).optional().default(0),
  reviewCount: z.number().int().min(0).optional().default(0),
  coverImage: z.string().optional(),
  format: z.string().optional(),
  pages: z.number().int().min(1).optional(),
  language: z.string().optional(),
  publisher: z.string().optional(),
  isbn13: z.string().optional(),
});

export const adminBookUpdateSchema = adminBookCreateSchema.partial();

export const adminOrdersQuerySchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  customerEmail: z.string().email().optional(),
  cursor: z.string().optional(),
  take: z.coerce.number().min(1).max(50).optional().default(24),
});

export const adminOrderUpdateSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});
