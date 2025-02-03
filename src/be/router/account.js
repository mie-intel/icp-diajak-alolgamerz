import { Router } from "express";
import { POSTlogin, POSTregister, GETid } from "../controller/account.js";

const router = Router();

router.post("/register", POSTregister);
router.post("/login", POSTlogin);
router.get("/:id", GETid);

export default router;