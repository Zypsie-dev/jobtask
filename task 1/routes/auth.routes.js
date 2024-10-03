const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/AuthController");
const User = require("../models/user.model");
const router = express.Router();

// @route   POST /api/register
// @desc    Register a new user
router.post(
  "/register",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  authController.registerUser
);

// @route   POST /api/login
// @desc    Log in a user
router.post("/login", authController.loginUser);

// @route   POST /api/reset-password
// @desc    Generate password reset token and send email
router.post("/reset-password", authController.requestPasswordReset);

// @route   POST /api/reset-password/:token
// @desc    Reset password
router.post("/reset-password/:token", authController.resetPassword);
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "firstName lastName email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;
