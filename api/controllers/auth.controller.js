import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
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
        next(err);
    }
}