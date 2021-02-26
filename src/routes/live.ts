import { Router } from "express";
import LiveController from "../controllers/live";
import verifyToken from "../middlewares/verifyToken";
// import CreateNewUserValidator from "../middlewares/createNewUserValidator";

const router = Router();
const asyncHandler = require("express-async-handler");


router.get("/:idlive",verifyToken, asyncHandler(LiveController.getDetailLive));
router.get("/", verifyToken, asyncHandler(LiveController.getLives));
router.delete("/:idLive", verifyToken, asyncHandler(LiveController.deleteLive));

router.post("/",verifyToken, asyncHandler(LiveController.createLive));
export default router;
