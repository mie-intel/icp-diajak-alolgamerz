import { createHash } from "crypto";

export function hashFile(data, parties) {
    return createHash(process.env.HASH_ALGORITHM).update( 
        Buffer.concat([
            Buffer.from(parties.sort((a, b)=>{return a - b}).join("-")),
            Buffer.from(data, "base64")
        ])).digest().toString("base64");
}