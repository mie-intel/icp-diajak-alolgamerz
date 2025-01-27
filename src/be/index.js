import express from "express";
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.get("/", (req,res)=>{
  res.send("Haloo");
});

app.listen();