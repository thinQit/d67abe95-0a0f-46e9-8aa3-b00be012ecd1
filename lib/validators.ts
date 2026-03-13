import { z } from "zod";

export const adminBookCreateSchema = z
  .object({
    title: z.string().min(1),
    author: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().nonnegative(),
    slug: z.string().min(1).optional(),
    stock: z.coerce.number().int().nonnegative().optional(),
    genreId: z.string().optional(),
    imageUrl: z.string().url().optional(),
    featured: z.boolean().optional(),
  })
  .passthrough();

export const adminBookUpdateSchema = adminBookCreateSchema.partial();

export const adminOrdersQuerySchema = z.object({
  status: z.string().optional(),
  customerEmail: z.string().email().optional(),
  take: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

export const cartMergeSchema = z.object({
  items: z.array(
    z.object({
      bookId: z.string().min(1),
      quantity: z.coerce.number().int().min(1),
    })
  ),
});

export const createOrderSchema = z
  .object({
    shippingName: z.string().optional(),
    shippingEmail: z.string().email().optional(),
    shippingPhone: z.string().optional(),
    shippingAddress: z.string().optional(),
    shippingCity: z.string().optional(),
    shippingState: z.string().optional(),
    shippingPostalCode: z.string().optional(),
    shippingCountry: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
