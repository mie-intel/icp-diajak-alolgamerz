import { Router } from "express";
import identityRouter from "./identity.js";
import ROOTRouter from "./ROOT.js";
import dbRouter from "./db.js";
import accountRouter from "./account.js";
import contractsModel from "./contracts.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.use("/", ROOTRouter);
router.use("/db", dbRouter);
router.use("/identity", identityRouter);
router.use("/account", accountRouter);
router.use("/contracts", auth, contractsModel);

export default router;