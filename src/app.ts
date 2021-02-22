import express from "express";
import authRouter from "./routes/auth";

import { SERVER_PORT } from "./env";

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.use("/auth", authRouter);

app.set("x-powered-by", false);

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

export default server;
