import { Router } from "express";
import { getUser } from "../controllers/middleware.js";
import { deleteUser, getAllUsers } from "../controllers/users.js";


export const userRouter = Router();


userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUser);
userRouter.delete('/:userId', deleteUser);