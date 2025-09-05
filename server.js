const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/product");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

let isDbReady = false;
async function connectDB() {
  if (isDbReady || mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
  isDbReady = true;
  console.log("DB connection successful");
}
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
  } catch (e) {
    console.error("DB error:", e);
  }
  next();
});

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Hello! Your backend server is running!",
    data: {
      name: "e-commerce-backend data",
      class: "feb 2025",
      efficiency: "beginner",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

module.exports = (req, res) => app(req, res);
