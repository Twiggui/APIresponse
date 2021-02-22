import { Router } from "express";

import authRouter from "./auth";

const routes = Router();

routes.use("/auth", authRouter);

export default routes;

// module.exports = (app: any) => {
//   app.use("/auth", authRouter);
// };
