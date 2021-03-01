import { Router } from "express";
import LiveController from "../../controllers/live";
import verifyToken from "../../middlewares/verifyToken";

import liveRouter from "./live";
import stationRouter from "./station";
import organisationRouter from "./organisation";

const router = Router();
const asyncHandler = require("express-async-handler");


router.use("/live", liveRouter);
router.use("/station", stationRouter);
router.use("/organisation", organisationRouter);



router.post("/",verifyToken, asyncHandler(LiveController.createLive));
export default router;
