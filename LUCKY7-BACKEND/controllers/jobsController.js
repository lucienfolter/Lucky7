const path = require('path');
const Job = require("../models/Job");
const User = require("../models/User");

// Create Job with Image
exports.createJob = async (req, res) => {
  try {
    let image = {};
    if (req.file) {
      const filename = path.basename(req.file.path);
      image = { 
        url: `/uploads/${filename}`, 
        path: req.file.path 
      };
    }

    const job = await Job.create({
      employer: req.user.id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      rate: req.body.rate,
      duration: req.body.duration,
      date: req.body.date,
      urgent: req.body.urgent === 'true' || req.body.urgent === true,
      image
    });

    // Populate employer info
    await job.populate('employer', 'fullName email');

    res.json({ success: true, job });
  } catch (err) {
    console.error('Create job error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('employer', 'fullName email companyName')
      .populate('applications.employee', 'fullName email phone')
      .sort({ createdAt: -1 });
    
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Jobs by Employer
exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id })
      .populate('applications.employee', 'fullName email phone skills experience')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Apply for Job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { message } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check if already applied
    const alreadyApplied = job.applications.some(
      app => app.employee.toString() === req.user.id
    );

    if (alreadyApplied) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already applied for this job' 
      });
    }

    job.applications.push({
      employee: req.user.id,
      message: message || '',
      status: 'pending'
    });

    await job.save();
    await job.populate('applications.employee', 'fullName email phone');

    res.json({ 
      success: true, 
      message: 'Application submitted successfully',
      job 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Application Status (Employer only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { jobId, applicationId } = req.params;
    const { status } = req.body;

    const job = await Job.findOne({ 
      _id: jobId, 
      employer: req.user.id 
    });

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found or unauthorized' 
      });
    }

    const application = job.applications.id(applicationId);
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    application.status = status;
    await job.save();

    res.json({ 
      success: true, 
      message: `Application ${status}`,
      application 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ 
      _id: req.params.id,
      employer: req.user.id 
    });

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found or unauthorized' 
      });
    }

    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};