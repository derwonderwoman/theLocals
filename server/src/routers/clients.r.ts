import express from "express";
import { _register_client, _login_client, _application} from "../controllers/clients.c";
import { verifyToken } from "../middleware/verifyToken";


const router = express.Router();

router.post("/register", _register_client);
router.post("/login", _login_client);
router.get("/verify",verifyToken, (req,res) => {
    res.sendStatus(200)
}
);
router.post("/application", _application);
router.get("/orderstatus",  )

export default router;