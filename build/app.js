"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./routes/auth"));
var index_1 = __importDefault(require("./routes/folomi/index"));
var env_1 = require("./env");
var app = express_1.default();
app.set("trust proxy", 1);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/sport", index_1.default);
app.use("/auth", auth_1.default);
app.set("x-powered-by", false);
var server = app.listen(env_1.SERVER_PORT, function () {
    console.log("Server running on port " + env_1.SERVER_PORT);
});
exports.default = server;
//# sourceMappingURL=app.js.map