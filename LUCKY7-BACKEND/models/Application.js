const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  coverLetter: String,
  proposedRate: Number,
  appliedAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: Date,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Application", applicationSchema);
