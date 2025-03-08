import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { comment, postId, userId } = req.body;
    console.log(comment, postId, userId);
    if(!comment || !postId || !userId || comment.trim() === "") {
      return next(errorHandler(400, "Please fill all the fields"));
    }
    console.log("hi1");
    const newComment = new Comment({ content:comment, postId, userId });
    const savedComment = await newComment.save();
    console.log("hi2");
    return res.status(200).json({
      message: "Comment saved successfully",
      success: true,
      savedComment,
    });
    
  } catch (error) {
    console.log("Server Error:", error);
    return next(errorHandler(500, error.message));
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({postId:req.params.postId}).sort({createdAt:-1});   
    return res.status(200).json(comments);
  }catch(error){
    console.log("Error in getting the comments from the stored database");
    return next(errorHandler(401, error.message));
  }
}


export const getComments = async(req,res,next) => {
  if(!req.user.isAdmin){
    return next(errorHandler(401, "You are not authorized to view this page"));
  }
  try{
    const limit = req.query.limit || 5;
    const startIndex = req.query.startIndex || 0;
    const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;
    const comments = await Comment.find().sort({createdAt:sortDirection}).skip(parseInt(startIndex)).limit(limit);
    const totalComments = await Comment.countDocuments();
    console.log(totalComments);
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthComments1 = await Comment.find({createdAt:{
      $gte:oneMonthAgo
    }})
    const lastMonthComments = lastMonthComments1.length;
    return res.status(200).json({comments,totalComments,lastMonthComments});
  }catch(error){
    console.log("Error in getting the comments from the stored database");
    return next(errorHandler(401, error.message));
  }
}


export const deleteComment = async(req,res,next) => { 
  try{
    const commentId = req.params.commentId;
    const deletedComment = await Comment.findByIdAndDelete(commentId);   
    return res.status(200).json(deletedComment);
  }
  catch(error){
    console.log("Error in deleting the comment from the stored database");
    return next(errorHandler(401, error.message));
  } 
}

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, 'You are not allowed to edit this comment')
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};
