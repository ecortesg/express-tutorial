import users from "../model/users.json" assert { type: "json" };
import bcrypt from "bcrypt";

const usersDB = {
  users,
  setUsers: function (data) {
    this.users = data;
  },
};

export async function handleLogin(req, res) {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const foundUser = usersDB.users.find((person) => person.username === user);
    if (!foundUser) return res.sendStatus(401); // Unauthorized
    // Evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      // Create JWTs
      res.status(200).json({ success: `User ${user} is logged in.` });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
