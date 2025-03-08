import express from 'express';
import mongoose from 'mongoose';
import User from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import postRoute from './routes/post.route.js'
import commentRoute from './routes/comment.route.js'
import {connect} from './config/database.js'
import cookieParser from 'cookie-parser';
import path from "path";
const app = express();
app.use(express.json());
app.use(cookieParser());
connect();

const __dirname = path.resolve();

app.listen(3000,()=>{
    console.log("Server is running at port 3000!");
});

app.use('/api/user',User);
app.use('/api/auth',authRoute);
app.use('/api/post',postRoute);
app.use('/api/comment',commentRoute)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use(express.static(path.join(__dirname,'/client/dist')));
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        message :message,
        success:false
    })
});