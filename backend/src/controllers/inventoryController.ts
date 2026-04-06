import type { Request, Response } from "express";
import { Types } from "mongoose";
import { InventoryModel } from "../models/Inventory.js";
import { SupplierModel } from "../models/Supplier.js";
import { ApiError } from "../utils/apiError.js";

export const createInventory = async (req: Request, res: Response): Promise<void> => {
  const payload = req.body as {
    supplier_id: string;
    product_name: string;
    category: string;
    quantity: number;
    price: number;
  };

  if (!Types.ObjectId.isValid(payload.supplier_id)) {
    throw new ApiError(400, "Inventory must belong to a valid supplier");
  }

  const supplier = await SupplierModel.findById(payload.supplier_id).lean();

  if (!supplier) {
    throw new ApiError(400, "Inventory must belong to a valid supplier");
  }

  const created = await InventoryModel.create({
    ...payload,
    supplier_id: new Types.ObjectId(payload.supplier_id)
  });

  res.status(201).json({
    id: String(created._id),
    supplier_id: String(created.supplier_id),
    product_name: created.product_name,
    category: created.category,
    quantity: created.quantity,
    price: created.price
  });
};

export const getInventory = async (_req: Request, res: Response): Promise<void> => {
  const docs = await InventoryModel.find({})
    .populate("supplier_id", "name city")
    .sort({ createdAt: -1 })
    .lean();

  const output = docs.map((item) => ({
    id: String(item._id),
    product_name: item.product_name,
    category: item.category,
    quantity: item.quantity,
    price: item.price,
    supplier_id:
      typeof item.supplier_id === "object" && item.supplier_id && "_id" in item.supplier_id
        ? String(item.supplier_id._id)
        : String(item.supplier_id),
    supplier_name:
      typeof item.supplier_id === "object" && item.supplier_id && "name" in item.supplier_id
        ? String(item.supplier_id.name)
        : "Unknown Supplier",
    supplier_city:
      typeof item.supplier_id === "object" && item.supplier_id && "city" in item.supplier_id
        ? String(item.supplier_id.city)
        : "Unknown"
  }));

  res.status(200).json(output);
};
