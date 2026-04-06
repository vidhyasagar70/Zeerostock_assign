import dotenv from "dotenv";

dotenv.config();

interface Environment {
  port: number;
  mongoUri: string;
  nodeEnv: string;
  corsOrigin: string;
}

export const env: Environment = {
  port: Number(process.env.PORT ?? 3001),
  mongoUri: (process.env.MONGODB_URI as string) ?? "mongodb://127.0.0.1:27017/zeerostock",
  nodeEnv: (process.env.NODE_ENV as string) ?? "development",
  corsOrigin: (process.env.CORS_ORIGIN as string) ?? ""
};
