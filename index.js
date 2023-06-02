import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";


// routers
import { authRouter } from './routes/auth.js';
import { userRouter } from './routes/users.js';
import { productRouter } from './routes/products.js';
import { wishlistRouter } from './routes/wishlists.js';
import { productCategoryRouter } from './routes/productCategories.js';
import { orderRouter } from './routes/order.js';
import { reviewRouter } from './routes/review.js';

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
app.use('/api/v1/wishlist/', wishlistRouter)
app.use('/api/v1/product-categories/', productCategoryRouter)
app.use('/api/v1/orders/', orderRouter)
app.use('/api/v1/reviews/', reviewRouter)