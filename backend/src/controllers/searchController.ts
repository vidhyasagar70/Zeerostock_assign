import type { Request, Response } from "express";
import { searchInventory } from "../services/inventorySearchService.js";
import { ApiError } from "../utils/apiError.js";

export const searchItems = async (req: Request, res: Response): Promise<void> => {
  const querySource = (res.locals.validatedQuery ?? req.query) as {
    q?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  };

  const { q, category, minPrice, maxPrice } = querySource;

  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    throw new ApiError(400, "Invalid price range: minPrice cannot be greater than maxPrice.");
  }

  const data = await searchInventory({ q, category, minPrice, maxPrice });
  res.status(200).json(data);
};
