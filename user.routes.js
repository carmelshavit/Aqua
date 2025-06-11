import express from 'express';
import { getAllUserNames, getUserByName, createUser } from './user.controller.js';

export const userRouter = express.Router();

userRouter.get('/', getAllUserNames);
userRouter.get('/:name', getUserByName);
userRouter.post('/', createUser);
