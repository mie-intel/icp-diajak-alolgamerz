import { db } from "../modules/db.js";

export async function GETuser (req,res){
    res.status(200).json(db.exec(`select * from users;`));
}

export function POSTuser(req,res) {
    db.exec(`insert into users (uID) values (?uID);`, {
        "uID": cnt++
    });
    res.status(200).json("User registered");
}