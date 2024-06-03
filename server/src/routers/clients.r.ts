import express from "express";
import { _register_client, _login_client} from "../controllers/clients.c";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/register", _register_client);
router.post("/login", _login_client);
router.get("/verify",verifyToken, (req,res) => {
    res.sendStatus(200)
}
);

export default router;