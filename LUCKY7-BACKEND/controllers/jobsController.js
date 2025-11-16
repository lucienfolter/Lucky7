const cloudinary = require("../config/cloudinary");
const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    let image = {};
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "jobs"
      });
      image = { url: result.secure_url, publicId: result.public_id };
    }

    const job = await Job.create({
      employer: req.user.id, // requires auth middleware
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      rate: req.body.rate,
      image
    });

    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
