import express from "express";
import { _register_spec, _login_spec} from "../controllers/specialists.c";
import {verifyToken} from "../middleware/verifyToken";

const router = express.Router();

router.post("/register", _register_spec);
router.post("/login", _login_spec);
// router.get("/orderslist",verifyToken);

export default router;