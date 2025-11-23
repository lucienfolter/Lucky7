const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  rate: String,
  duration: String,
  location: String,
  date: String,
  urgent: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
