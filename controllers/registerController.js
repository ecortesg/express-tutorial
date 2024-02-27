import bcrypt from "bcrypt";
import { User } from "../model/User.js";

export async function handleNewUser(req, res) {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // Check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // Create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    res.status(201).json({ success: `New user ${user} created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
