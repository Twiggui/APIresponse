import express from "express";
import authRouter from "./routes/auth";
import liveRouter from "./routes/live";
import stationRouter from "./routes/station";
import organisationRouter from "./routes/organisation";

import { SERVER_PORT } from "./env";

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.use("/auth", authRouter);
app.use("/live", liveRouter);
app.use("/station", stationRouter);
app.use("/organisation", organisationRouter);



app.set("x-powered-by", false);

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

export default server;
