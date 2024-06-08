import express from "express";
import { _register_client, _login_client, _createApplication, getOrders, _updateApplicationStatustoApprove, _deleteOrder, _editOrder} from "../controllers/clients.c";
import { verifyToken } from "../middleware/verifyToken";


const router = express.Router();

router.post("/register", _register_client);
router.post("/login", _login_client);
router.post("/application",verifyToken, _createApplication);
router.get("/orderslist",verifyToken, getOrders);
router.put("/orderslist/status/:id",verifyToken, _updateApplicationStatustoApprove);
router.delete("/orderslist/:id",verifyToken, _deleteOrder);
router.put("/orderslist/:id",verifyToken, _editOrder);

export default router;