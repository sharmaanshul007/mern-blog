import mongoose from 'mongoose';

const userModel = new mongoose.model({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },

},{timestamps:true});

module.exports = mongoose.model("User",userModel);

