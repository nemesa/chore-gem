import { Route, Get, Tags,Security } from "tsoa";
import express, { Express, Router } from "express";
import { ApiRouter } from "./index";

const ROUTE = "/api-key";

const paths = {
  GET_DEFAULT: "/",
};

@Route("/api-key")
@Tags("ApiKey")
@Security("api_key")
export default class ApiKeyRoute implements ApiRouter {
  public getRoute = () => {
    return ROUTE;
  };
  public geRouter = (): Router => {
    const router = express.Router();

    router.get(paths.GET_DEFAULT, async (_req, res) => {
      //res.redirect('/index.html')
      res.setHeader("Content-Type", "application/json");
      //res.end(JSON.stringify({ data: { propA: 123, propB: "text" } }));
      res.status(200).send(await this.defaultHandler());
    });

    return router;
  };

  @Get(paths.GET_DEFAULT)
  public async defaultHandler(): Promise<{ PropA: number }> {
    return {
      PropA: 1234,
    };
  }
}
