import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const image = req.file.filename;
  const { name, email, password } = req.body;
  if (!image || !name || !email || !password) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "All Field most be filled !",
    });
  }
  let isExist = await User.findOne({ email: email });
  // console.log(isExist)
  if (isExist) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "User already exist !",
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    let userRes = new User({ name, email, password: hashPassword, image });
    userRes = await userRes.save();
    res.status(201).json({
      status: 201,
      success: true,
      message: "User Register Successfully !",
      user: userRes,
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
  export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All field required!",
      });
    }
    try {
      let resUser = await User.findOne({ email: email });
      if (!resUser) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "User Not Register!",
        });
      }
      const isMatch = await bcrypt.compare(password, resUser.password);
      if (!isMatch) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Credential not Match!",
        });
      }
      const token = jwt.sign(
        {
          id: resUser._id,
          email: resUser.email,
          role: resUser.role,
        },
        "jhgsvuwhefgrwouyfuiuyoihbiuwbhefowubevouybrvuybvowuebfye",
        {
          expiresIn: "5d",
        },
      );
      
      // todo
      // 1. send cookie to client
      // 2. secure: true, sameSite: 'none' is important for Render/Deployment
      res.cookie("jwt_token", token, {
        httpOnly: true,
        secure: true, // required for sameSite: 'none'
        sameSite: 'none',
        maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
      }).status(200).json({
        status: 200,
        success: true,
        message: "User Login Successfully!",
        user: resUser,
        token,
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

export const logout = (req, res) => {
  try {
    // todo
    // 1. clear cookie from client
    res.clearCookie("jwt_token", {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    }).status(200).json({
      status: 200,
      success: true,
      message: "User Logout Successfully !",
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

export const getMe = (req, res) => {
  // console.log(req.users);
  res.status(200).json({
    status: 200,
    success: true,
    message: "User Found Successfully!",
    user: req.users,
  });
};

// Register
// login
// token=d ,email,
export const getUser = (req, res) => {};
