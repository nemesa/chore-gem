import { Route, Get, Tags } from "tsoa";
import express, { Express, Router } from "express";
import { ApiRouter } from "./index";

const PUBLIC_ROUTE = "/public";

const paths = {
  GET_DEFAULT: "/",
};

@Route("Public")
@Tags("Public")
export default class DefaultRoute implements ApiRouter {
  public getRoute = () => {
    return PUBLIC_ROUTE;
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
