import Arweave from "arweave";
import axios from "axios";

export async function createWallet(){
    const arweave = Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http'
    });

    // generate wallet
    const key = await arweave.wallets.generate();
    const address = await arweave.wallets.jwkToAddress(key);
    const amount = 999999;
    await axios.get(`http://localhost:1984/mint/${address}/${amount}`);
    return key;
};

export async function add(key) {
    const address = await arweave.wallets.jwkToAddress(key);
    const amount = 9999999;
    await axios.get(`http://localhost:1984/mint/${address}/${amount}`);
}