import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const url = process.env.MONGO_URI || "mongodb://localhost:27017/H58_Curd";
    await mongoose.connect(url);
    console.log("Database is Connected Successfully!");
  } catch (error) {
    console.log("Error while connecting database", error);
  }
};
export default connectDb;
