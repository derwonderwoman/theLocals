import express from "express";
import { _register_client, _login_client, _createApplication, getOrders, _updateApplicationStatustoApprove} from "../controllers/clients.c";
import { verifyToken } from "../middleware/verifyToken";


const router = express.Router();

router.post("/register", _register_client);
router.post("/login", _login_client);
router.post("/application",verifyToken, _createApplication);
router.get("/orderslist",verifyToken, getOrders);
router.put("/orderslist/:id",verifyToken, _updateApplicationStatustoApprove);

export default router;