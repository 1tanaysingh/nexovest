import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { saveFavcrypto } from "./controller/cryptofav.js";
import { saveFavStocks } from "./controller/stocksfav.js";
import { signup } from "./auth/signup.js";
import { login } from "./auth/login.js";
import { token } from "./middleware/token.js";
import { sendFavCrypto } from "./controller/sendfavcrypto.js";
import { sendFavStocks } from "./controller/sendfavstocks.js";
import { getNews } from "./controller/news.js";
dotenv.config();

const app = express();
app.use(express.json());

// Middleware
app.use(
  cors({
    origin: [
      // "http://localhost:5173",
      "https://nexovest-frontend3.onrender.com",
    ],
    credentials: true,
  }),
);

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.log("❌ MongoDB Error:", err.message);
  }
};

connectDB();

// Routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/savefavcrypto", token, saveFavcrypto);
app.post("/savefavstocks", token, saveFavStocks);
app.get("/sendfavcrypto", token,sendFavCrypto);
app.get("/sendfavstocks", token, sendFavStocks);
app.get("/news/:id", getNews);

export default app;

