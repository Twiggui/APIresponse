import authRouter from "./authentication/authentication";
import { rateLimit } from "../middlewares/Authentification/rateLimit";
import roleVerification from "../middlewares/Authentification/roleVerification";
import authStrategy from "../middlewares/Authentification/AuthentificationStrategy";
import beforeLogger from "../middlewares/Logger/beforeLogger";
import afterLogger from "../middlewares/Logger/afterLogger";

const asyncHandler = require("express-async-handler");

module.exports = (app: any) => {
  //public routes
  app.use("/auth", authRouter);

  //protected routes
  app.use(asyncHandler(beforeLogger));
  app.use(asyncHandler(afterLogger));

  // app.use(asyncHandler(authStrategy));
  // app.use(rateLimit);
  // app.use(asyncHandler(roleVerification));

  // FIXME: route de test à supprimer
  app.use("/test", asyncHandler(authRouter));
};
