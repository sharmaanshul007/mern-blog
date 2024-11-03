import Post from "../models/post.model.js";
import {errorHandler} from '../utils/error.js';
export const create = async(req,res,next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(401,"Unauthorized User bhai "));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(402,"Send all the complete data"));
    }
    const title = req.body.title;
    const postA = await Post.findOne({title});
    if(postA){

            console.log("You are trying to create a post with a title that already exists in the database");
            return next(errorHandler(403,"Already a post exists with the same title"));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'');
    const post = new Post({
        ...req.body,slug,userId:req.user.id
    });
    try{
        
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    }catch(err){
        return next(errorHandler(400,err));
    }
}