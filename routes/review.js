import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
} from "../controllers/review.js";
import { verifyLogin } from "../controllers/middleware.js";

export const reviewRouter = Router();

reviewRouter.get("/", getAllReviews);
reviewRouter.post("/", verifyLogin, createReview);
reviewRouter.delete("/:id", verifyLogin, deleteReview);
