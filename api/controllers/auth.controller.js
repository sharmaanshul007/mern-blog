import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();


export const signup = async(req,res,next) => {
    try{
        const {email,password,username} = req.body;

        if(!email || !password || !username || username === '' || email === '' || password === ''){
            next(errorHandler(404,"All fields are required"));
        }
        const user = await User.findOne({email:email});
        if(user){
            next(errorHandler(404,"User already defined"));
        }
        const hashedPassword = bcryptjs.hashSync(password,10);

        //create
        const newUser = await User.create({username,email,password:hashedPassword});
        
        console.log(newUser);
        return res.status(200).json({
            message:"User entry successfull",
        })
    }catch(err){
        next(errorHandler(200,err));
    }
}


export const signin = async(req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password || email === "" || password ===""){
        return next(errorHandler(402,"Email or password not entered"));
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return next(errorHandler(401,"User not registerd"));
        }
        const compare =  bcryptjs.compareSync(password,user.password);
        if(!compare){
            return next(errorHandler(403,"Password doesnot match"));
        }
        const {password:pass,...rest} = user._doc;
        const token = jwt.sign(
            {id:user._id,isAdmin:user.isAdmin}, process.env.JWT_SECRET, {expiresIn:'260h'} 
        )
        return res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
        
    }catch(error){
        console.log(error);
         next(400,'Big Mistake in Sign In ');
    }
}

export const google = async(req,res,next) => {
    try{
        const {name, email , googlePhotoUrl} = req.body;
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn:"260h"});
            const {password:pass,...rest} = user._doc;
            return res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
        }
        const generatedPassword = Math.random().toString(36).slice(-8);
        const hashedPassword =  bcryptjs.hashSync(generatedPassword,10);
        const savedUser = await User.create({username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),email:email,password:
            hashedPassword,profilePicture:googlePhotoUrl});
        const {password:pass,...rest} = savedUser._doc;
        const token = jwt.sign({id:savedUser._id,isAdmin:savedUser.isAdmin},process.env.JWT_SECRET,{expiresIn:"260h"});
        return res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
    }catch(error){
        console.log(error);
        next(errorHandler(404,error));
    }
}