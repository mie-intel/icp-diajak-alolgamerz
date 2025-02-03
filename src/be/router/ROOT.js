import { Router } from "express";
import { GETlog, GETRoot, GETtest, POSTproof } from "../controller/ROOT.js";

const router = Router();

router.get("/", GETRoot)
router.get("/test", GETtest);
router.get("/log", GETlog);
router.post("/proof", POSTproof);

export default router;