import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/User.js";

export async function handleLogin(req, res) {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: user }).exec();

  if (!foundUser) return res.sendStatus(401);

  // Evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);

    // Create JWTs
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Saving refresh token with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // Send refresh token as an httpOnly cookie since it is much safer than storing it in localstorage in the front end
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true, // Uncomment for production
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
}
