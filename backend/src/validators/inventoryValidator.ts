import { z } from "zod";

export const createInventorySchema = z.object({
  supplier_id: z.string().trim().min(1, "supplier_id is required"),
  product_name: z.string().trim().min(1, "Product name is required"),
  category: z.string().trim().min(1).default("General"),
  quantity: z.coerce.number().int().min(0, "Quantity must be >= 0"),
  price: z.coerce.number().positive("Price must be > 0")
});

export const searchQuerySchema = z.object({
  q: z.string().trim().optional().transform((value) => value || undefined),
  category: z.string().trim().optional().transform((value) => value || undefined),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional()
});
