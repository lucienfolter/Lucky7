const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

// Single image upload
router.post("/single", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  res.json({
    success: true,
    fileUrl: `/uploads/${req.file.filename}`,
  });
});

// Multiple image upload (optional)
router.post("/multiple", upload.array("images", 5), (req, res) => {
  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded",
    });
  }

  const files = req.files.map((file) => `/uploads/${file.filename}`);

  res.json({
    success: true,
    files,
  });
});

module.exports = router;

