// import jwt from "jsonwebtoken";
// import * as jose from "jose";
import { decrypt } from "../modules/crypto.js";

export default async function auth(req, res, next) {
    if(!req.headers.authorization) {
        res.status(403).json("No session");
        return ;
    }

    let results;
    try {
        // results = jwt.verify(req.headers.authorization.split("Bearer ")[1], process.env.JWT_PRIVATE_KEY);
        // results = (await jose.jwtVerify(req.headers.authorization.split("Bearer ")[1], Buffer.from(process.env.JWT_PRIVATE_KEY, "base64") )).payload;
        results = decrypt(req.headers.authorization.split("Bearer ")[1]);
        if(!results) {throw "ER_INVALID_SESSION";}
    } catch (err) {
        if(err.message === "jwt expired") {
            res.status(403).json("Session expired");
        } else {
            res.status(403).json("Invalid session");
        }
        return ;
    }

    req.session = results;
    next();
}