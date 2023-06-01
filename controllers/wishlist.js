import Product from "../models/product.js";
import Wishlist from "../models/wishlist.js";

export const createWishlist = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;
    let myList;
    try {
      myList = await Wishlist.findOne({ userId: userId });
    } catch (error) {
      throw "Can't fetch wishlist";
    }
    if (!myList) {
      myList = new Wishlist({ userId, productsId: [productId] });
      try {
        await myList.save();
      } catch (error) {
        console.log("Wishlist creation error", error);
        throw "can't create new wishlist";
      }
      return res.status(200).json({ msg: "Successfully created the wishlist" });
    }
    try {
      await Wishlist.findByIdAndUpdate(myList._id, {
        productsId: [...myList.productsId, productId],
      });
    } catch (error) {
      throw "can't add this item to wishlist";
    }
    return res.status(200).json({ msg: "Added product to your wishlist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
};

export const myWishlist = async (req, res) => {
  try {
    const userId = req.id;
    let myList;
    try {
      myList = await Wishlist.findOne({ userId: userId });
    } catch (error) {
      throw "Can't fetch wishlist";
    }
    if (!myList)
      return res.status(404).json({ msg: "You don't have a wishlist" });
    let wishlistProducts = [];
    myList.productsId.forEach(async (id) => {
      let wishlist_product = await Product.findById(id);
      wishlistProducts = [...wishlistProducts, wishlist_product];
    });
    setTimeout(() => {
      return res.status(200).json({ Wishlist: wishlistProducts });
    }, 1000);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
};

export const deleteWishlist = async (req, res) => {
  try {
    const userId = req.id;
    try {
      await Wishlist.findOneAndDelete({ userId });
    } catch (err) {
      console.log(err);
      throw "can't find the wishlist";
    }
    return res.status(200).json({ msg: "Wishlist deleted" });
  } catch (error) {
    return res.status(500).json({ err: "Can't delete the wishlist" });
  }
};

export const myWishlistProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const wishlist_product = await Product.findById(id);
    if (!wishlist_product)
      return res.status(404).json({ err: "No such products found" });
    return res.status(200).json({ Wishlist: wishlist_product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
};

export const deleteWishlistProduct = async (req, res) => {
  try {
    const userId = req.id;
    const productId = req.params.id;
    let myList;
    try {
      myList = await Wishlist.findOne({ userId: userId });
    } catch (error) {
      throw "Can't fetch wishlist";
    }
    console.log(myList)
    const newWishList = myList.productsId.filter((pid) => {
      if (pid != productId) return pid;
      else console.log(pid, productId)
    });

    console.log(newWishList)

    try {
      await Wishlist.findByIdAndUpdate(myList._id, {
        productsId: newWishList,
      });
    } catch (error) {
      console.log;
      throw "Can't remove this item";
    }
    return res.status(200).json({msg:"Removed the item"});
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Can't remove this item from wishlist" });
  }
};
