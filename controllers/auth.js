import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validator.js";
import User from "../models/user.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (
      !validateName(name) ||
      !validateEmail(email) ||
      !validatePassword(password)
    ) {
      throw "Invalid information";
    }
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      throw "User already exists";
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    try {
      await newUser.save();
    } catch (error) {
      console.log(error);
      throw "Can't create account";
    }
    res.user_id = newUser._id;
    // next();
    return res.status(201).json({ msg: "Successfully created a user account" });
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) throw "Wrong email id provided";
    let existingUser = await User.findOne({ email });
    if (!existingUser) throw "User doesn't exists! Please create a account!!!";
    if (!validatePassword(password))
      throw "Please provide password in exprected format";
    const passMatch = await bcrypt.compare(password, existingUser.password);

    if (!passMatch) {
      throw "Wrong password";
    }
    res.user_id = existingUser._id;
    next();
  } catch (err) {
    console.error("We ran into an error at login", err);
    return res.status(500).json({ err });
  }
};

export const createToken = (req, res) => {
  const id = res.user_id;

  const token = jwt.sign({ user: { id } }, JWT_SECRET_KEY, {
    expiresIn: "45s",
  });
  res.cookie("user", token, {
    expire: new Date(Date.now() + 1000 * 45),
  });
  return res.status(200).json({msg:"Successfully logged in"});
};



export const profile = async(req, res)=>{
    try {
        const token = req.cookies.user;
        const userId = jwt.verify(token, JWT_SECRET_KEY)
        let user;
        try {
            user = await User.findById(userId.user.id).select("-password");
        } catch (error) {
            throw "Can't get the user"
        }
        return res.status(200).json({user});
    } catch (error) {
        console.log(error);
        return res.status(400).json({err:"Can't verify the login"})
    }
}