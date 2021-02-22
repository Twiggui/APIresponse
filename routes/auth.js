const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const authController = require("../controllers/auth");
const createNewUserValidator = require("../middlewares/createNewUserValidator");

router.post(
  "/signUp",
  createNewUserValidator,
  asyncHandler(authController.signUp)
);
router.post("/signIn", asyncHandler(authController.signIn));

module.exports = router;
