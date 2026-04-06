import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/apiError.js";

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({ message: "Route not found" });
};

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({ message: error.issues[0]?.message ?? "Validation failed" });
    return;
  }

  if (typeof error === "object" && error !== null && "name" in error) {
    const mongooseError = error as { name: string; message?: string };

    if (mongooseError.name === "ValidationError" || mongooseError.name === "CastError") {
      res.status(400).json({ message: mongooseError.message ?? "Invalid database payload" });
      return;
    }
  }

  if (error instanceof Error) {
    res.status(500).json({ message: error.message });
    return;
  }

  res.status(500).json({ message: "Unexpected server error" });
};
