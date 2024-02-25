import users from "../model/users.json" assert { type: "json" };
import fsPromises from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDB = {
  users,
  setUsers: function (data) {
    this.users = data;
  },
};

export async function handleNewUser(req, res) {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // Check for duplicate usernames in the db
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); // Conflict
  try {
    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // Store the new user
    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPwd,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
