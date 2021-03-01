import { Router } from "express";
import StationController from "../../controllers/station";
import verifyToken from "../../middlewares/verifyToken";
// import CreateNewUserValidator from "../middlewares/createNewUserValidator";

const router = Router();
const asyncHandler = require("express-async-handler");


router.get("/:id/live",verifyToken, asyncHandler(StationController.getLives));
router.get("/:id/challenge",verifyToken, asyncHandler(StationController.getChallenges));
router.get("/:id/piste",verifyToken, asyncHandler(StationController.getPistes));
router.get("/:id/useronline",verifyToken, asyncHandler(StationController.getOnlineUser));
router.get("/:id",verifyToken, asyncHandler(StationController.get));
router.get("/", verifyToken, asyncHandler(StationController.getAll));

router.get("/:id/user",verifyToken, asyncHandler(StationController.getUsers));

router.put("/:id/user/:idUtilisateur",verifyToken, asyncHandler(StationController.addUserToStation));

export default router;
