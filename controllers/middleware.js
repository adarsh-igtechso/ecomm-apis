import User from "../models/user.js";

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
