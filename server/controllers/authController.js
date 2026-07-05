const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ----------------------------------
   Generate JWT Token
----------------------------------- */

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

/* ----------------------------------
   Register User
----------------------------------- */

const registerUser = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",

      token: generateToken(user._id),

      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
};

/* ----------------------------------
   Login User
----------------------------------- */

const loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const user =
      await User.findOne({
        email,
      }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    const isMatch =
      await user.comparePassword(
        password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Login successful",

      token: generateToken(user._id),

      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};