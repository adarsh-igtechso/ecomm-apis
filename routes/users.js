import { Router } from "express";
import { getUser } from "../controllers/middleware.js";


export const userRouter = Router();


userRouter.get('/', )
userRouter.get('/userId', getUser);