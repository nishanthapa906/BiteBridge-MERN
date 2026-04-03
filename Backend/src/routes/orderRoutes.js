import express from "express";
import {
  createOrder,
  getMyOrder,
  updatePaymentStatus,
} from "../controller/orderController.js";
import { authMid } from "../middleware/authMid.js";

const orderRoutes = express.Router();

orderRoutes.post("/create", authMid, createOrder);
orderRoutes.get("/get",authMid,getMyOrder);
orderRoutes.put("/updatePaymentStatus/:id", updatePaymentStatus);

export default orderRoutes;
