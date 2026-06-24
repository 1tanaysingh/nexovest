import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/auth.js";
export const signup = async (req, res) => {
  const { email, password, dob } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      dob,
    });

    res.send("User created");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};
