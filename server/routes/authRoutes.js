const express = require("express");
const rateLimit = require("express-rate-limit");

const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many authentication attempts. Please try again later." },
});

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);

module.exports = router;