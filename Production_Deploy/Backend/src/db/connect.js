import mongoose from "mongoose";

const connectDb = async () => {
  // PASTE YOUR MONGODB ATLAS URL BELOW:
  const mongoUri = ""; 

  if (!mongoUri) {
    console.error("PLEASE PASTE YOUR MONGODB ATLAS URL in Production_Deploy/Backend/src/db/connect.js");
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Database is Connected Successfully!");
  } catch (error) {
    console.log("Error while connecting database", error);
  }
};

export default connectDb;
