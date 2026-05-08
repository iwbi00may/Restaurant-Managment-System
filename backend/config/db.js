import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URL:", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);

    console.log("Database connected ");
  } catch (error) {
    console.log("Database connection error ", error.message);
    process.exit(1); // stop server if DB fails
  }
};
