import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
export const signup = async(req,res) => {
    try{
        const {email,password,username} = req.body;

        if(!email || !password || !username || username === '' || email === '' || password === ''){
            return res.status(404).json({
                message:"All fields are required"
            })
        }
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({
                message:"Reentry of same user"
            })
        }
        const hashedPassword = bcryptjs.hashSync(password,10);

        //create
        const newUser = await User.create({username,email,password:hashedPassword});
        console.log(newUser);
        return res.status(200).json({
            message:"User entry successfull",
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message:"Cannot register the user",
        })
    }
}