import { Router } from "express";
import { createToken, forgotPassword, forgotPasswordVerify, login, profile, register } from "../controllers/auth.js";

export const authRouter = Router();


authRouter.post('/register', register)
authRouter.post('/login', login, createToken)
authRouter.get('/me', profile)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/forgot-password/verify', forgotPasswordVerify)
