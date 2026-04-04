import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/connect.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9000;

// Connect Database
connectDb();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://bitebridge-mern-fl4c.onrender.com",
      "https://bitebridge-mern-admin.onrender.com"
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/image/", express.static(path.join(__dirname, "../public/Images")));


// Base Routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
