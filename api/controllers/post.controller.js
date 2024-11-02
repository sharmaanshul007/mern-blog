import Post from "../models/post.model.js";
import {errorHandler} from '../utils/error.js';
export const create = async(req,res,next) => {
    console.log(req.body);
    if(!req.user.isAdmin){
        return next(errorHandler(401,"Unauthorized User bhai "));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(402,"Send all the complete data"));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[a-zA-Z0-9]/g,'');
    const post = new Post({
        ...req.body,slug,userId:req.user.id
    });
    try{
        const savedPost = post.save();
        res.status(201).json(savedPost);
    }catch(err){

    }
}