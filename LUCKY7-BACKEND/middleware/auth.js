const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Remove "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;  // 🔥 SETS req.user CORRECTLY
    next();

  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

