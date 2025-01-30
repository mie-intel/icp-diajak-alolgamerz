import { Router } from "express";
import identityRouter from "./identity.js";
import ROOTRouter from "./ROOT.js";
import dbRouter from "./db.js";

const router = Router();

router.use("/", ROOTRouter);
router.use("/db", dbRouter);
router.use("/identity", identityRouter);

export default router;