import { Router } from "express";
import OrganisationController from "../../controllers/organisation";
import StationController from "../../controllers/station";
import verifyToken from "../../middlewares/verifyToken";
// import CreateNewUserValidator from "../middlewares/createNewUserValidator";

const router = Router();
const asyncHandler = require("express-async-handler");

router.get("/:id/station",verifyToken, asyncHandler(OrganisationController.getStations));
router.get("/:id/user",verifyToken, asyncHandler(OrganisationController.getUsers));

router.get("/:id",verifyToken, asyncHandler(OrganisationController.get));
router.get("/", verifyToken, asyncHandler(OrganisationController.getAll));

router.get("/:id/user/admin",verifyToken, asyncHandler(OrganisationController.getAdminUsers));

router.get("/:id/user",verifyToken, asyncHandler(OrganisationController.getUsers));

router.put("/:id/user/:idUtilisateur",verifyToken, asyncHandler(StationController.addUserToStation));

export default router;
