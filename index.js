import mongoose from "mongoose";
import express from "express"
import connection  from "./config/db.js";
import dotenv from "dotenv"
import auth from "./middleware/auth.middleware.js"
dotenv.config()
import userRouter from "./routes/user.route.js";
import noteRouter from "./routes/note.route.js";
import cors from "cors"



const port=process.env.PORT||5000
const app=express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.use(express.static("public"));
app.use("/user",userRouter)
app.use("/notes",auth,noteRouter)



app.get("/",(req,res)=>{
    res.send("Server is running fine")
})

app.listen(port,async()=>{
   
    try {
        await connection
        console.log(`server and database is connected successfully : ${port}`)
        
    } catch (error) {
        console.log(`there is error in connection please check:${error}`)
        
    }
})
