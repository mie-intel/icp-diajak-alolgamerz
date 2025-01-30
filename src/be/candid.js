import {
    init,
    postUpgrade,
    preUpgrade,
    query,
    StableBTreeMap,
    text
} from "azle/experimental";
import { db, initDB } from "./modules/db.js";
import { caller } from "azle";

export default {
    init: init([], async ()=>{
        await initDB();
    }),
    preUpgrade: preUpgrade([], ()=>{
        StableBTreeMap(0).insert("DATABASE", db.export());
    }),
    postUpgrade: postUpgrade([], async ()=>{
        await initDB(StableBTreeMap(0).get("DATABASE"));
    }),
    identity: query([], text, ()=>{
        return caller().toString();
    }),
    candidQuery: query([], text, ()=>{
        return "Hello";
    })
};