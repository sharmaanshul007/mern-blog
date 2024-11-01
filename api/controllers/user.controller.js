import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
export const test = (req,res) =>{
    
    console.log("Test route");
    res.send({Message:"Test route"});
   
}

export const updateUser = async(req,res,next) => {
   if(req.user.id !== req.params.userId){
    return next(errorHandler(401,"You are not authorized to move in this route"));
   }
   
   if(req.body.password){
    if(req.body.password.length < 6){
        return (next(errorHandler(402,"You have entered a password of less than 6 length")));
    }
    req.body.password = bcryptjs.hashSync(req.body.password,10);
   }
   
   if(req.body.username){
        if(req.body.username.length < 4){
            return next(errorHandler(401,"Username has length less than 4"));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(401,"Username cannot have space between them "));

        }
        if(req.body.username != req.body.username.toLowerCase()){
            return next(errorHandler(401,"Username has to be completely in lower case english alphabets"));

        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(401,"username cannot cannot contain any other character than numbers and alphabets"))
        }  
    }
    try{
        const user = await User.findById(req.params.userId);
        console.log("Hi first");
        console.log(user);
        console.log(req.body.username);
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                email:req.body.email,
                password:req.body.password,
                username:req.body.username,
            }
        },{new:true});
        console.log("Hi second");
        console.log(updatedUser);
        const {password,...rest} = updatedUser._doc;
        return res.status(200).json(rest);
    }catch(error){
        console.log("HI");
        console.log(error);
        return next(errorHandler(401,error));
    }
}


export const deleteUser = async(req,res) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandler(401,"User not authorised to move in this row"));
    }
    const userId = req.params.userId;
    try{
        await User.findByIdAndDelete(userId);
        return res.status(200).json("User has been deleted");
    }catch(error){
        console.log("User cannot be deleted in deleteuser");
        next(errorHandler(401,error));
    }
}



