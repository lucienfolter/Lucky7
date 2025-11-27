const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  createJob,
  getAllJobs,
  getEmployerJobs,
  applyForJob,
  updateApplicationStatus,
  deleteJob
} = require("../controllers/jobsController");

// Public routes
router.get("/", getAllJobs);

// Protected routes (require authentication)
router.post("/", auth, upload.single("image"), createJob);
router.get("/my-jobs", auth, getEmployerJobs);
router.post("/:jobId/apply", auth, applyForJob);
router.put("/:jobId/applications/:applicationId", auth, updateApplicationStatus);
router.delete("/:id", auth, deleteJob);

module.exports = router;