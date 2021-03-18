import { Router } from "express";
import AuthController from "../../controllers/authentication";
import CreateNewUserValidator from "../../middlewares/createNewUserValidator";
import logUserValidator from "../../middlewares/logUserValidator";

const router = Router();
const asyncHandler = require("express-async-handler");

// FIXME: la route signUp est à mettre à jour en fonction de la logique d'enrôllement qui sera retenue
router.post("/signUp", CreateNewUserValidator, asyncHandler(AuthController.signUp));
router.post("/login", logUserValidator, asyncHandler(AuthController.login));

// FIXME:  get(/users) route de test à supprimer
router.post("/users", asyncHandler(AuthController.getUsers));
router.get("/error", asyncHandler(AuthController.getError));

export default router;
