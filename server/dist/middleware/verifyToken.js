"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
var verifyToken = function (req, res, next) {
    var _a;
    var accessToken = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) || req.headers["x-access-token"];
    if (!accessToken)
        return res.status(401).json({ msg: "anauthorised" });
    jsonwebtoken_1.default.verify(accessToken, ACCESS_TOKEN_SECRET, function (err, decode) {
        if (err) {
            res.status(403).json({ msg: "forbidden" });
            return;
        }
        req.userid = decode.id;
        req.useremail = decode.email;
        next();
    });
};
exports.verifyToken = verifyToken;
