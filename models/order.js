import mongoose from "mongoose";

const ObjectId = mongoose.Schema.ObjectId;

const orderSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  productsId: [{ type: ObjectId }],
  address: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
