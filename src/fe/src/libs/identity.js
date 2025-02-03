import { AuthClient } from "@dfinity/auth-client";
import { Actor, Identity } from "@dfinity/agent";
import { backend } from "@/src/declarations/backend/index.js";
import { system_api } from "@/src/declarations/system_api/index.js";
import * as vetkd from "ic-vetkd-utils";

/**
 * @type {AuthClient}
 */
let authClient;

/**
 * @type {Identity}
 */
let identity;

const keyId = {
    name: "test_key_1",
    curve: { "bls12_381": null }
}

async function initiateAC(){
    authClient = await AuthClient.create({
        keyType: "ECDSA"
    });
}

export async function login(callback) {
    if(!authClient) {await initiateAC();}
    if(!(await authClient.isAuthenticated())) {
        await authClient.login({
            identityProvider: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_ORIGIN
        }, {
            onSuccess: async () => {
                identity = await authClient.getIdentity();

                Actor.agentOf(backend).replaceIdentity(identity);
                Actor.agentOf(system_api).replaceIdentity(identity);

                if(callback) {callback();}
            }
        });
    } else {
        identity = await authClient.getIdentity();

        Actor.agentOf(backend).replaceIdentity(identity);
        Actor.agentOf(system_api).replaceIdentity(identity);

        if(callback) {callback();}   
    }
}

export async function logout() {
    if(!authClient) {await initiateAC();}
    await authClient.logout();
}

export async function getPrivateKey() {
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

    const privateKey = tsk.decrypt(
        res.encrypted_key,
        res2.public_key,
        identity.getPrincipal().toUint8Array()
    );
    return privateKey;
}

export async function getPrincipal() {
    if(!authClient) {await initiateAC();}
    if(!identity && authClient.isAuthenticated()) {
        identity = await authClient.getIdentity();

        Actor.agentOf(backend).replaceIdentity(identity);
        Actor.agentOf(system_api).replaceIdentity(identity);
    } else if (!identity) {throw "ER_NOT_LOGGED_IN";}
    return identity.getPrincipal();
}

async function getPublicKey() {
    const cID = await Actor.agentOf(system_api).getPrincipal();
    const res = await system_api.vetkd_public_key({
        "canister_id": [],
        "derivation_path": [cID.toUint8Array()],
        "key_id": keyId
    });

    return res.public_key;
}