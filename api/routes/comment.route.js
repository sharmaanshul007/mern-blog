import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {createComment,getPostComments,getComments,deleteComment, editComment,likeComment}  from '../controllers/comment.controller.js';
const router = express.Router();
router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId',getPostComments);
router.delete('/deleteComment/:commentId',verifyToken,deleteComment);
router.get('/getcomments',verifyToken,getComments); 

router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
export default router;  