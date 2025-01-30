import { Router } from "express";
import { GETroot } from "../controller/identity.js";

const router = Router();

router.get("/", GETroot);

export default router;