import type { Request, Response } from "express";
import { SupplierModel } from "../models/Supplier.js";
import { InventoryModel } from "../models/Inventory.js";

export const createSupplier = async (req: Request, res: Response): Promise<void> => {
  const supplier = await SupplierModel.create(req.body as { name: string; city: string });

  res.status(201).json({
    id: String(supplier._id),
    name: supplier.name,
    city: supplier.city
  });
};

export const getGroupedInventoryBySupplier = async (_req: Request, res: Response): Promise<void> => {
  const grouped = await SupplierModel.aggregate([
    {
      $lookup: {
        from: "inventories",
        localField: "_id",
        foreignField: "supplier_id",
        as: "items"
      }
    },
    {
      $addFields: {
        item_count: { $size: "$items" },
        total_inventory_value: {
          $sum: {
            $map: {
              input: "$items",
              as: "item",
              in: { $multiply: ["$$item.quantity", "$$item.price"] }
            }
          }
        }
      }
    },
    { $project: { items: 0 } },
    { $sort: { total_inventory_value: -1 } }
  ]);

  const normalized = grouped.map((row) => ({
    supplier_id: String(row._id),
    supplier_name: row.name,
    supplier_city: row.city,
    item_count: row.item_count,
    total_inventory_value: row.total_inventory_value
  }));

  res.status(200).json(normalized);
};
