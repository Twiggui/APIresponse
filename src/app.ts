import express from "express";

import { SERVER_PORT } from "./env";
import cors = require("cors");
import { handleError } from "./helper/error";
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
app.set("trust proxy", 1);
const path = require("path");

// Mise en place de swagger
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(function (err: any, req: any, res: any, next: any) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "content-type");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", false);
  res.setHeader("content-type", "application/json");

  next();
  next(err);
  // console.log(util.inspect(err, false, null));
  res.status(500).send("Something broke!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
require("./routes")(app);

app.set("x-powered-by", false);

app.use((err: any, req: any, res: any, next: any) => {
  handleError(err, req, res);
});

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

export default server;
