import type { Request, RequestHandler } from "express";
import { z } from "zod";
import { ApiError } from "../utils/apiError.js";

type ValidationTarget = "body" | "query";

const getTargetData = (req: Request, target: ValidationTarget): unknown => {
  if (target === "query") {
    return req.query;
  }

  return req.body;
};

export const validate = <T extends z.ZodTypeAny>(
  schema: T,
  target: ValidationTarget = "body"
): RequestHandler => {
  return (req, res, next) => {
    const parsed = schema.safeParse(getTargetData(req, target));

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Validation failed";
      next(new ApiError(400, message));
      return;
    }

    if (target === "query") {
      res.locals.validatedQuery = parsed.data;
    } else {
      req.body = parsed.data;
    }

    next();
  };
};
