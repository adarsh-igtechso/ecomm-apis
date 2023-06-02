import mongoose from "mongoose";

const ObjectId = mongoose.Schema.ObjectId;

const reviewSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  productId: { type: ObjectId, required: true },
  review: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
