import { Schema, model, Types, type InferSchemaType } from "mongoose";

const inventorySchema = new Schema(
  {
    supplier_id: {
      type: Types.ObjectId,
      ref: "Supplier",
      required: true,
      index: true
    },
    product_name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, default: "General" },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0.01 }
  },
  { timestamps: true }
);

inventorySchema.index({ category: 1 });
inventorySchema.index({ price: 1 });
inventorySchema.index({ product_name: "text" });

export type Inventory = InferSchemaType<typeof inventorySchema>;

export const InventoryModel = model<Inventory>("Inventory", inventorySchema);
