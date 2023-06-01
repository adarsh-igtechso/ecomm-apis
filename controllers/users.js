import User from "../models/user.js";

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.deleteOne({_id:userId})
    return res.status(500).json({msg:"User deleted"})
  } catch (error) {
    return res.status(500).json({err: "Can't delete the user"});
  }
};


export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({users})
    } catch (error) {
        return res.status(400).json({err:"Can't get the users"});
    }
}