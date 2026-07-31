import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Node Version:", process.version);
console.log("MongoDB URI:", process.env.MONGODB_URI);

async function testConnection() {
  try {
    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection Failed");
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    console.error(err);
    process.exit(1);
  }
}

testConnection();