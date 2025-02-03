import { createDiffieHellman } from "crypto";
import { encrypt, decrypt } from "./keyExchange.js";

const arr = [];
const userKeys = [];
const n = 10;

function sm(a,b){console.log(a.toString("hex") == b.toString("hex"));}

let tmpsec;

for (let i = 0; i < n; i++) {
    if(i === 0) {
        const dh = createDiffieHellman(512);
        arr.push([0, dh.getPrime(), dh.getGenerator()]); 
    }

    // Generate user keys
    if(true) {
        const dh = createDiffieHellman(arr[0][1], arr[0][2]);
        dh.generateKeys();
        userKeys.push(dh.getPrivateKey());
    }

    const priv = userKeys[i];

    const dh = createDiffieHellman(arr[0][1], arr[0][2]);
    dh.setPrivateKey(priv);
    dh.generateKeys();

    const pub = dh.getPublicKey();
    if(i === 0) {
        arr.push([i+1, pub, pub]);
        continue ;
    }

    const ndh = createDiffieHellman(arr[0][1], arr[0][2]);
    ndh.setPrivateKey(dh.computeSecret(arr[i][2])); // <--
    ndh.generateKeys();

    const nowPub = ndh.getPublicKey();
    arr.push([i+1, pub, nowPub]);

    tmpsec = ndh.getPrivateKey();
}

const hasil = [];

for (let i = 0; i < n; i++) {
    // Get key for current user
    const priv = userKeys[i];
    let nowsec = priv;

    // Ke belakang
    if(i !== 0) {
        const dh = createDiffieHellman(arr[0][1], arr[0][2]);
        dh.setPrivateKey(priv);
        nowsec = dh.computeSecret(arr[i][2]);
    }

    // Ke depan
    for (let j = i+1; j < n; j++) {
        const dh = createDiffieHellman(arr[0][1], arr[0][2]);
        dh.setPrivateKey(nowsec);
        nowsec = dh.computeSecret(arr[j+1][1]);
    }

    hasil.push(nowsec);
}

let flag = true;
for (let i = 1; i < hasil.length; i++) {
    if(hasil[i].toString("hex") != hasil[i-1].toString("hex")) {
        flag = false;
    }
}

sm(tmpsec, hasil[hasil.length-1])

let flag2 = false;

const data = "aku mau bebek";
flag2 = Buffer.from(decrypt(encrypt(Buffer.from(data, "utf-8").toString("base64"), tmpsec.toString("base64")), tmpsec.toString("base64")), "base64").toString("utf-8") === data;

console.log(((flag && flag2) ? "\x1b[42;1mBERHASIL" : "\x1b[41;1mGAGAL") + "\x1b[0m");

// const alice = createDiffieHellman(2048);
// const aliceKey = alice.generateKeys();

// const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
// const bobKey = bob.generateKeys();

// const aliceSecret = alice.computeSecret(bobKey);
// const bobSecret = bob.computeSecret(aliceKey);

// // OK
// assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
