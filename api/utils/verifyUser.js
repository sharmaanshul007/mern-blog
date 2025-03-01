import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';
import dotenv from 'dotenv'
dotenv.config();
export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    console.log(req.cookies);
    if(!token){
        console.log("Token not found");
        return next(errorHandler(401,'Unauthorized to move in this route'));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            console.log(err);
            return (next(errorHandler(401,"Unauthorized")));
        }
        req.user = user;
        
        next();
    })
}