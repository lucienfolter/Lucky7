// routes/upload.js
const router = require("express").Router();
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const localPath = req.file.path;
    const result = await cloudinary.uploader.upload(localPath, { folder: "dailywage/jobs", resource_type: "image", quality: "auto" });
    // delete local file
    fs.unlink(localPath, () => {});
    return res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
