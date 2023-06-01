import { Router } from "express"; 
import { addProduct, deleteProduct, getAllProducts, getProduct } from "../controllers/product.js";
export const productRouter = Router();

productRouter.get('/', getAllProducts)
productRouter.post('/', addProduct)
productRouter.get('/:id', getProduct)
productRouter.delete('/:id', deleteProduct )