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
