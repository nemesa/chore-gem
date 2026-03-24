import express, { Express, Router } from "express";
import DefaultRouter from "./default";
import PublicRouter from "./public";
import ApiKeyRouter from "./api-key";
import { IStorageService, DataTypeEnum } from "../services/storage";

export interface ApiRouter {
  getRoute: () => string;
  geRouter: () => Router;
}

function config(
  authMiddleware: ApiKeyAuthenticationMiddleware | null,
  router: Router,
  storage: IStorageService,
  type: any,
) {
  const apiRouter: ApiRouter = new type({ storage });
  if (authMiddleware) {
    router.use(
      apiRouter.getRoute(),
      authMiddleware.authenticate,
      apiRouter.geRouter(),
    );
  } else {
    router.use(apiRouter.getRoute(), apiRouter.geRouter());
  }
}

export default function createRouters(storage: IStorageService): Router {
  const authMiddleware = new ApiKeyAuthenticationMiddleware(storage);

  const router = express.Router();
  config(null, router, storage, DefaultRouter);
  config(null, router, storage, PublicRouter);
  config(authMiddleware, router, storage, ApiKeyRouter);
  return router;
}

export class ApiKeyAuthenticationMiddleware {
  private _storage: IStorageService;
  constructor(storage: IStorageService) {
    this._storage = storage;
  }

  public authenticate = (req: any, res: any, next: any) => {
    const header = req.header("x-api-key");
    if (header) {
      const key = this._storage.getByKey(DataTypeEnum.ApiKey, header);
      if (key) {
        next();
        return;
      }
    }
    res.status(403).send("Forbidden");
  }
}
