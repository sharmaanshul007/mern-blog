import express from 'express';
import mongoose from 'mongoose';
import User from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import {connect} from './config/database.js'
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());
connect();

app.listen(3000,()=>{
    console.log("Server is running at port 3000!");
});

app.use('/api/user',User);
app.use('/api/auth',authRoute);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        message :message,
        success:false
    })
});