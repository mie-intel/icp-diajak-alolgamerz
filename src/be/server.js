import express from "express";
import router from "./router/router.js";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use("/", router);

export default app.listen(5000);