const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Plumbing', 'Electrical', 'Carpentry', 'House Cleaning', 'Appliance Repair', 'Painting', 'Others']
  },
  description: {
    type: String,
    required: true
  },
  rate: {
    type: String,
    required: true
  },
  duration: String,
  location: {
    type: String,
    required: true
  },
  date: String,
  urgent: {
    type: Boolean,
    default: false
  },
  image: {
    url: String,
    path: String
  },
  applications: [{
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    message: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);