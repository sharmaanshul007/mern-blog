import express from 'express';
const router = express.Router();
import {verifyToken} from '../utils/verifyUser.js';
import { test, updateUser, deleteUser, signOut } from '../controllers/user.controller.js';
router.get('/test',test);
router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signOut);
export default router;