const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Check if MongoDB URI exists in .env
const MONGO_URI = process.env.MONGO_URI;
let isDatabaseConnected = false;

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB Atlas");
      isDatabaseConnected = true;
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      console.log("Running in TEST MODE (DB connection skipped)");
    });
} else {
  console.log("No MongoDB URI found — running in TEST MODE (in-memory data only)");
}

// Temporary in-memory storage (used only in test mode)
const users = [];

// Root route
app.get("/", (req, res) => {
  if (isDatabaseConnected) {
    res.send("Server is live and connected to MongoDB Atlas!");
  } else {
    res.send("Server is live (MongoDB connection skipped — running in test mode)");
  }
});

// Register route
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (isDatabaseConnected) {
    // MongoDB mode
    try {
      const User = mongoose.model(
        "User",
        new mongoose.Schema({
          name: String,
          email: { type: String, unique: true },
          password: String,
          role: String,
        })
      );

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = new User({ name, email, password, role });
      await newUser.save();

      return res.status(201).json({
        message: "User registered successfully (MongoDB mode)",
        user: { name, email, role },
      });
    } catch (err) {
      console.error("Register Error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    // In-memory mode
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists (testing mode)" });
    }

    users.push({ name, email, password, role });
    return res.status(201).json({
      message: "User registered successfully (testing mode)",
      user: { name, email, role },
    });
  }
});

// Login route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (isDatabaseConnected) {
    // MongoDB mode
    try {
      const User = mongoose.model("User");
      const foundUser = await User.findOne({ email, password });
      if (!foundUser) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.status(200).json({
        message: "Login successful (MongoDB mode)",
        user: {
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
        },
        token: "fake-jwt-token-" + Math.random().toString(36).substr(2, 10),
      });
    } catch (err) {
      console.error("Login Error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    // In-memory mode
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials (testing mode)" });
    }

    return res.status(200).json({
      message: "Login successful (testing mode)",
      user: {
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      },
      token: "fake-jwt-token-" + Math.random().toString(36).substr(2, 10),
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});
