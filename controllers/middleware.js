import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    let user;
    try {
      user = await User.findById(userId).select("-password");
    } catch (error) {
      throw "Can't get the user";
    }
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: "Can't verify the login" });
  }
};

export const verifyLogin = async (req, res, next) => {
  const token = req.cookies.user;
  if (!token) return res.status(400).json("No token was found");
  try {
    const userId = jwt.verify(token, JWT_SECRET_KEY);
    req.id = userId.user.id;
    next();
  } catch (error) {
    return res.status(400).json({ err: "Can't verify login" });
  }
};
