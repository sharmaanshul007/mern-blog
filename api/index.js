import express from 'express';
import mongoose from 'mongoose';
import User from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import {connect} from './config/database.js'
const app = express();
app.use(express.json());
connect();

app.listen(3000,()=>{
    console.log("Server is running at port 3000!");
});

app.use('/api/user',User);
app.use('/api/auth',authRoute);