const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  skills: [String],

  location: { type: String, required: true },
  rate: Number,
  duration: String,

  date: String,
  urgent: { type: Boolean, default: false },

  image: {
    url: String,
    publicId: String
  },

  status: {
    type: String,
    default: "open"
  }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);

