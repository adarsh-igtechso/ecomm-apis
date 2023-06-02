import ProductCategory from "../models/productCategories.js";

export const getAllProductsCategory = async (req, res) => {
  try {
    const productCategories = await ProductCategory.find();
    return res.status(200).json({ productCategories });
  } catch (error) {
    return res.status(400).json({ err: "Can't get the product categories" });
  }
};

export const createProductCategory = async (req, res) => {
  try {
    const { name, tags, productIds } = req.body;
    if (!name || !tags || !productIds) throw "Incomplete description";
    const newProductCategory = new ProductCategory({ name, tags, productIds });
    try {
      newProductCategory.save();
    } catch (error) {
      console.log(error);
      throw "New product category can't be added.";
    }
    return res
      .status(201)
      .json({ msg: "Successfully added the product category" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
};

export const singleProductCategory = async (req, res) => {
  try {
    const productCategoryId = req.params.id;
    let productCategory;
    try {
      productCategory = await ProductCategory.findById(productCategoryId);
    } catch (error) {
      throw "Can't get the product category";
    }
    if (!productCategory) {
      return res.status(404).json({ err: "product category not found" });
    }
    return res.status(200).json({ productCategory });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: "Can't find the product category" });
  }
};

export const deleteProductCategory = async (req, res) => {
  try {
    const productCategoryId = req.params.id;
    try {
      await ProductCategory.findByIdAndDelete(productCategoryId);
    } catch (error) {
      throw "Can't delete the product category";
    }
    return res.status(200).json({ msg: "Product successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: "Can't find the product category" });
  }
};

export const updateProductCategory = async (req, res) => {
  try {
    const productCategoryId = req.params.id;
    console.log(productCategoryId);
    let { name, tags, productIds } = req.body;
    if (!name || !tags || !productIds) throw "Incomplete description";
    try {
      await ProductCategory.findByIdAndUpdate(productCategoryId, {
        name,
        tags,
        productIds,
      });
    } catch (error) {
      console.log(error);
      throw "Product category can't be updated.";
    }
    return res
      .status(201)
      .json({ msg: "Successfully updated the product category" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
};
