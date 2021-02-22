"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var md5_1 = __importDefault(require("md5"));
var saltRounds = 10;
var db = require("../db");
var findByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var lowerCaseEmail, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lowerCaseEmail = email.toLowerCase();
                return [4 /*yield*/, db.query("SELECT * FROM users WHERE email = ?", [
                        lowerCaseEmail,
                    ])];
            case 1:
                rows = _a.sent();
                if (rows.length) {
                    return [2 /*return*/, rows[0]];
                }
                return [2 /*return*/, null];
        }
    });
}); };
var findByEmailAndPassword = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var lowerCaseEmail, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lowerCaseEmail = email.toLowerCase();
                return [4 /*yield*/, db.query("SELECT * FROM utilisateur WHERE emailUtilisateur = ? AND passUtilisateur= ?", [lowerCaseEmail, password])];
            case 1:
                rows = _a.sent();
                if (rows.length > 0) {
                    return [2 /*return*/, rows[0]];
                }
                return [2 /*return*/, null];
        }
    });
}); };
var hashPassword = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt.hash(password, saltRounds)];
            case 1:
                hashedPassword = _a.sent();
                return [2 /*return*/, hashedPassword];
        }
    });
}); };
var verifyPassword = function (password, encrypted_password) { return __awaiter(void 0, void 0, void 0, function () {
    var verifiedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt.compare(password, encrypted_password)];
            case 1:
                verifiedPassword = _a.sent();
                return [2 /*return*/, verifiedPassword];
        }
    });
}); };
var emailAlreadyExists = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var lowerCaseEmail, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lowerCaseEmail = email.toLowerCase();
                return [4 /*yield*/, db.query("SELECT * FROM utilisateur WHERE emailUtilisateur = ?", [
                        lowerCaseEmail,
                    ])];
            case 1:
                rows = _a.sent();
                if (rows.length) {
                    return [2 /*return*/, new Error("Email already exists")];
                }
                return [2 /*return*/, false];
        }
    });
}); };
module.exports.createUserInDatabase = function (userDatas) { return __awaiter(void 0, void 0, void 0, function () {
    var datasValidation, lastname, firstname, email, password, lowercaseEmail, hashedPassword, res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, emailAlreadyExists(userDatas.email)];
            case 1:
                datasValidation = _a.sent();
                if (!!datasValidation) return [3 /*break*/, 4];
                lastname = userDatas.lastname, firstname = userDatas.firstname, email = userDatas.email, password = userDatas.password;
                lowercaseEmail = email.toLowerCase();
                return [4 /*yield*/, hashPassword(password)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, db.query("INSERT INTO u (lastname, firstname, email, encrypted_password) VALUES (?, ?, ?, ?)", [lastname, firstname, lowercaseEmail, hashedPassword])];
            case 3:
                res = _a.sent();
                if (res) {
                    return [2 /*return*/, { lastname: lastname, firstname: firstname, lowercaseEmail: lowercaseEmail, id: res.insertId }];
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, error_1];
            case 6: return [2 /*return*/];
        }
    });
}); };
module.exports.logUserFromDatabase = function (userDatas) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, lowercaseEmail, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = userDatas.email, password = userDatas.password;
                lowercaseEmail = email.toLowerCase();
                console.log(lowercaseEmail, md5_1.default(password));
                return [4 /*yield*/, findByEmailAndPassword(lowercaseEmail, md5_1.default(password))];
            case 1:
                user = _a.sent();
                if (!!user) {
                    return [2 /*return*/, user];
                }
                throw new Error("user or password incorrect");
        }
    });
}); };
//# sourceMappingURL=auth.js.map