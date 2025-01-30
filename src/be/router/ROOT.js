import { Router } from "express";
import { GETlog, GETtest } from "../controller/ROOT.js";

const router = Router();

router.get("/test", GETtest);
router.get("/log", GETlog);

export default router;