const path = require('path');
const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    let image = {};
    if (req.file) {
      // Multer stores file in uploads/ with filename created by middleware
      const filename = path.basename(req.file.path);
      image = { url: `/uploads/${filename}`, path: req.file.path };
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
