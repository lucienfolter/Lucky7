const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getEmployerJobs,
  applyJob,
  getApplicationsForEmployer,
} = require("../controllers/jobsController");

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

// CREATE JOB (with image upload)
router.post("/create", auth, upload.single("image"), createJob);

// GET ALL JOBS
router.get("/", getAllJobs);

// EMPLOYER'S JOBS
router.get("/employer/:employerId", auth, getEmployerJobs);

// APPLY JOB
router.post("/apply/:jobId", auth, applyJob);

// APPLICATION LIST
router.get("/applications/:employerId", auth, getApplicationsForEmployer);

module.exports = router;
