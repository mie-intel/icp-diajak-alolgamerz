import axios from "axios";
import { contractsModel, itemsModel, userModel } from "../modules/models";
import { createDiffieHellman } from "crypto";
import dotenv from "dotenv";
import { getKE, updateKE } from "../dev/keyExchange";

dotenv.config({ path: ".env.local" });

const BASE_URL = "http://localhost:5000";

const publicAxios = axios.create({baseURL: BASE_URL});
const userCredentials = [
    {
        businessName: "Bisnis A",
        email: "user.a@mail.com",
        principal: "principal.a",
        uID: 0
    },
    {
        businessName: "Bisnis B",
        email: "user.b@mail.com",
        principal: "principal.b",
        uID: 0
    },
    {
        businessName: "Bisnis C",
        email: "user.c@mail.com",
        principal: "principal.c",
        uID: 0
    },
    {
        businessName: "Bisnis D",
        email: "user.d@mail.com",
        principal: "principal.d",
        uID: 0
    }
];

let myhash;
const userKeys = [genKeys(), genKeys(), genKeys()];
const b64 = Buffer.from("sigma").toString("base64");
let sharedSecret;

function genKeys() {
    const dh = createDiffieHellman(parseInt(process.env.DIFFIE_HELLMAN_BYTES));
    dh.generateKeys();
    return dh.getPrivateKey();
}

/**
 * @type {Array<import("axios").AxiosInstance>}
 */
const userAxios = [];

/**
 * 
 * @param {import("axios").AxiosInstance} axiosInstance 
 * @param {import("axios").Method} method 
 * @param {String} path 
 * @param {Object} data 
 * @param {import("axios").AxiosRequestConfig} config 
 * @param {String} message 
 * @param {Number} statusCode 
 */
async function expectsError(axiosInstance, method, path, data, config, message, statusCode) {
    try {
        if(method === "put" || method === "PUT" || method === "post" || method === "POST" || data) {
            await axiosInstance[method](path, data, config);
        } else {
            await axiosInstance[method](path, config);
        }
    } catch (err) {
        expect(err.response.data).toBe(message);
        expect(err.response.status).toBe(statusCode);
        return err;
    }

    expect(false).toBe(true);
}

