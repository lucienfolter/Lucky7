const User = require("../models/User");

// GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({ success: true, user: updated });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
