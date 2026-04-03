import Order from "../models/orderModel.js";
export const createOrder = async (req, res) => {
  const { totalItem, totalPrice, orderItems } = req.body;
  const id = req.users._id;

  if (!totalItem || !totalPrice || !orderItems || !id) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "All field Most be given .",
    });
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
      message: "order is Created successfully!",
      orders: orderRes,
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
