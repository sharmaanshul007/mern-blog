import express from 'express';
const router = express.Router();
import {verifyToken} from '../utils/verifyUser.js';
import { getUsers, test, updateUser, deleteUser, signOut, getUser } from '../controllers/user.controller.js';
router.get('/test',test);
router.get('/getusers',verifyToken,getUser);
router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signOut);
router.get('/:userId',getUsers);

export default router;