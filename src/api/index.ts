import http from "http";
import express, { Express } from "express";

const HTTP_PORT = 62501;
//const HTTPS_PORT = 62502;

const httpApp: Express = express();
httpApp.get("/", (_req, res) => {
  //res.redirect('/index.html')
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ data: { propA: 123, propB: "text" } }));
});

//httpApp.use(express.static('./game'));

var httpServer = http.createServer(httpApp);
//var httpsServer = https.createServer({ cert: cert_file, key: key_file }, httpsApp);

httpServer.listen(HTTP_PORT);
console.log(`express - server running at http://localhost:${HTTP_PORT}`);
