import mongoose from "mongoose";

const ObjectId = mongoose.Schema.ObjectId;

const inventorySchema = new mongoose.Schema({
  productId: {
    type: ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});


const Inventory = mongoose.model("Inventory", inventorySchema)

export default Inventory;