/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const login = async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username: username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(400).json({ error: "invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    name: user.name,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response.send({
    token: token,
    username: user.username,
    name: user.name,
    userId: user._id,
  });
};

export default login;
