import express from 'express'
import { getMe, login, logout, register } from '../controller/userController.js';
import upload from '../middleware/upload.js';
import { authMid } from '../middleware/authMid.js';

const userRouter = express.Router()

userRouter.post('/register',upload.single('image') ,register)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
userRouter.get('/getMe', authMid, getMe)

export default userRouter;