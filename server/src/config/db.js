const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log("⚠️ Skipping MongoDB connection — no URI found (Testing Mode Active)");
    return;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("⚠️ Running in No-Database Mode...");
  }
};

module.exports = connectDB;
