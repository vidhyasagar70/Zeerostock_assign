import cors from "cors";
import express from "express";
import morgan from "morgan";
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { env } from "./config/env.js";

const app = express();

const corsOrigins = env.corsOrigin
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigins.length > 0 ? corsOrigins : true
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use(apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
