import { Router } from "express";
import { GETroot, POSTroot, GETid, POSTid, POSTidItem, GETidItemId, POSTidItemId, GETitemIdMeeting, POSTitemIdMeeting, POSTitemIdMeetingEnd } from "../controller/contracts.js";
import permission from "../middlewares/permission.js";
import finalised from "../middlewares/finalised.js";
import itemExist from "../middlewares/itemExist.js";
import meetingItem from "../middlewares/meetingItem.js";

const router = Router();

router.get("/", GETroot);
router.post("/", POSTroot);
router.get("/:cID", permission, GETid);
router.post("/:cID", permission, POSTid);
router.post("/:cID/item/", permission, finalised, POSTidItem);
router.get("/:cID/item/:iID", permission, finalised, itemExist, GETidItemId);
router.post("/:cID/item/:iID", permission, finalised, itemExist, POSTidItemId);
router.get("/:cID/item/:iID/meeting", permission, finalised, itemExist, meetingItem, GETitemIdMeeting);
router.post("/:cID/item/:iID/meeting", permission, finalised, itemExist, meetingItem, POSTitemIdMeeting);
router.post("/:cID/item/:iID/meeting/end", permission, finalised, itemExist, meetingItem, POSTitemIdMeetingEnd);

export default router;