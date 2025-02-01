import { getLog } from "../modules/log.js";

export function GETRoot(req, res) {
    res.status(200).json("Ini root");
}

export function GETtest(req, res) {
    res.status(200).json("Running!");
}

export function GETlog(req, res) {
    res.status(200).send(`<pre>${getLog()}</pre>`);
}