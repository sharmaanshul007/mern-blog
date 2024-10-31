import express from 'express';
const router = express.Router();
import {verifyToken} from '../utils/verifyUser.js';
import { test, updateUser } from '../controllers/user.controller.js';
router.get('/test',test);
router.put('/update/:userId',verifyToken,updateUser);

export default router;