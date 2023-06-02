import mongoose from "mongoose";

const ObjectId = mongoose.Schema.ObjectId;

const productCategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: [{type:String}],
  productsIds: [{ type: ObjectId }],
});

const ProductCategory = mongoose.model("ProductCategory", productCategoriesSchema);

export default ProductCategory;
