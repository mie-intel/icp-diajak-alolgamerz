import express from "express";
import { db } from "./modules/db.js";
import { getLog } from "./modules/log.js";

let cnt = 1;

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.get("/db/user", async (req,res)=>{
    res.status(200).json(db.exec(`select * from users;`));
});
app.post("/db/user", (req,res)=>{
    db.exec(`insert into users (uID) values (?uID);`, {
        "uID": cnt++
    });
    res.status(200).json("User registered");
});
app.get("/test", (req,res)=>{
    res.status(200).json("Running!");
});
app.get("/log", (req,res)=>{
    res.status(200).send(`<pre>${getLog()}</pre>`);
});

export default app.listen(3000);