import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product=mongoose.model('Product',productSchema)
export default Product