import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/auth.js";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    // Find user
    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};