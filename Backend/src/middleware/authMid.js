import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const authMid = async (req, res, next) => {
  const token = req.cookies.jwt_token;
  if (!token) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Token Not Provided !",
    });
  }
  let user = jwt.verify(
    token,
    "jhgsvuwhefgrwouyfuiuyoihbiuwbhefowubevouybrvuybvowuebfye",
  );

  try {
    const resUser = await User.findById({ _id: user.id });
    if (!resUser) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User Not Not Found!",
      });
    }
    req.users = resUser;
      // console.log(req.users )

    next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error!",
      error,
    });
  }
};
