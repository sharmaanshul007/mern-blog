import express from "express";
import { create,getposts,deletePost } from "../controllers/post.controller.js";
import {verifyToken} from '../utils/verifyUser.js'
const router = express.Router();

router.post('/create',verifyToken,create);
router.get('/getposts',getposts);
router.delete('/deletepost/:postId/:userId',verifyToken, deletePost);
export default router;