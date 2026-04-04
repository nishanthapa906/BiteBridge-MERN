import Product from "../models/productModel.js";
export const createProduct = async (req, res) => {
  // todo
  // 1. Get title and price from req.body and image from req.file
  // 2. Check if all required fields are present
  // 3. Check if product with same title already exists
  // 4. Save the product to database
  // 5. Return success response or handle error

  try {
    const { title, price } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !price || !image) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All fields must be provided.",
      });
    }

    const titleRes = await Product.findOne({ title: title });
    if (titleRes) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product with this title already exists.",
      });
    }

    let productRes = new Product({ title, price, image });
    productRes = await productRes.save();
    
    if (!productRes) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Error while saving data!",
      });
    }
    
    res.status(201).json({
      status: 201,
      success: true,
      message: "Product is Created successfully!",
      product: productRes,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      status: 500,
      success: false, 
      message: "Internal Error",
      error: error.message || error,
    });
  }
};


export const getProduct = async (req, res) => {
  try {
    let productRes = await Product.find();
    if (!productRes) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product Not Found",
        product: productRes,
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "Product Found!",
      product: productRes,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error!",
      error,
    });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ status: 400, success: false, message: "Id is Not provided." });
  }
  try {
    let productRes = await Product.findByIdAndDelete({ _id: id });
    res.status(200).json({
      status: 200,
      success: true,
      message: "Product is Deleted .",
      product: productRes,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error!",
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  // todo
  // 1. Get id of that product and new data from body
  // 2. Check if new image is uploaded or not
  // 3. Find and update that product in database
  // 4. Return suitable message to client

  try {
    const { id } = req.params;
    const { title, price } = req.body;
    let updateData = { title, price };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    if (!id || !title || !price) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "ID, Title, and Price are required.",
      });
    }

    let productRes = await Product.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    if (!productRes) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product updated successfully.",
      product: productRes,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};


