const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getMyProfile,
  updateProfile
} = require("../controllers/profileController");

// Get my profile
router.get("/me", auth, getMyProfile);

// Update profile
router.put("/update", auth, updateProfile);

module.exports = router;
