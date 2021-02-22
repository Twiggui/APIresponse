import { Router } from "express";
import AuthController from "../controllers/auth";
import CreateNewUserValidator from "../middlewares/createNewUserValidator";

const router = Router();
const asyncHandler = require("express-async-handler");

router.post(
  "/signUp",
  CreateNewUserValidator,
  asyncHandler(AuthController.signUp)
);
router.post("/signIn", asyncHandler(AuthController.signIn));
router.post("/login", asyncHandler(AuthController.login));

export default router;
