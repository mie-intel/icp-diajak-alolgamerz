"use client";

import { AuthClient, IdbStorage, KEY_STORAGE_KEY } from "@dfinity/auth-client";
import { Actor, Identity } from "@dfinity/agent";
import { backend } from "@/src/declarations/backend/index.js";
import { system_api } from "@/src/declarations/system_api/index.js";
import * as vetkd from "ic-vetkd-utils";
import { Nat, Opt, Principal, PrincipalClass, Variant } from "@dfinity/candid/lib/cjs/idl";

/**
 * @type {AuthClient}
 */
let authClient;

/**
 * @type {Identity}
 */
let identity;

async function initiateAC(){
    authClient = await AuthClient.create({
        keyType: "ECDSA"
    });
}

const keyId = {
    name: "test_key_1",
    curve: { "bls12_381": null }
}

// Eu+/ve+/vUUCIe+/vX0M77+977+977+9CO+/vdONJe+/vVXvv73UnBDvv717DNuaAg==

async function getIdentity() {
    if(!authClient) {await initiateAC();}
    if(!(await authClient.isAuthenticated())) {
        await authClient.login({
            identityProvider: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_ORIGIN
        });
    }

    identity = await authClient.getIdentity();
    const mydb = new IdbStorage({ dbName: "auth-client-db", storeName: "ic-keyval" });
    /**
     * @type {CryptoKeyPair} 
     */
    const keyval = await mydb.get(KEY_STORAGE_KEY);
    console.log("PUBLIC:", keyval.publicKey);
    console.log("PRIVATE:", keyval.privateKey);
    console.log("MY PUBLIC:", await crypto.subtle.exportKey("jwk", keyval.publicKey));
    // console.log(btoa(unescape(encodeURIComponent((new TextDecoder("utf8")).decode(identity.getPrincipal()._arr)))));

    // Send to server
    if(!backend) {
        alert("Backend is not connected!");
        return ;
    }

    Actor.agentOf(backend).replaceIdentity(identity);
    Actor.agentOf(system_api).replaceIdentity(identity);
    console.log(identity.getPrincipal().toString());
    console.log(await backend.identity());
}

async function getPublicKey() {
    const cID = await Actor.agentOf(system_api).getPrincipal();
    const res = await system_api.vetkd_public_key({
        "canister_id": [],
        "derivation_path": [cID.toUint8Array()],
        "key_id": keyId
    });

    console.log(res.public_key);
}

async function getPrivateKey() {
    const tsk_seed = window.crypto.getRandomValues(new Uint8Array(32));
    const tsk = new vetkd.TransportSecretKey(tsk_seed);

    const res = await system_api.vetkd_encrypted_key({
        "derivation_id": identity.getPrincipal().toUint8Array(),
        "encryption_public_key": tsk.public_key(),
        "public_key_derivation_path": [(new TextEncoder()).encode("ibe_encryption")],
        "key_id": keyId
    });

    const res2 = await system_api.vetkd_public_key({
        "canister_id": [],
        "derivation_path": [(new TextEncoder()).encode("ibe_encryption")],
        "key_id": keyId
    });

    console.log(res.encrypted_key);
    console.log(res2.public_key);

    const privateKey = tsk.decrypt(
        res.encrypted_key,
        res2.public_key,
        identity.getPrincipal().toUint8Array()
    );
    console.log(privateKey);
}

/**
 * 
 * @param {String} hexString 
 * @returns {Uint8Array}
 */
function hex_decode(hexString) {
    return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}

/**
 * 
 * @param {Uint8Array} bytes 
 * @returns {String}
 */
function hex_encode(bytes) {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

async function logout() {
    if(!authClient) {await initiateAC();}
    await authClient.logout();
}

async function logActor() {
    console.log(backend);
    console.log(system_api);
}

export default function identityElem() {
    return <>
        <h1>Halo</h1>
        <button onClick={async ()=>{await getIdentity()}}>Run</button>
        <br></br>
        <button onClick={async ()=>{await logout();}}>LogOut</button>
        <br></br>
        <br></br>
        <button onClick={async ()=>{await logActor()}}>Log Actor</button>
        <br></br>
        <button onClick={async ()=>{await getPublicKey()}}>Get Public Key</button>
        <br></br>
        <button onClick={async ()=>{await getPrivateKey()}}>Get Private Key</button>
    </>
}