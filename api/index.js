import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './routes/user.route.js'
dotenv.config();
const app = express();
const mongo = process.env.Mongo;
mongoose.connect(mongo).then(()=>{
    console.log("database is connected")
}).catch((err)=>{
    console.log(err);
})

app.listen(3000,()=>{
    console.log("Server is running at port 3000!");
});

app.use('/api/user',User);