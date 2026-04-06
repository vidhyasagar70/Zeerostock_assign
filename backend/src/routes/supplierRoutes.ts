import { Router } from "express";
import { createSupplier, getGroupedInventoryBySupplier } from "../controllers/supplierController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { createSupplierSchema } from "../validators/supplierValidator.js";

const supplierRouter = Router();

supplierRouter.post("/supplier", validate(createSupplierSchema), asyncHandler(createSupplier));
supplierRouter.get("/inventory/grouped", asyncHandler(getGroupedInventoryBySupplier));

export { supplierRouter };
