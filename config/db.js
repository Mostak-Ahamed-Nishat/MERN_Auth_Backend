import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Database connection error:", err));
};

export default dbConnection;
