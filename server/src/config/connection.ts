import mongoose from "mongoose"; // Import mongoose
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks");

const db = mongoose.connection; // Get the active connection instance

db.on("error", (err) => console.error("MongoDB connection error:", err)); // Error handler
db.once("open", () => {
  console.log("MongoDB connected successfully");
}); // Success handler

export default db; // Export the active connection instance
