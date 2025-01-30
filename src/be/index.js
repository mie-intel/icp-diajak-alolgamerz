import { Server } from "azle/experimental";
import server from "./server.js";
import candid from "./candid.js";

export default Server(()=>{return server;}, candid);
