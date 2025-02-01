import { Router } from "express";
import { GETlog, GETRoot, GETtest } from "../controller/ROOT.js";

const router = Router();

router.get("/", GETRoot)
router.get("/test", GETtest);
router.get("/log", GETlog);

export default router;