import { Router } from "express";
import AuthController from "../../controllers/authentication";

const router = Router();
const asyncHandler = require("express-async-handler");

// FIXME:  get(/users) route de test à supprimer
router.get("/logs", asyncHandler(AuthController.getUsers));
router.get("/logs/:logId", asyncHandler(AuthController.getError));

export default router;
