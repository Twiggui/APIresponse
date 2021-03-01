"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("../controllers/auth"));
var createNewUserValidator_1 = __importDefault(require("../middlewares/createNewUserValidator"));
var router = express_1.Router();
var asyncHandler = require("express-async-handler");
router.post("/signUp", createNewUserValidator_1.default, asyncHandler(auth_1.default.signUp));
router.post("/signIn", asyncHandler(auth_1.default.signIn));
router.post("/login", asyncHandler(auth_1.default.login));
exports.default = router;
//# sourceMappingURL=auth.js.map