import Post from "../models/post.model.js";
import {errorHandler} from '../utils/error.js';
export const create = async(req,res,next) => {
    console.log("This is request by abhinav the buwade",req);
    console.log("buwade ka aashiq");
    console.log(req.user);
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

export const getposts = async(req,res,next) => {
    try{
        const startIndex = parseInt(req.query.startIndex || 0);
        const limit = parseInt(req.query.limit || 9);
        const sortDirection = req.query.order === "asc" ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id:req.query.slug}),
            ...(req.query.searchItem && {
                $or:[
                    {title:{$regex:req.query.searchItem,$options:'i'}},
                    {content:{$regex:req.query.searchItem,$options:'i'}},

                ]
            }),

        }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit)
        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )
        const lastMonthPosts = await Post.countDocuments({
            createdAt:{$gte:oneMonthAgo},
        })

        return res.status(200).json({
            posts,
            lastMonthPosts,
            totalPosts,
        })

    }catch(error){
        console.log(error);
        return next(errorHandler(400,error));
    }
}


export const deletePost = async(req,res,next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(401,'User not validated and hence not allowed to delete the post'));
    }
    try{
        const result = await Post.findByIdAndDelete(req.params.postId);
        return res.status(200).json("Post has been deleted completely");
    }catch(error){
        console.log(error);
        return next(errorHandler(401,error));
    }
}