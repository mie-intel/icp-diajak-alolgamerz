import express from "express";
import router from "./router/router.js";
import { initDB } from "./modules/db.js";

// DELETE WHEN WANT TO DEPLOY TO PRODUCTION
import dotenv from "dotenv";

if(!process.env.DFX_NETWORK) {
    dotenv.config({path: "./.env.local"});
    initDB().then(()=>{console.log("DB Initiated!");});
} else {
    console.log("This is ICP!");
}

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use("/", router);

export default app.listen(5000);