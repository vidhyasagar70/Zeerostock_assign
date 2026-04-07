import cors from "cors";
import express, { type Request, type Response } from "express";
import morgan from "morgan";
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { env } from "./config/env.js";

const app = express();

const normalizeOrigin = (value: string): string => value.replace(/\/$/, "").toLowerCase();

const corsOriginPatterns: string[] = env.corsOrigin
  .split(",")
  .map((item: string) => item.trim())
  .filter(Boolean)
  .map((item: string) => normalizeOrigin(item));

const isOriginAllowed = (origin: string): boolean => {
  const normalizedOrigin = normalizeOrigin(origin);

  return corsOriginPatterns.some((pattern: string) => {
    if (pattern.includes("*")) {
      const escapedPattern = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
      return new RegExp(`^${escapedPattern}$`).test(normalizedOrigin);
    }

    return pattern === normalizedOrigin;
  });
};

app.use(
  cors({
    origin: (origin: string | undefined, callback): void => {
      if (!origin || corsOriginPatterns.length === 0 || isOriginAllowed(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req: Request, res: Response): void => {
  res.status(200).json({ ok: true });
});

app.use(apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
