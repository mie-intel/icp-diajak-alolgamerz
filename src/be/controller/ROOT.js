import { getLog } from "../modules/log.js";

export function GETtest(req, res) {
    res.status(200).json("Running!");
}

export function GETlog(req, res) {
    res.status(200).send(`<pre>${getLog()}</pre>`);
}