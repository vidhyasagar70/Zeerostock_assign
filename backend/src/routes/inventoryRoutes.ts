import { Router } from "express";
import { createInventory, getInventory } from "../controllers/inventoryController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { createInventorySchema } from "../validators/inventoryValidator.js";

const inventoryRouter = Router();

inventoryRouter.post("/inventory", validate(createInventorySchema), asyncHandler(createInventory));
inventoryRouter.get("/inventory", asyncHandler(getInventory));

export { inventoryRouter };
