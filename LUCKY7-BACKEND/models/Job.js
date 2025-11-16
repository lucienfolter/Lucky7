// models/Job.js
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  title: { type: String, required: true },
  description: String,
  category: String,
  location: String,
  rate: Number,
  image: { url: String, publicId: String },
  status: { type: String, default: "active" }
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
