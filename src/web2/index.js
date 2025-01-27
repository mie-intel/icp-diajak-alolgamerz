import express from "express";

const app = express();

app.get("/", (req,res)=>{
    res.send("This is the websocket thing");
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server starting on port " + (process.env.PORT || 3000));
});