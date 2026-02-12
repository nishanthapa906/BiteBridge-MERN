import Product from "../models/productModel.js";
export const createProduct = async (req, res) => {
  const image = req.file.filename;
  const { title, price } = req.body;
  //   console.log(title, price, image);
  // todo
  //1.collect data
  //2.check the data is empty or not
  //3.if empty then return suitable message
  //4. then save the data to the database
  //5. return suitable message and response
  if (!title || !price || !image) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "All field Most be given .",
    });
  }
  const titleRes = await Product.findOne({ title: title });
  if (titleRes) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error while saving data .",
    });
  }
  try {
    let productRes = new Product({ title, price, image });
    productRes = await productRes.save();
    if (!productRes) {
      return res.status(500).json({
        status: 500,
        success: true,
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
    res.status(500).json({
      status: 500,
      success: true,
      message: "Internal Error",
      error: error,
    });
  }
};

export const getProduct = async (req, res) => {
  // todo
  // query the database
  // check the data , empty or not
  // if data is present then return the data with suitable message
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
  // todo
  // get id of that product
  // then find and delete that product
  // return suitable message
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
  // Get id of that product and New data
  // check empty or not
  //  find and update that product
  // return suitable message

  const image = req.file.filename;
  const { id } = req.params;
  const { title, price } = req.body;

  if (!id || !title ||!price) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Id or data Not  provided.",
    });
  }
  try {
    let productRes = await Product.findByIdAndUpdate(
      { _id: id },
      { image, title, price },
      {
        new: true,
      },
    );
    res.status(200).json({
      status: 200,
      success: true,
      message: "Product is Updated .",
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
