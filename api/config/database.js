import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

export const connect =  () =>{
    mongoose.connect(process.env.Mongo,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(console.log("Connection successfull"))
    .catch((err)=>{
        console.log(err);
        console.log("error in DB connection")
        process.exit(1);
    })
}