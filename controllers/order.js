import Product from "../models/product.js";
import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.id;
    const { productsId, address } = req.body;
    let myOrders;
    try {
      myOrders = await Order.findOne({ userId: userId });
    } catch (error) {
      throw "Can't fetch Order";
    }

    myOrders = new Order({ userId, productsId, address });
    try {
      await myOrders.save();
    } catch (error) {
      console.log("Order creation error", error);
      throw "can't create new Order";
    }
    return res.status(200).json({ msg: "Successfully created the Order" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
};

export const myOrder = async (req, res) => {
  try {
    const userId = req.id;
    let myOrderList;
    try {
      myOrderList = await Order.find({ userId: userId });
    } catch (error) {
      throw "Can't fetch Order";
    }
    console.log(myOrderList.length);
    if (!myOrderList.length)
      return res.status(404).json({ msg: "You don't have a Order" });
    let OrderProducts = [];
    myOrderList.forEach(async (order) => {
      order.productsId.forEach(async (id) => {
        let Order_product = await Product.findById(id);
        OrderProducts = [...OrderProducts, Order_product];
      });
    });
    setTimeout(() => {
      return res.status(200).json({ Order: OrderProducts });
    }, 1000);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
};

export const myOrderProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const Order_product = await Order.findById(id);
    if (!Order_product)
      return res.status(404).json({ err: "No such order list found" });
    return res.status(200).json({ Order: Order_product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const userId = req.id;
    const orderId = req.params.id;
    let myList;
    try {
      myList = await Order.findOneAndDelete({_id:orderId, userId:userId});
    } catch (error) {
      throw "Can't cancel Order";
    }

    return res.status(200).json({ msg: "order cancelled" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Can't remove this item from Order" });
  }
};