describe("API Testing", ()=>{
    describe("/account", ()=>{
        describe("POST /account/register", ()=>{
            it("Reject invalid body", async ()=>{
                await expectsError(publicAxios, "post", "/account/register", {}, {}, "Invalid request body", 400);

                await expectsError(publicAxios, "post", "/account/register", {
                    businessName: "Bisnis A",
                    email: "abcdef",
                    principal: "bebek"
                }, {}, "Invalid request body", 400);

                await expectsError(publicAxios, "post", "/account/register", {
                    businessName: "Bisnis A",
                    email: "user@mail.com",
                    principal: 123
                }, {}, "Invalid request body", 400);

                await expectsError(publicAxios, "post", "/account/register", {
                    businessName: "Bisnis A",
                    email: "user@mail.com",
                    principal: "principal",
                    additional: "additional"
                }, {}, "Invalid request body", 400);

                await expectsError(publicAxios, "post", "/account/register", {
                    businessName: "Bisnis A",
                    email: "user@mail.com",
                    principal: "principal"
                }, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}, "Invalid request body", 400);
            });

            it("Creates user", async()=>{
                for (let i = 0; i < userCredentials.length; i++) {
                    const {data} = (await publicAxios.post("/account/register", {
                        businessName: userCredentials[i].businessName,
                        email: userCredentials[i].email,
                        principal: userCredentials[i].principal
                    }));
                    expect(Object.keys(data)).toEqual(userModel.keys);
                    userCredentials[i].uID = data.uID;
                }
            });

            it("Rejects duplicate user", async()=>{
                await expectsError(publicAxios, "post", "/account/register", {
                    businessName: userCredentials[0].businessName,
                    email: userCredentials[0].email,
                    principal: userCredentials[0].principal
                }, {}, "User already exist", 409);
            });
        });

        describe("POST /account/login", ()=>{
            it("Reject invalid body", async ()=>{
                await expectsError(publicAxios, "post", "/account/login", {}, {}, "Invalid request body", 400);

                await expectsError(publicAxios, "post", "/account/login", {
                    principal: 123
                }, {}, "Invalid request body", 400);

                await expectsError(publicAxios, "post", "/account/login", {
                    principal: "principal",
                    additional: "additional"
                }, {}, "Invalid request body", 400);

                await expectsError(publicAxios, "post", "/account/login", {
                    principal: "principal"
                }, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}, "Invalid request body", 400);
            });

            it("Rejects invalid user", async ()=>{
                await expectsError(publicAxios, "post", "/account/login", {
                    principal: "invalid principal"
                }, {}, "User not found", 404);
            });

            it("Retrieve session jwt", async()=>{
                for (let i = 0; i < userCredentials.length; i++) {
                    const {data} = (await publicAxios.post("/account/login", {
                        principal: userCredentials[i].principal
                    }));
                    expect(Object.keys(data)).toEqual(["session"]);
                    expect(data.session).toBeTruthy();

                    userAxios.push(axios.create({
                        baseURL: BASE_URL,
                        headers: {
                            Authorization: "Bearer "+data.session
                        }
                    }));
                }
            });
        });

        describe("GET /account/:id", ()=>{
            it("Retrieve account detail", async ()=>{
                const {data} = (await publicAxios.get("/account/1"));
                expect(Object.keys(data)).toEqual(userModel.keys.filter(val=>{return (val!=="contracts" && val!=="principal")}));
            });

            it("Rejects not found user", async ()=>{
                await expectsError(publicAxios, "get", "/account/999", null, {}, "User not found", 404);
                await expectsError(publicAxios, "get", "/account/iamsimgaa", null, {}, "User not found", 404);
            });
        });
    });

    describe("/contracts", ()=>{
        it("Check auth middleware", async ()=>{
            await expectsError(publicAxios, "get", "/contracts", null, {}, "No session", 403);
            await expectsError(publicAxios, "get", "/contracts", null, {
                headers: {Authorization: "Basic sisi"}
            }, "Invalid session", 403);
            await expectsError(publicAxios, "get", "/contracts", null, {
                headers: {Authorization: "Bearer sigmaboiiisimagboi"}
            }, "Invalid session", 403);

            await userAxios[0].get("/contracts");
        });

        describe("POST /contracts", ()=>{
            it("Rejects invalid body", async ()=>{
                await expectsError(userAxios[0], "post", "/contracts", {}, {}, "Invalid request body", 400);

                await expectsError(userAxios[0], "post", "/contracts", {
                    contractName: "contract #1",
                    contractDescription: "contracts description",
                    contractParties: []
                }, {}, "Invalid request body", 400);

                await expectsError(userAxios[0], "post", "/contracts", {
                    contractName: "contract #1",
                    contractDescription: "contracts description",
                    contractParties: [1,2,3],
                    additional: "additional"
                }, {}, "Invalid request body", 400);

                await expectsError(userAxios[0], "post", "/contracts", {
                    contractName: "contract #1",
                    contractDescription: "contracts description",
                    contractParties: [1,2,3]
                }, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}, "Invalid request body", 400);
            }); 

            it("Rejects parties not found", async ()=>{
                await expectsError(userAxios[0], "post", "/contracts", {
                    contractName: "contract #1",
                    contractDescription: "contracts description",
                    contractParties: [1,2,999]
                }, {}, "Parties not found", 404);
            });

            it("Rejects no self in parties", async ()=>{
                await expectsError(userAxios[0], "post", "/contracts", {
                    contractName: "contract #1",
                    contractDescription: "contracts description",
                    contractParties: [2,3]
                }, {}, "Parties must include self", 409);
            });

            it("Create contracts", async()=>{
                const {data} = (await userAxios[0].post("/contracts", {
                    contractName: "contract #1",
                    contractDescription: "contracts description",
                    contractParties: [1,2]
                }));
                expect(Object.keys(data)).toEqual(contractsModel.keys);

                const data2 = (await userAxios[0].post("/contracts", {
                    contractName: "contract #2",
                    contractDescription: "contracts description",
                    contractParties: [1,2,3]
                })).data;
                expect(Object.keys(data2)).toEqual(contractsModel.keys);

                const data3 = (await userAxios[0].post("/contracts", {
                    contractName: "contract #3",
                    contractDescription: "contracts description",
                    contractParties: [1,2,3]
                })).data;
                expect(Object.keys(data3)).toEqual(contractsModel.keys);
            });
        });

        describe("GET /contracts", ()=>{
            it("Get contracts", async ()=>{
                const {data} = (await userAxios[0].get("/contracts"));
                expect(Array.isArray(data)).toBe(true);
                expect(data.length).toBe(3);
                for (let i = 0; i < data.length; i++) {
                    expect(Object.keys(data[i])).toEqual(contractsModel.keys);                    
                }
            });
        });

        describe("/contracts/:cID", ()=>{
            describe("GET /contracts/:cID", ()=>{
                it("Rejects contract not found", async ()=>{
                    await expectsError(userAxios[0], "get", "/contracts/999", {}, {}, "Contract not found", 404);
                });

                it("Rejects no permission", async ()=>{
                    await expectsError(userAxios[2], "get", "/contracts/1", {}, {}, "You have no permission to view this contract", 403);
                });

                it("Get contract details", async()=>{
                    const {data} = (await userAxios[1].get("/contracts/1"));
                    expect(Object.keys(data)).toEqual(contractsModel.keys);
                });
            });

            describe("POST /contracts/:cID", ()=>{
                it("Rejects invalid body", async ()=>{
                    await expectsError(userAxios[0], "post", "/contracts/1", {}, {}, "Invalid request body", 400);

                    await expectsError(userAxios[0], "post", "/contracts/1", {
                        state: "sigma",
                        keyExchange: [b64,b64]
                    }, {}, "Invalid request body", 400);

                    await expectsError(userAxios[0], "post", "/contracts/1", {
                        state: "agree",
                        keyExchange: [0,b64,b64]
                    }, {}, "Invalid request body", 400);

                    await expectsError(userAxios[0], "post", "/contracts/1", {
                        state: "agree",
                        keyExchange: ["String",b64]
                    }, {}, "Invalid request body", 400);
    
                    await expectsError(userAxios[0], "post", "/contracts/1", {
                        state: "agree",
                        keyExchange: [0,b64,b64],
                        additional: "additional"
                    }, {}, "Invalid request body", 400);
    
                    await expectsError(userAxios[0], "post", "/contracts/1", {
                        state: "agree",
                        keyExchange: [b64,b64]
                    }, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}, "Invalid request body", 400);  
                });

                it("Can post agreement or disagreement", async ()=>{
                    const data = (await userAxios[0].post("/contracts/1", {
                        state: "agree",
                        keyExchange: [b64,b64]
                    })).data;
                    expect(data).toBe("Response received");
                    const data2 = (await userAxios[1].post("/contracts/1", {
                        state: "agree",
                        keyExchange: [b64,b64]
                    })).data;
                    expect(data2).toBe("Response received");
                    const data3 = (await userAxios[0].post("/contracts/2", {
                        state: "disagree",
                        keyExchange: [b64,b64]
                    })).data;
                    expect(data3).toBe("Response received");
                });

                it("Prohibits finalised contracts", async () =>{
                    await expectsError(userAxios[0], "post", "/contracts/1", {
                        state: "agree",
                        keyExchange: [b64,b64]
                    }, {}, "Contract has already been finalised", 403);
                    
                    await expectsError(userAxios[1], "post", "/contracts/2", {
                        state: "agree",
                        keyExchange: [b64,b64]
                    }, {}, "Contract has already been finalised", 403);
                });

                it("Can do keyExchange", async ()=>{
                    for (let i = 0; i < 3; i++) {
                        const data = JSON.parse((await userAxios[i].get("/contracts/3")).data.keyExchange);
                        await userAxios[i].post("/contracts/3", {
                            state: "agree",
                            keyExchange: updateKE(data, userKeys[i].toString("base64"), i+1)
                        });
                    }

                    const data = JSON.parse((await userAxios[0].get("/contracts/3")).data.keyExchange);
                    const hasil = [];
                    for (let i = 0; i < 3; i++) {                        
                        hasil.push(getKE(data, userKeys[i].toString("base64"), i+1).toString("base64"));
                    }
                    for (let i = 1; i < 3; i++) {
                        expect(hasil[i-1]).toEqual(hasil[i]);
                    }
                    sharedSecret = hasil[0];
                });
            });

            describe("POST /contracts/:cID/item", ()=>{
                it("Rejects invalid body", async()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item", {}, {}, "Invalid request body", 400);

                    await expectsError(userAxios[0], "post", "/contracts/3/item", {
                        title: "item #1",
                        description: "description",
                        parties: [1],
                        type: "string"
                    }, {}, "Invalid request body", 400);

                    await expectsError(userAxios[0], "post", "/contracts/3/item", {
                        title: "item #1",
                        description: "description",
                        parties: [1],
                        type: "document",
                        additional: "additional"
                    }, {}, "Invalid request body", 400);
    
                    await expectsError(userAxios[0], "post", "/contracts/3/item", {
                        title: "item #1",
                        description: "description",
                        parties: [1],
                        type: "document",
                        fileBlob: b64
                    }, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}, "Invalid request body", 400);  
                });

                it("Rejects file size too big", async()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item", {
                        title: "item #1",
                        description: "description",
                        parties: [1],
                        type: "document",
                        fileName: "a.js",
                        fileBlob: (new Buffer(17)).toString("base64")
                    }, {}, "File size too big", 400);
                });

                it("Rejects past date", async()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item", {
                        title: "item #1",
                        description: "description",
                        parties: [1],
                        type: "meeting",
                        meetingDate: (new Date(0)).toISOString()
                    }, {}, "Date should not be in past", 400);
                });

                it("Parties not found", async()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item", {
                        title: "item #1",
                        description: "description",
                        parties: [1, 999],
                        type: "meeting",
                        meetingDate: (new Date(Date.now()+1000*10)).toISOString()
                    }, {}, "Parties not found", 404);
                });

                it("Parties must include self", async()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item", {
                        title: "item #1",
                        description: "description",
                        parties: [2],
                        type: "meeting",
                        meetingDate: (new Date(Date.now()+1000*10)).toISOString()
                    }, {}, "Parties must include self", 409);
                });

                it("Parties must be in contract", async()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item", {
                        title: "item #1",
                        description: "description",
                        parties: [1, 4],
                        type: "meeting",
                        meetingDate: (new Date(Date.now()+1000*10)).toISOString()
                    }, {}, "Parties not in contract", 403);
                });

                it("Create document item", async()=>{
                    const data = (await userAxios[0].post("/contracts/3/item", {
                        title: "item #1",
                        description: "description",
                        parties: [1, 2, 3],
                        type: "document",
                        fileName: "a.js",
                        fileBlob: b64
                    })).data;
                    expect(Object.keys(data)).toEqual(itemsModel.keys);
                    myhash = data.fileHash;
                });

                it("Create meeting item", async()=>{
                    const data = (await userAxios[0].post("/contracts/3/item", {
                        title: "item #2",
                        description: "description",
                        parties: [1, 2],
                        type: "meeting",
                        meetingDate: (new Date(Date.now()+1000)).toISOString()
                    })).data;
                    expect(Object.keys(data)).toEqual(itemsModel.keys);
                });
            });

            describe("GET /contracts/:cID/item/:iID", ()=>{
                it("Rejects not found items", async()=>{
                    await expectsError(userAxios[0], "get", "/contracts/3/item/999", {}, {}, "Item not found", 404);
                });

                it("Retrieve item details", async ()=>{
                    const data = (await userAxios[0].get("/contracts/3/item/1", {})).data;
                    expect(Object.keys(data)).toEqual(itemsModel.keys);
                    expect(data.fileID).toBeTruthy();
                });
            });

            describe("POST /contracts/:cID/item/:iID", ()=>{
                it("Rejects invalid body", async()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item/1", {}, {}, "Invalid request body", 400);

                    await expectsError(userAxios[0], "post", "/contracts/3/item/1", {
                        state: "sigam"
                    }, {}, "Invalid request body", 400);

                    await expectsError(userAxios[0], "post", "/contracts/3/item/1", {
                        state: "agree",
                        additional: "additional"
                    }, {}, "Invalid request body", 400);
    
                    await expectsError(userAxios[0], "post", "/contracts/3/item/1", {
                        state: "agree"
                    }, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}, "Invalid request body", 400);  
                });

                it("Record response", async()=>{
                    const data = (await userAxios[0].post("/contracts/3/item/1", {
                        state: "agree"
                    })).data;
                    expect(data).toBe("Response received");
                });

                it("Rejects duplicate response", async()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item/1", {
                        state: "disagree"
                    }, {}, "You already responded", 409);
                });

                it("Rejects finalised item", async()=>{
                    const data = (await userAxios[1].post("/contracts/3/item/1", {
                        state: "disagree"
                    })).data;
                    expect(data).toBe("Response received");

                    await expectsError(userAxios[1], "post", "/contracts/3/item/1", {
                        state: "agree"
                    }, {}, "Item has already been finalised", 403);  
                });
            });

            describe("POST /contracts/:cID/item/:iID/meeting/", ()=>{
                it("Rejects invalid request body", async ()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item/2/meeting", {}, {}, "Invalid request body", 400);

                    await expectsError(userAxios[0], "post", "/contracts/3/item/2/meeting", {
                        meetingFileID: [{
                            uID: 1,
                            id: "myid",
                            hash: b64
                        },{
                            uID: 2,
                            id: "myid",
                            hash: "myhash"
                        }]
                    }, {}, "Invalid request body", 400);
        
                    await expectsError(userAxios[0], "post", "/contracts/3/item/2/meeting", {
                        meetingFileID: [{
                            uID: 1,
                            id: "myid",
                            hash: "myhash"
                        },{
                            uID: 2,
                            id: "myid",
                            hash: "myhash"
                        }],
                        additional: "additional"
                    }, {}, "Invalid request body", 400);
        
                    await expectsError(userAxios[0], "post", "/contracts/3/item/2/meeting", {
                        meetingFileID: [{
                            uID: 1,
                            id: "myid",
                            hash: b64
                        },{
                            uID: 2,
                            id: "myid",
                            hash: b64
                        }]
                    }, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}, "Invalid request body", 400);  
                });

                it("Rejects party not equal to item's party", async ()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item/2/meeting", {
                        meetingFileID: [{
                            uID: 1,
                            id: "myid",
                            hash: b64
                        }]
                    }, {}, "Party not equal to item's party", 409);

                    await expectsError(userAxios[0], "post", "/contracts/3/item/2/meeting", {
                        meetingFileID: [{
                            uID: 1,
                            id: "myid",
                            hash: b64
                        }, {
                            uID: 999,
                            id: "myid",
                            hash: b64
                        }, {
                            uID: 2,
                            id: "myid",
                            hash: b64
                        }]
                    }, {}, "Party not equal to item's party", 409);

                    await expectsError(userAxios[0], "post", "/contracts/3/item/2/meeting", {
                        meetingFileID: [{
                            uID: 1,
                            id: "myid",
                            hash: b64
                        }, {
                            uID: 2,
                            id: "myid",
                            hash: b64
                        },
                        {
                            uID: 3,
                            id: "myid",
                            hash: b64
                        }, {
                            uID: 4,
                            id: "myid",
                            hash: b64
                        }]
                    }, {}, "Party not equal to item's party", 409);
                });

                it("Receive response", async ()=>{
                    const data = (await userAxios[0].post("/contracts/3/item/2/meeting", {
                        meetingFileID: [{
                            uID: 1,
                            id: "myid",
                            hash: b64
                        }, {
                            uID: 2,
                            id: "myid",
                            hash: b64
                        }]
                    })).data;
                    expect(data).toBe("Response received");
                });

                it("Rejects duplicate response", async ()=>{
                    await expectsError(userAxios[0], "post", "/contracts/3/item/2/meeting", {
                        meetingFileID: [{
                            uID: 1,
                            id: "myid",
                            hash: b64
                        }, {
                            uID: 2,
                            id: "myid",
                            hash: b64
                        }]
                    }, {}, "Duplicate response", 409);
                });
            });

            describe("GET /contracts/:cID/item/:iID/meeting", ()=>{
                it("Check if link is open", async ()=>{
                    expect((await userAxios[0].get("/contracts/3/item/2/meeting")).data).toBe(false);

                    const data = (await userAxios[0].post("/contracts/3/item", {
                        title: "item #3",
                        description: "description",
                        parties: [1, 2],
                        type: "meeting",
                        meetingDate: (new Date(Date.now()+10)).toISOString()
                    })).data;
                    expect(Object.keys(data)).toEqual(itemsModel.keys);
                    expect((await userAxios[0].get("/contracts/3/item/3/meeting")).data).toBe(true);
                });
            }); 

            describe("POST /contracts/:cID/item/:iID/meeting/end", ()=>{
                it("End's a meeting", async ()=>{
                    expect((await userAxios[0].post("/contracts/3/item/2/meeting/end")).data).toBe("Meeting ended");
                    expect((await userAxios[0].get("/contracts/3/item/2/meeting")).data).toBe(false);
                });
            });
        });
    });

    describe("POST /proof", ()=>{
        it("Rejects invalid request body", async()=>{
            await expectsError(userAxios[0], "post", "/proof", {}, {}, "Invalid request body", 400);

            await expectsError(userAxios[0], "post", "/proof", {
                fileBlob: "sigma",
                parties: [1,2,3],
                hash: "myhash"
            }, {}, "Invalid request body", 400);

            await expectsError(userAxios[0], "post", "/proof", {
                fileBlob: b64,
                parties: [1,2,3],
                hash: "myhash",
                additional: "additional"
            }, {}, "Invalid request body", 400);

            await expectsError(userAxios[0], "post", "/proof", {
                fileBlob: b64,
                parties: [1,2,3],
                hash: "myhash",
            }, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}, "Invalid request body", 400);  
        });

        it("Returns false on different content", async ()=>{
            const data = (await userAxios[0].post("/proof", {
                fileBlob: b64,
                parties: [1,2,3],
                hash: "myhash",
            })).data;
            expect(data).toBe(false);

            const data2 = (await userAxios[0].post("/proof", {
                fileBlob: b64,
                parties: [1,3],
                hash: myhash,
            })).data;
            expect(data2).toBe(false);

            const data3 = (await userAxios[0].post("/proof", {
                fileBlob: Buffer.from("inibedabanget").toString("base64"),
                parties: [1,2,3],
                hash: myhash,
            })).data;
            expect(data3).toBe(false);
        });

        it("Returns true on same content", async ()=>{
            const data = (await userAxios[0].post("/proof", {
                fileBlob: b64,
                parties: [3,2,1],
                hash: myhash,
            })).data;
            expect(data).toBe(true);
        });
    });

    describe("Manual work", ()=>{
        it("Check JWT expired", async () =>{
            setTimeout(async ()=>{
                await expectsError(userAxios[0], "get", "/contracts", {}, {}, "Session expired", 403);  
            }, 1000*parseInt(process.env.SESSION_SECONDS_EXPIRE));
        });
    });
});