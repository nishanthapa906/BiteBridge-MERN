import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9000;
import connectDb from "./db/connect.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// Connect Database
connectDb();
// Application Setting
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());
// For static file
const publicPath = path.join(__dirname, "../../public/Images");
app.use("/image/", express.static(publicPath));
// Base Routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRoutes);
app.listen(PORT, () => {
  console.log(`App is running at port number ${PORT}.!`);
});
