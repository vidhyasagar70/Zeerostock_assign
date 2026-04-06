import { InventoryModel } from "../models/Inventory.js";
import { SupplierModel } from "../models/Supplier.js";

export const seedInitialData = async (): Promise<void> => {
  const count = await InventoryModel.estimatedDocumentCount();

  if (count > 0) {
    return;
  }

  const suppliers = await SupplierModel.insertMany([
    { name: "Metro Supplies", city: "Austin" },
    { name: "SafeHands Co", city: "Houston" },
    { name: "Lumina Partners", city: "San Jose" },
    { name: "LiftGear", city: "Denver" },
    { name: "PackRight", city: "Phoenix" },
    { name: "StackSpace", city: "Chicago" },
    { name: "PrintWorks", city: "Seattle" }
  ]);

  const supplierByName = new Map(suppliers.map((item) => [item.name, item._id]));

  await InventoryModel.insertMany([
    { product_name: "Industrial Drill", category: "Tools", price: 129.99, quantity: 22, supplier_id: supplierByName.get("Metro Supplies") },
    { product_name: "Safety Gloves Pack", category: "Safety", price: 24.5, quantity: 150, supplier_id: supplierByName.get("SafeHands Co") },
    { product_name: "Warehouse LED Panel", category: "Lighting", price: 89, quantity: 65, supplier_id: supplierByName.get("Lumina Partners") },
    { product_name: "Pallet Jack", category: "Logistics", price: 499, quantity: 8, supplier_id: supplierByName.get("LiftGear") },
    { product_name: "Packaging Tape Roll", category: "Packaging", price: 7.25, quantity: 400, supplier_id: supplierByName.get("PackRight") },
    { product_name: "Cordless Screwdriver", category: "Tools", price: 74.99, quantity: 37, supplier_id: supplierByName.get("Metro Supplies") },
    { product_name: "Nitrile Gloves", category: "Safety", price: 31.2, quantity: 115, supplier_id: supplierByName.get("SafeHands Co") },
    { product_name: "Storage Bin Large", category: "Storage", price: 18, quantity: 180, supplier_id: supplierByName.get("StackSpace") },
    { product_name: "Heavy Duty Shelf", category: "Storage", price: 210, quantity: 19, supplier_id: supplierByName.get("StackSpace") },
    { product_name: "Thermal Label Printer", category: "Electronics", price: 185.4, quantity: 24, supplier_id: supplierByName.get("PrintWorks") },
    { product_name: "Barcode Scanner", category: "Electronics", price: 92.75, quantity: 56, supplier_id: supplierByName.get("PrintWorks") },
    { product_name: "Stretch Wrap Film", category: "Packaging", price: 15.8, quantity: 130, supplier_id: supplierByName.get("PackRight") },
    { product_name: "Emergency Exit Sign", category: "Lighting", price: 42, quantity: 73, supplier_id: supplierByName.get("Lumina Partners") },
    { product_name: "Steel Toe Boots", category: "Safety", price: 68.3, quantity: 49, supplier_id: supplierByName.get("SafeHands Co") },
    { product_name: "Pallet Covers", category: "Logistics", price: 12, quantity: 210, supplier_id: supplierByName.get("LiftGear") }
  ]);

  console.log("Seeded MongoDB with initial suppliers and inventory");
};
