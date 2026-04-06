import { Router } from "express";
import { searchItems } from "../controllers/searchController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { searchQuerySchema } from "../validators/inventoryValidator.js";

const searchRouter = Router();

searchRouter.get("/search", validate(searchQuerySchema, "query"), asyncHandler(searchItems));

export { searchRouter };
