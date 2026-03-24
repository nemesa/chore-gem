import express, { Express, Router } from "express";
import DefaultRouter from "./default";
import PublicRouter from "./public";

export interface ApiRouter {
  getRoute: () => string;
  geRouter: () => Router;
}

function config(router: Router, type: any) {
  const apiRouter: ApiRouter = new type();
  router.use(apiRouter.getRoute(), apiRouter.geRouter());
}

export default function createRouters(): Router {
  const router = express.Router();
  config(router, DefaultRouter);
  config(router, PublicRouter);
  return router;
}
