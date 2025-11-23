const Job = require("../models/Job");
const Application = require("../models/Application");

// CREATE JOB (LOCAL UPLOAD)
exports.createJob = async (req, res) => {
  try {
    let image = null;

    if (req.file) {
      image = {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename
      };
    }

    const job = await Job.create({
      employerId: req.user._id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
        ? req.body.category.charAt(0).toUpperCase() + req.body.category.slice(1)
        : "",

      rate: req.body.rate,
      duration: req.body.duration,
      location: req.body.location,
      date: req.body.date,
      urgent: req.body.urgent === "true" || req.body.urgent === true,

      image
    });

    res.json({ success: true, job });
  } catch (err) {
    console.error("JOB CREATE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL JOBS
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET EMPLOYER JOBS
exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.params.employerId });
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// APPLY JOB
exports.applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const application = await Application.create({
      jobId: job._id,
      employerId: job.employerId,
      employeeId: req.user._id,
      coverLetter: req.body.coverLetter || "",
      proposedRate: req.body.proposedRate || job.rate
    });

    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET EMPLOYER APPLICATIONS
exports.getApplicationsForEmployer = async (req, res) => {
  try {
    const applications = await Application.find({ employerId: req.params.employerId })
      .populate("jobId")
      .populate("employeeId");

    res.json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
