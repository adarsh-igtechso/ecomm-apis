import { Router } from "express";
import { createToken, login, profile, register } from "../controllers/auth.js";

export const authRouter = Router();


authRouter.post('/register', register)
authRouter.post('/login', login, createToken)
authRouter.get('/me', profile)