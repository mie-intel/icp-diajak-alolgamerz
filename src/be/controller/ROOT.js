import { hashFile } from "../modules/crypto.js";
import { getLog } from "../modules/log.js";
import { proofBodySchema } from "../modules/schema.js";

export function GETRoot(req, res) {
    res.status(200).json("Ini root");
}

export function GETtest(req, res) {
    res.status(200).json("Running!");
}

export function GETlog(req, res) {
    res.status(200).send(`<pre>${getLog()}</pre>`);
}

export function POSTproof(req, res) {
    try {
        proofBodySchema.parse(req.body);
    } catch (err) {
        res.status(400).json("Invalid request body");
        return ;
    }

    res.status(200).json(hashFile(req.body.fileBlob, req.body.parties) === req.body.hash);
}