import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();
const PORT = 9000;

import connectDb from "./db/connect.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Connect Database
connectDb();

// Application Setting
app.use(express.json());
app.use(cors(
  {
    origin:["http://localhost:5173" , "http://localhost:5174"],
    credentials: true
  }
));  //allow for specif Frontend only

app.use(cookieParser())

//for static file
app.use("/image/",express.static('./public/Images'))

// Base Routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log(`App is running at port number ${PORT}.!`);
});
