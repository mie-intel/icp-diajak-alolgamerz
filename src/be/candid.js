import {
    init,
    postUpgrade,
    preUpgrade,
    StableBTreeMap
} from "azle/experimental";
import { db, initDB } from "./modules/db";

export default {
    init: init([], async ()=>{
        await initDB();
    }),
    preUpgrade: preUpgrade([], ()=>{
        StableBTreeMap(0).insert("DATABASE", db.export());
    }),
    postUpgrade: postUpgrade([], async ()=>{
        await initDB(StableBTreeMap(0).get("DATABASE"));
    })
};