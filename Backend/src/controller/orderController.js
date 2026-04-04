import Order from "../models/orderModel.js";
export const createOrder = async (req, res) => {
  // todo
  // 1. Get order data from req.body and id from req.users._id
  // 2. Check if all required fields are present
  // 3. Create that order in database
  // 4. Return suitable response with message and order details

  const { totalItem, totalPrice, orderItems } = req.body;
  const id = req.users?._id;

  if (!totalItem && totalItem !== 0) {
    return res.status(400).json({ status: 400, success: false, message: "totalItem is required." });
  }
  if (!totalPrice && totalPrice !== 0) {
    return res.status(400).json({ status: 400, success: false, message: "totalPrice is required." });
  }
  if (!orderItems || !orderItems.length) {
    return res.status(400).json({ status: 400, success: false, message: "orderItems must be a non-empty array." });
  }
  if (!id) {
    return res.status(400).json({ status: 400, success: false, message: "User ID not found in session." });
  }

  try {
    let orderRes = await Order.create({
      totalItem,
      totalPrice,
      orderItems,
      user: id,
    });
    res.status(201).json({
      status: 201,
      success: true,
      message: "Order created successfully!",
      orders: orderRes,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};



export const getMyOrder = async (req, res) => {
  const id = req.users._id;

  // console.log(id)
  try {
    let orderList = await Order.find({ user: id });
    if (orderList.length < 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Order Not Found",
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "Order Found!",
      orders: orderList,
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

export const updatePaymentStatus = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return;
  }
  let orderData = await Order.findByIdAndUpdate(
    { _id: id },
    { paymentStatus: "paid" },
    { new: true },
  );
  res.status(200).json({
    message: "order updated",
    orderData,
  });
};
