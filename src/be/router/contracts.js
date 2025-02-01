import { Router } from "express";
import { GETroot, POSTroot, GETid, POSTid, POSTidItem, GETidItemId, POSTidItemId } from "../controller/contracts.js";
import permission from "../middlewares/permission.js";
import finalised from "../middlewares/finalised.js";
import itemExist from "../middlewares/itemExist.js";

const router = Router();

router.get("/", GETroot);
router.post("/", POSTroot);
router.get("/:cID", permission, GETid);
router.post("/:cID", permission, POSTid);
router.post("/:cID/item/", permission, finalised, POSTidItem);
router.get("/:cID/item/:iID", permission, finalised, itemExist, GETidItemId);
router.post("/:cID/item/:iID", permission, finalised, itemExist, POSTidItemId);

export default router;