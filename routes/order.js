import { Router } from "express";
import { verifyLogin } from "../controllers/middleware.js";
import { cancelOrder, createOrder, myOrder, myOrderProduct } from "../controllers/order.js";

export const orderRouter = Router();

orderRouter.get('/', verifyLogin, myOrder)
orderRouter.post('/', verifyLogin, createOrder)
orderRouter.delete('/:id', verifyLogin, cancelOrder)
orderRouter.get('/:id', verifyLogin, myOrderProduct)