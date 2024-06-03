"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var clients_c_1 = require("../controllers/clients.c");
var verifyToken_1 = require("../middleware/verifyToken");
var router = express_1.default.Router();
router.post("/register", clients_c_1._register_client);
router.post("/login", clients_c_1._login_client);
router.get("/verify", verifyToken_1.verifyToken, function (req, res) {
    res.sendStatus(200);
});
exports.default = router;
