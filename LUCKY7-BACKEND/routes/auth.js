const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// Register User
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;

    const user = await User.create({
      fullName,
      email,
      phone,
      password,
      role,  // <--- important
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      token,
      user: user.getPublicProfile(),
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      token,
      user: user.getPublicProfile(),
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
