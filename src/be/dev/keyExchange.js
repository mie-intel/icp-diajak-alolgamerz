import { randomBytes, createCipheriv, createDecipheriv, createDiffieHellman, createHash } from "crypto";

export function updateKE(arr, secret, uID) {
    const dh = createDiffieHellman(Buffer.from(arr[0][1], "base64"), Buffer.from(arr[0][2], "base64"));
    dh.setPrivateKey(Buffer.from(secret, "base64"));
    dh.generateKeys();

    const pub = dh.getPublicKey();

    if(arr.length === 1) {
        return ([pub.toString("base64"), pub.toString("base64")]);
    }

    const ndh = createDiffieHellman(Buffer.from(arr[0][1], "base64"), Buffer.from(arr[0][2], "base64"));
    ndh.setPrivateKey(dh.computeSecret(Buffer.from(arr[arr.length-1][2], "base64")));
    ndh.generateKeys();

    const nowPub = ndh.getPublicKey();
    return [pub.toString("base64"), nowPub.toString("base64")];
}

export function getKE(arr, secret, uID) {
    const n = arr.length-1;
    let nowsec = Buffer.from(secret, "base64");
    for (let i = 0; i < n; i++) {
        if(arr[i+1][0] === uID) {
            // Ke belakang
            if(i > 0) {
                const dh = createDiffieHellman(Buffer.from(arr[0][1], "base64"), Buffer.from(arr[0][2], "base64"));
                dh.setPrivateKey(nowsec);
                nowsec = dh.computeSecret(Buffer.from(arr[i][2], "base64"));
            }

            // Ke depan
            for (let j = i+1; j < n; j++) {
                const dh = createDiffieHellman(Buffer.from(arr[0][1], "base64"), Buffer.from(arr[0][2], "base64"));
                dh.setPrivateKey(nowsec);
                nowsec = dh.computeSecret(Buffer.from(arr[j+1][1], "base64"));
            }
            return nowsec.toString("base64");
        }
    }
}

const cipherAlgo = "aes-256-gcm";
const hashAlgo = "sha256"
export function encrypt(data, sharedSecret) {
    const key = createHash(hashAlgo).update(Buffer.from(sharedSecret, "base64")).digest();
    const iv = randomBytes(16);
    const cipher = createCipheriv(cipherAlgo,key,iv);
    const msg = Buffer.concat([cipher.update(data, "base64"), cipher.final()]);
    const encrypted = Buffer.concat([iv, cipher.getAuthTag(), msg]);
    return encrypted.toString("base64");
}

export function decrypt(cipherText, sharedSecret) {
    const key = createHash(hashAlgo).update(Buffer.from(sharedSecret, "base64")).digest();
    const buffer = Buffer.from(cipherText, "base64");
    const iv = buffer.subarray(0, 16);
    const authTag = buffer.subarray(16, 32);
    const encmsg = buffer.subarray(32);
    const decipher = createDecipheriv(cipherAlgo, key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encmsg), decipher.final()]);
    const text = decrypted.toString("base64");
    return text;
}