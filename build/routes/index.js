"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("./auth"));
module.exports = function (app) {
    app.use('/auth', auth_1.default);
};
//# sourceMappingURL=index.js.map