import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
    select: false
  },
  price:{
    type:Number
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;


// 112645
// 11 / 27
