import { contractsModel, itemsModel, userModel } from "../modules/models";
import { contractsBodySchema, contractsIDBodySchema, itemBodySchema, itemIDBodySchema } from "../modules/schema";
import { createDiffieHellman, createHash } from "crypto";

export function GETroot(req, res) {
    const cIDs = JSON.parse(userModel.get({ uID: req.session.uID })[0].contracts);
    res.status(200).json(cIDs.map(cID => {
        return contractsModel.get({ cID: cID })[0];
    }));
}

export function POSTroot(req, res) {
    try {
        contractsBodySchema.parse(req.body);
    } catch (err) {
        res.status(400).json("Invalid request body");
        return ;
    }

    // Validate parties
    const arr = req.body.contractParties;
    const nowContracts = [];

    try {
        let includeSelf = false;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] === req.session.uID) {
                includeSelf = true;
            }

            const user = userModel.get({uID: arr[i]});
            if(user.length === 0) {
                throw "ER_NO_PARTIES";
            }
            nowContracts.push(JSON.parse(user[0].contracts));
        }
        
        if(!includeSelf) {throw "ER_NO_SELF";}
    } catch (err) {
        if(err === "ER_NO_PARTIES") {
            res.status(404).json("Parties not found");
        } else if (err === "ER_NO_SELF") {
            res.status(409).json("Parties must include self");
        }
        return ;
    }

    req.body.contractParties = JSON.stringify(req.body.contractParties.map(uID=>{return {uID: uID, state: "pending"}}));
    const dh = createDiffieHellman(parseInt(process.env.DIFFIE_HELLMAN_BYTES));
    req.body.keyExchange = JSON.stringify([[0, dh.getPrime().toString("base64"), dh.getGenerator().toString("base64")]]);
    contractsModel.create(req.body);

    const contract = contractsModel.get(req.body)[0];

    // Add to each user contracts
    for (let i = 0; i < arr.length; i++) {
        nowContracts[i].push(contract.cID);
        userModel.update({
            contracts: JSON.stringify(nowContracts[i])
        }, { uID: arr[i] });
    }

    res.status(200).json(contract);
}

export function GETid(req, res) {
    res.status(200).json(contractsModel.get({ cID: req.params.cID })[0]);
}

export function POSTid(req, res) {
    try {
        contractsIDBodySchema.parse(req.body);
    } catch (err) {
        res.status(400).json("Invalid request body");
        return ;
    }

    // Check if finalised
    const oldContract = contractsModel.get({ cID: req.params.cID })[0];
    if(oldContract.isFinalised) {
        res.status(403).json("Contract has already been finalised");
        return ;
    }

    const oldCP = JSON.parse(oldContract.contractParties);
    let alreadyResponded = false;
    for (let i = 0; i < oldCP.length; i++) {
        if(oldCP[i].uID === req.session.uID && oldCP[i].state !== "pending") {
            alreadyResponded = true;
            break ;
        }
    }
    if(alreadyResponded) {
        res.status(409).json("You already responded");
        return ;
    }

    req.body.keyExchange = [req.session.uID, ...req.body.keyExchange];
    // Update keyExchange
    const oldKE = JSON.parse(oldContract.keyExchange);
    oldKE.push(req.body.keyExchange);

    // If all has done finalise
    let isFinalised = 0;
    if(req.body.state === "disagree") {
        isFinalised = -1;
    } else if (oldKE.length-1 === oldCP.length) {
        isFinalised = 1;
    }

    // Update CP
    const newCP = oldCP.map(obj => {
        if(obj.uID === req.session.uID) {
            obj.state = req.body.state;
        }
        return obj;
    });

    contractsModel.update({ keyExchange: JSON.stringify(oldKE), isFinalised: isFinalised, contractParties: JSON.stringify(newCP) }, { cID: req.params.cID });
    res.status(200).json("Response received");
}

