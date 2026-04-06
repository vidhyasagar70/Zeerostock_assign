import cors from "cors";
import express, { type Request, type Response } from "express";
import morgan from "morgan";
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { env } from "./config/env.js";

const app = express();

const corsOrigins: string[] = env.corsOrigin
  .split(",")
  .map((item: string) => item.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigins.length > 0 ? corsOrigins : true
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
