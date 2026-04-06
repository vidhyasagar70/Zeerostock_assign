import { Schema, model, type InferSchemaType } from "mongoose";

const supplierSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

supplierSchema.index({ name: 1 });

export type Supplier = InferSchemaType<typeof supplierSchema>;

export const SupplierModel = model<Supplier>("Supplier", supplierSchema);
