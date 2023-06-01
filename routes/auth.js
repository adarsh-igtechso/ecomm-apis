import { Router } from "express";
import { createToken, forgotPassword, forgotPasswordVerify, login, profile, register } from "../controllers/auth.js";
import { verifyLogin } from "../controllers/middleware.js";

export const authRouter = Router();


authRouter.post('/register', register)
authRouter.post('/login', login, createToken)
authRouter.get('/me', verifyLogin, profile)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/forgot-password/verify', forgotPasswordVerify)
