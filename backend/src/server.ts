import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { seedInitialData } from "./seed/seedData.js";
import { app } from "./app.js";

const bootstrap = async (): Promise<void> => {
  await connectDatabase();
  await seedInitialData();

  app.listen(env.port, () => {
    console.log(`Backend API running on http://localhost:${env.port}`);
  });
};

bootstrap().catch((error: unknown) => {
  console.error("Fatal startup error", error);
  process.exit(1);
});
