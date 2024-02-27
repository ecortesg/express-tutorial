import { User } from "../model/User.js";

export async function getAllUsers(req, res) {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found." });
  res.json(users);
}

export async function deleteUser(req, res) {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID is required." });
  const user = await User.findById(req.body.id).exec();
  if (!user)
    return res
      .status(204)
      .json({ message: `No user matches ID ${req.body.id}.` });
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(user);
}
