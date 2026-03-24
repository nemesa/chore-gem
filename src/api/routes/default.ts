import { Route, Get, Tags, Hidden } from "tsoa";
import express, { Express, Router } from "express";
import { ApiRouter } from "./index";

const DEFAULT_ROUTE = "/";

const paths = {
  GET_DEFAULT: "/",
};

@Hidden()
@Route("/")
@Tags("Default")
export default class DefaultRoute implements ApiRouter {
  public getRoute = () => {
    return DEFAULT_ROUTE;
  };
  public geRouter = (): Router => {
    const router = express.Router();

    router.get(paths.GET_DEFAULT, async (_req, res) => {
      //res.redirect('/index.html')
      res.setHeader("Content-Type", "application/json");
      //res.end(JSON.stringify({ data: { propA: 123, propB: "text" } }));
      res.redirect("/docs/")
    });

    return router;
  };
}
