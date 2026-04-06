import { InventoryModel } from "../models/Inventory.js";
import { escapeRegex } from "../utils/regex.js";

interface SearchParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const searchInventory = async (params: SearchParams): Promise<Array<{ id: string; productName: string; category: string; price: number; supplierName: string }>> => {
  const filter: Record<string, unknown> = {};

  if (params.q) {
    filter.product_name = { $regex: escapeRegex(params.q), $options: "i" };
  }

  if (params.category) {
    filter.category = { $regex: `^${escapeRegex(params.category)}$`, $options: "i" };
  }

  if (params.minPrice !== undefined || params.maxPrice !== undefined) {
    const priceFilter: Record<string, number> = {};
    if (params.minPrice !== undefined) {
      priceFilter.$gte = params.minPrice;
    }
    if (params.maxPrice !== undefined) {
      priceFilter.$lte = params.maxPrice;
    }

    filter.price = priceFilter;
  }

  const docs = await InventoryModel.find(filter)
    .populate("supplier_id", "name city")
    .sort({ createdAt: -1 })
    .lean();

  return docs.map((item) => ({
    id: String(item._id),
    productName: item.product_name,
    category: item.category,
    price: item.price,
    supplierName: typeof item.supplier_id === "object" && item.supplier_id && "name" in item.supplier_id
      ? String(item.supplier_id.name)
      : "Unknown Supplier"
  }));
};
