import express from "express";
import { _register_spec, _login_spec, getNewOrders, _getAllApplications, _getApplication} from "../controllers/specialists.c";
import {verifyToken} from "../middleware/verifyToken";

const router = express.Router();

router.post("/register", _register_spec);
router.post("/login", _login_spec);
router.get("/orders",verifyToken, getNewOrders);
router.get("/applications",_getAllApplications);
router.put("/applications/:id", _getApplication);

export default router;