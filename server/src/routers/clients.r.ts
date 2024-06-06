import express from "express";
import { _register_client, _login_client, _createApplication} from "../controllers/clients.c";
import { verifyToken } from "../middleware/verifyToken";


const router = express.Router();

router.post("/register", _register_client);
router.post("/login", _login_client);
router.post("/application",verifyToken, _createApplication);
// router.get("/orderstatus",  )
router.get("/orderslist",verifyToken)

export default router;