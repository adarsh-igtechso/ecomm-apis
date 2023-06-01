import mongoose from "mongoose";

const ObjectId = mongoose.Schema.ObjectId;

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  productsId: [{ type: ObjectId }],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
