import crypto, { createHash } from "crypto";

export function hashFile(data, parties) {
    return createHash(process.env.HASH_ALGORITHM).update( 
        Buffer.concat([
            Buffer.from(parties.sort((a, b)=>{return a - b}).join("-")),
            Buffer.from(data, "base64")
        ])).digest().toString("base64");
}

const algo = "aes-256-gcm";
const hashKey = Buffer.from("rlRraeiR0L/NhqAspobKNx+IS6Q27Pm9e+ZcCc/ndes=", "base64");
const key = Buffer.from("oveFA9HNOxNH0H3EfEfgdM4xOSn+5JhMAuKatWek6q4=", "base64");

export function encrypt(obj) {
    let text = JSON.stringify(obj);
    text += "----" + crypto.createHash("sha256", hashKey).update(text).digest("base64");

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algo,key,iv);
    const msg = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    const encrypted = Buffer.concat([iv, cipher.getAuthTag(), msg]);
    return encrypted.toString("base64");
}

export function decrypt(cipherText) {
    const buffer = Buffer.from(cipherText, "base64");
    const iv = buffer.subarray(0, 16);
    const authTag = buffer.subarray(16, 32);
    const encmsg = buffer.subarray(32);
    const decipher = crypto.createDecipheriv(algo, key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encmsg, "base64"), decipher.final()]);
    const text = decrypted.toString("utf-8");

    const [obj, hash] = text.split("----");
    if(crypto.createHash("sha256", hashKey).update(obj).digest("base64") === hash) {
        return JSON.parse(obj);
    }
    return null;
}