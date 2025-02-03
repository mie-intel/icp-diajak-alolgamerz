import Arweave from "arweave";
// DELETE ON PRODUCTION
// import { createWallet } from "../dev/initArweave";

let key, arweave;

async function init() {
    // DELETE ON PRODUCTION
    // key = await createWallet();
    key = JSON.parse(process.env.ARWEAVE_KEY);
    arweave = Arweave.init({
        host: process.env.ARWEAVE_HOST,
        port: parseInt(process.env.ARWEAVE_HOST),
        protocol: process.env.ARWEAVE_PROTOCOL,
        logging: false
    });
}

/**
 * @param {String} data -- base64 encoded data
 * @returns {String} -- fileURL
 */
export async function upload(data) {
    if(!arweave) {await init();}
    const transaction = await arweave.createTransaction({
        data: Buffer.from(data, "base64")
    }, key);
    transaction.addTag("Content-Type", "application/octet-stream");
    await arweave.transactions.sign(transaction, key);
    
    const uploader = await arweave.transactions.getUploader(transaction);    
    while (!uploader.isComplete) {
        await uploader.uploadChunk();
    }
    return transaction.id;
}