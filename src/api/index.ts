import http from "http";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import StorageService from "./services/storage";

import createRouters from "./routes";

const HTTP_PORT = 62501;
//const HTTPS_PORT = 62502;

const httpApp: Express = express();

httpApp.use(express.static("swagger-doc"));
httpApp.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
      displayRequestDuration: true,
      tryItOutEnabled: true,
      persistAuthorization:true,
    },
  }),
);

const storageService = new StorageService();
storageService.seed()

const router = createRouters(storageService);
httpApp.use("/", router);

//httpApp.use(express.static('./game'));

var httpServer = http.createServer(httpApp);
//var httpsServer = https.createServer({ cert: cert_file, key: key_file }, httpsApp);

httpServer.listen(HTTP_PORT);
console.log(`express - server running at http://localhost:${HTTP_PORT}`);
