import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controller/productController.js";
import upload from "../middleware/upload.js";

const productRouter = express.Router();

productRouter.post("/createProduct", upload.single("image"), createProduct);
productRouter.get("/getProduct", getProduct);
productRouter.delete("/deleteProduct/:id", deleteProduct);
productRouter.put("/updateProduct/:id",upload.single("image"), updateProduct);

export default productRouter;


// http://localhost:9000/api/product/updateProduct/id
// http://localhost:9000/api/product/createProduct
// http://localhost:9000/api/product/deleteProduct/id
// http://localhost:9000/api/product/getProduct