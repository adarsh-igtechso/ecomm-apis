import Review from "../models/review.js";

export const getAllReviews = async (req, res) => {
  try {
    const getAllReviews = await Review.find();
    return res.status(200).json({ reviews: getAllReviews });
  } catch (error) {
    console.log(error);
    return res.status(404).json("Can't load the reviews");
  }
};

export const createReview = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, review } = req.body;
    const newReview = new Review({ userId, productId, review });
    try {
      newReview.save();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Can't add your review" });
    }
    return res.status(202).json({ msg: "Review added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json("Can't create the review");
  }
};

export const deleteReview = async (req, res) => {
  try {
    const userId = req.id;
    const reviewId = req.params.id;
    let myList;
    try {
      myList = await Review.findOneAndDelete({ _id: reviewId, userId: userId });
    } catch (error) {
      throw "Can't delete review";
    }

    return res.status(200).json({ msg: "review deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Can't remove this item from review" });
  }
};
