import { caller } from "azle";

export function GETroot(req,res) {
    res.status(200).json(caller().toString());
}