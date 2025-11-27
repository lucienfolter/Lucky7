// routes/upload.js
const router = require("express").Router();
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require('path');

router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const localPath = req.file.path;
    const filename = path.basename(localPath);
    // Keep the local file so it's available via /uploads static route
    return res.json({ url: `/uploads/${filename}`, publicId: null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
