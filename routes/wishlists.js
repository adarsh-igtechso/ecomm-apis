import { Router } from "express";
import { verifyLogin } from "../controllers/middleware.js";
import {
  createWishlist,
  deleteWishlist,
  deleteWishlistProduct,
  myWishlist,
  myWishlistProduct,
} from "../controllers/wishlist.js";

export const wishlistRouter = Router();

wishlistRouter.get("/", verifyLogin, myWishlist);
wishlistRouter.post("/", verifyLogin, createWishlist);
wishlistRouter.delete("/", verifyLogin, deleteWishlist);
wishlistRouter.get("/:id", myWishlistProduct);
wishlistRouter.delete("/:id", verifyLogin, deleteWishlistProduct);
