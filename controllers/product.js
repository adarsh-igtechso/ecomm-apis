import Product from "../models/product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, seller } = req.body;
    if (!name || !description || !seller) throw "Incomplete description";
    const newProduct = new Product({ name, description, seller });
    try {
      newProduct.save();
    } catch (error) {
      console.log(error);
      throw "New product can't be added.";
    }
    return res.status(201).json({ msg: "Successfully added the product" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(400).json({ err: "Can't get the products" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    let product;
    try {
      product = await Product.findById(productId).select("-password");
    } catch (error) {
      throw "Can't get the product";
    }
    if (!product) {
      return res.status(404).json({ err: "product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: "Can't verify the login" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.deleteOne({ _id: productId });
    return res.status(500).json({ msg: "product deleted" });
  } catch (error) {
    return res.status(500).json({ err: "Can't delete the product" });
  }
};
