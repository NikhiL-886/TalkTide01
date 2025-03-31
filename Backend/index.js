import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import { app,server } from "./SocketIO/server.js";
import path from "path"

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js"




const PORT=process.env.PORT||5000;
const MONGODB_URI=process.env.MONGODB_URI;



async function db() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("DataBase connect ho gya ,Nacho BC")
    } catch (error) {
        console.log("Ye le thalaka omelette:"+error)
    }
    
}

db();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/user",userRoute);
app.use("/api/message",messageRoute);

if(process.env.NODE_ENV==="production"){
    const dirPath=path.resolve();
    
    app.use(express.static("./Frontend/dist"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"));
    })
}

server.listen(PORT,()=>{
    console.log("Server is working at Port:"+ PORT);
})


