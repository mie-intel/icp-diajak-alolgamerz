import { userModel } from "../modules/models.js";
import { loginBodySchema, registerBodySchema } from "../modules/schema.js";
import jwt from "jsonwebtoken";

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

    res.status(200).json({ session: jwt.sign({
        uID: user.uID,
        businessName: user.businessName,
        principal: user.principal
    }, process.env.JWT_PRIVATE_KEY) });
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
    res.status(200).json(results);
}