export function POSTidItem(req, res) {
    try {
        itemBodySchema.parse(req.body);
    } catch (err) {
        res.status(400).json("Invalid request body");
        return ;
    }

    if(req.body.type === "document") {
        // Check file size
        if(Buffer.from(req.body.fileBlob, "base64").length > parseInt(process.env.MAX_FILE_SIZE)) {
            res.status(400).json("File size too big");
            return ;
        }
    } else {
        // Validate date
        if(new Date(req.body.meetingDate) < Date.now()) {
            res.status(400).json("Date should not be in past");
            return ;
        }
    }

    // Validate party
    try {
        const arr = req.body.parties;
        const cArr = JSON.parse(contractsModel.get({ cID: req.params.cID })[0].contractParties);
        let includeSelf = false;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] === req.session.uID) {
                includeSelf = true;
            }

            const user = userModel.get({uID: arr[i]});
            if(user.length === 0) {
                throw "ER_NO_PARTIES";
            } else if (cArr.filter(obj => {
                return obj.uID === arr[i];
            }).length === 0) {
                throw "ER_NOT_IN_CONTRACT";
            }
        }
        if(!includeSelf) {throw "ER_NO_SELF";}
    } catch (err) {
        if(err === "ER_NO_PARTIES") {
            res.status(404).json("Parties not found");
        } else if (err === "ER_NO_SELF") {
            res.status(409).json("Parties must include self");
        } else if (err === "ER_NOT_IN_CONTRACT") {
            res.status(403).json("Parties not in contract");
        }
        return ;
    }

    req.body.parties = JSON.stringify(req.body.parties.map(uID => {
        return {uID: uID, state: "pending"};
    }));
    req.body.cID = req.params.cID;

    if(req.body.type === "document") {
        // Create hash
        req.body.hash = createHash(process.env.HASH_ALGORITHM).update(Buffer.from(req.body.fileBlob, "base64")).digest().toString("base64");

        // TODO: Upload data to IPFS
    }

    itemsModel.create(req.body);

    // Update contracts itemID
    const nowContracts = contractsModel.get({ cID: req.params.cID })[0];
    const nowItem = itemsModel.get(req.body)[0];
    const newItemArray = [...JSON.parse(nowContracts.itemIDs), nowItem.iID];
    contractsModel.update({ itemIDs: JSON.stringify(newItemArray) }, { cID: req.params.cID });

    res.status(200).json(nowItem);
}

export function GETidItemId(req, res) {
    res.status(200).json(itemsModel.get({ iID: req.params.iID })[0]);
}

export function POSTidItemId(req, res) {
    try {
        itemIDBodySchema.parse(req.body);
    } catch (err) {
        res.status(400).json("Invalid request body");
        return ;
    }

    // Check if finalised
    const oldItem = itemsModel.get({ iID: req.params.iID })[0];

    if(oldItem.isFinalised) {
        res.status(403).json("Item has already been finalised");
        return ;
    }

    const oldP = JSON.parse(oldItem.parties);

    let alreadyResponded = false;
    for (let i = 0; i < oldP.length; i++) {
        if(oldP[i].uID === req.session.uID && oldP[i].state !== "pending") {
            alreadyResponded = true;
            break ;
        }
    }
    if(alreadyResponded) {
        res.status(409).json("You already responded");
        return ;
    }


    // Update CP
    const newP = oldP.map(obj => {
        if(obj.uID === req.session.uID) {
            obj.state = req.body.state;
        }
        return obj;
    });

    // If all has done finalise
    let isFinalised = 0;
    if(req.body.state === "disagree") {
        isFinalised = -1;
    } else if (newP.filter(obj => {return obj.state === "pending";}).length === 0) {
        isFinalised = 1;
    }

    itemsModel.update({ isFinalised: isFinalised, parties: JSON.stringify(newP) }, { iID: req.params.iID });
    res.status(200).json("Response received");
}