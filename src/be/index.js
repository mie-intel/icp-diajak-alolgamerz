import { Server } from "azle/experimental";
import server from "./server";
import candid from "./candid";

export default Server(()=>{return server;}, candid);
