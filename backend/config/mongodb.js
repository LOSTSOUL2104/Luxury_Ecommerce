import mongoose from "mongoose";

console.log("MONGODB_URI is:", process.env.MONGODB_URI);

const connectDB = async () => {
  // Connection options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    maxPoolSize: 10, // Maintain up to 10 socket connections
    minPoolSize: 5, // Maintain at least 5 socket connections
    maxIdleTimeMS: 60000, // Close idle connections after 60 seconds
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  };

  // Connection event handlers
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected Successfully 🟢");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error: 🔴", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected 🔴");
  });

  // Handle application termination
  process.on("SIGINT", async () => {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    } catch (err) {
      console.error("Error during MongoDB disconnection:", err);
      process.exit(1);
    }
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI, options);
  } catch (err) {
    console.error("Failed to connect to MongoDB: 🔴", err.message);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
