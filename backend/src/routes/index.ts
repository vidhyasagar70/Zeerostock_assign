import { Router } from "express";
import { searchRouter } from "./searchRoutes.js";
import { supplierRouter } from "./supplierRoutes.js";
import { inventoryRouter } from "./inventoryRoutes.js";

const apiRouter = Router();

apiRouter.use(searchRouter);
apiRouter.use(supplierRouter);
apiRouter.use(inventoryRouter);

export { apiRouter };
