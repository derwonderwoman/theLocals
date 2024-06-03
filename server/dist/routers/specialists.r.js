"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var specialists_c_1 = require("../controllers/specialists.c");
var verifyToken_1 = require("../middleware/verifyToken");
var router = express_1.default.Router();
router.post("/register", specialists_c_1._register_spec);
router.post("/login", specialists_c_1._login_spec);
router.get("/verify", verifyToken_1.verifyToken, function (req, res) {
    res.sendStatus(200);
});
exports.default = router;
