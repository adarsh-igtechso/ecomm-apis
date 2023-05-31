import express from 'express'
import cookieParser from "cookie-parser";
import { authRouter } from './routes/auth.js';
import { userRouter } from './routes/users.js';

export const app = express();

app.use(express.json())
app.use(cookieParser())

// middlewares
app.get('/',(req, res)=>{
    res.send("Hello World")
})

app.use('/api/v1/auth/', authRouter)
app.use('/api/v1/users/', userRouter)