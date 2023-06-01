import express from 'express'
import cookieParser from "cookie-parser";
import { authRouter } from './routes/auth.js';
import { userRouter } from './routes/users.js';
import cors from 'cors'
import { productRouter } from './routes/products.js';

export const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// middlewares
app.get('/',(req, res)=>{
    res.send("Hello World")
})

app.use('/api/v1/auth/', authRouter)
app.use('/api/v1/users/', userRouter)
app.use('/api/v1/products/', productRouter)