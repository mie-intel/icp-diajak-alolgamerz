import { Router } from "express";
import { GETuser, POSTuser } from "../controller/db.js";

const router = Router();

router.get("/user", GETuser);
router.post("/user", POSTuser);

export default router;