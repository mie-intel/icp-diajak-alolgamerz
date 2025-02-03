import { encrypt } from "../modules/crypto.js";
import { userModel } from "../modules/models.js";
import { loginBodySchema, registerBodySchema } from "../modules/schema.js";
// import jwt from "jsonwebtoken";
// import * as jose from "jose";

export function POSTregister(req, res) {
    try {
        registerBodySchema.parse(req.body);
    } catch (err) { 
        res.status(400).json("Invalid request body");
        return ;
    }
    
    try {
        userModel.create(req.body);
    } catch (err) {
        res.status(409).json("User already exist");
        return ;
    }
    res.status(200).json( userModel.get({ businessName: req.body.businessName})[0] );
}

export function POSTlogin(req, res) {
    try {
        loginBodySchema.parse(req.body);
    } catch (err) { 
        res.status(400).json("Invalid request body");
        return ;
    }

    // Find corresponding user
    let user;
    try {
        [user] = userModel.get(req.body);
        if(!user) {throw "ER_NO_USER";}        
    } catch (err) {
        res.status(404).json("User not found");
        return ;
    }

    const data = {
        uID: user.uID,
        businessName: user.businessName,
        principal: user.principal
    };

    res.status(200).json({ session: encrypt(data) });
    // const session = jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
    //     expiresIn: `${process.env.SESSION_SECONDS_EXPIRE}s`
    // });
    // new jose.SignJWT(data)
    // .setProtectedHeader({ alg: "HS256" })
    // .setExpirationTime(`${process.env.SESSION_SECONDS_EXPIRE}s`)
    // .sign(Buffer.from(process.env.JWT_PRIVATE_KEY, "base64")).then((session) => {
    //     res.status(200).json({ session: session });
    // });

}

export function GETid(req, res) {
    let results;

    [results] = userModel.get({ uID: req.params.id });

    if(!results) {
        res.status(404).json("User not found");
        return ;
    }

    results.contracts = undefined;
    delete results.contracts;
    results.principal = undefined;
    delete results.principal;
    res.status(200).json(results);
}