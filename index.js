import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import userRoutes from "./routes/users.js"
import questionRoutes from "./routes/Questions.js"
import answerRoutes from "./routes/Answers.js"
import dotenv from "dotenv"

const app =express();
dotenv.config();

app.use(express.json({limit: '30mb',extend:true}));
app.use(express.urlencoded({limit: "30mb" ,extended: true}))
app.use(cors());

app.get("/",(req,res)=>{
    res.send("this is a stack overflow api")
})

app.use("/user", userRoutes)
app.use("/questions",questionRoutes)
app.use("/answer", answerRoutes)

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL
mongoose.set("strictQuery",false);
// const URL ="mongodb+srv://me:123@stack-overflow-clone.sudn2zv.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology:"true"})
//     .then(()=> app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)}))
//     .catch((err)=> console.log(err))


mongoose.connect(DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology:"true"})
    .then(()=>app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`)
    }))
    .catch((err)=>{
        console.log(err)
    })