import Inventory from "../models/inventory.js";

export const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    return res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(200).json({ err: "Can't fetch the inventory" });
  }
};

export const createInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const newInventory = new Inventory({
      productId,
      quantity: Number(quantity),
    });
    try {
      await newInventory.save();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ err: "Can't create the inventory" });
    }
    return res.status(202).json({ msg: "New inventory created" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: "Can't create the inventory" });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body;
    await Inventory.findByIdAndUpdate(id, { quantity });
    return res.status(200).json({msg:"updated the inventory"});
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: "can't update the inventory" });
  }
};
