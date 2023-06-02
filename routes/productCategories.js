import { Router } from "express";
import { createProductCategory, deleteProductCategory, getAllProductsCategory, singleProductCategory, updateProductCategory } from "../controllers/productCategory.js";

export const productCategoryRouter = Router();

productCategoryRouter.get('/', getAllProductsCategory)
productCategoryRouter.post('/', createProductCategory)
productCategoryRouter.get('/:id', singleProductCategory)
productCategoryRouter.delete('/:id', deleteProductCategory)
productCategoryRouter.put('/:id', updateProductCategory)
