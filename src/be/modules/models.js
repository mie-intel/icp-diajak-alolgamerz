import { Model } from "../modules/db";

export const userModel = new Model("users", ["uID", "businessName", "email", "principal", "isVerified", "contracts"]);
export const contractsModel = new Model("contracts", ["cID", "contractName", "contractDescription", "contractParties", "isFinalised", "lastModified", "itemIDs", "keyExchange"]);
export const itemsModel = new Model("items", ["iID", "cID", "title", "description", "parties", "type", "isFinalised", "dateCreated", "fileURL", "meetingDate", "meetingURL", "meetingFileURL"]);

