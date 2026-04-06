import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().trim().min(1, "Supplier name is required"),
  city: z.string().trim().min(1, "Supplier city is required")
});
