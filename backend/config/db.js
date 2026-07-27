import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log("URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);

    if (error.cause) {
      console.error("Cause:", error.cause);
    }

    console.error(error);

    process.exit(1);
  }
};

export default connectDB;