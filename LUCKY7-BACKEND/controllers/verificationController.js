const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const { verifyFaceMatch } = require('../services/faceVerificationService');

// @desc    Upload ID document
// @route   POST /api/verification/upload-document
// @access  Private
exports.uploadDocument = async (req, res) => {
  try {
    const { documentType } = req.body;
    
    if (!req.files || !req.files.document) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a document'
      });
    }

    // Support both multer (req.file) and express-fileupload (req.files.document)
    let file = null;
    let sourcePath = null;
    let originalName = 'document.jpg';
    if (req.file) {
      file = req.file;
      sourcePath = req.file.path;
      originalName = req.file.originalname || req.file.filename;
    } else if (req.files && req.files.document) {
      file = req.files.document;
      sourcePath = file.tempFilePath;
      originalName = file.name || originalName;
    }

    // Save locally in uploads/verification/documents
    const destDir = path.join(__dirname, '..', 'uploads', 'verification', 'documents');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const filename = Date.now() + '_' + originalName.replace(/\s+/g, '_');
    const destPath = path.join(destDir, filename);
    // move/copy file to uploads directory
    fs.renameSync(sourcePath, destPath);

    // Update user verification
    const user = await User.findById(req.user.id);
    user.verification.documentType = documentType;
    user.verification.documentImage = {
      url: `/uploads/verification/documents/${filename}`,
      publicId: null
    };
    user.verification.status = 'pending';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Document uploaded successfully',
      data: {
        url: `/uploads/verification/documents/${filename}`,
        publicId: null
      }
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Document upload failed',
      error: error.message
    });
  }
};

// @desc    Upload selfie
// @route   POST /api/verification/upload-selfie
// @access  Private
exports.uploadSelfie = async (req, res) => {
  try {
    if (!req.files || !req.files.selfie) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a selfie'
      });
    }

    // Support both multer (req.file) and express-fileupload (req.files.selfie)
    let selfieFile = null;
    let selfieSource = null;
    let selfieOriginal = 'selfie.jpg';
    if (req.file) {
      selfieFile = req.file;
      selfieSource = req.file.path;
      selfieOriginal = req.file.originalname || req.file.filename;
    } else if (req.files && req.files.selfie) {
      selfieFile = req.files.selfie;
      selfieSource = selfieFile.tempFilePath;
      selfieOriginal = selfieFile.name || selfieOriginal;
    }

    // Save locally in uploads/verification/selfies
    const destDir = path.join(__dirname, '..', 'uploads', 'verification', 'selfies');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const filename = Date.now() + '_' + selfieOriginal.replace(/\s+/g, '_');
    const destPath = path.join(destDir, filename);
    fs.renameSync(selfieSource, destPath);

    // Update user verification
    const user = await User.findById(req.user.id);
    user.verification.selfieImage = {
      url: `/uploads/verification/selfies/${filename}`,
      publicId: null
    };
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Selfie uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id
      }
    });
  } catch (error) {
    console.error('Selfie upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Selfie upload failed',
      error: error.message
    });
  }
};

// @desc    Verify face match
// @route   POST /api/verification/verify-face
// @access  Private
exports.verifyFaceMatch = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.verification.documentImage || !user.verification.selfieImage) {
      return res.status(400).json({
        success: false,
        message: 'Please upload both document and selfie first'
      });
    }

    // Call face verification service (AWS Rekognition, Face++, etc.)
    const verificationResult = await verifyFaceMatch(
      user.verification.documentImage.url,
      user.verification.selfieImage.url
    );

    // Update verification status based on result
    if (verificationResult.isMatch && verificationResult.confidence >= 80) {
      user.verification.status = 'verified';
      user.verification.verifiedAt = Date.now();
      user.verification.faceMatchConfidence = verificationResult.confidence;
      
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Verification successful! Your identity has been verified.',
        verified: true,
        confidence: verificationResult.confidence,
        data: {
          status: 'verified',
          verifiedAt: user.verification.verifiedAt
        }
      });
    } else {
      user.verification.status = 'rejected';
      user.verification.rejectionReason = 'Face match failed. Please try again with clearer photos.';
      
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Verification failed. Face match confidence too low.',
        verified: false,
        confidence: verificationResult.confidence,
        data: {
          status: 'rejected',
          reason: user.verification.rejectionReason
        }
      });
    }
  } catch (error) {
    console.error('Face verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification process failed',
      error: error.message
    });
  }
};

// @desc    Get verification status
// @route   GET /api/verification/status
// @access  Private
exports.getVerificationStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        status: user.verification.status,
        documentType: user.verification.documentType,
        verifiedAt: user.verification.verifiedAt,
        rejectionReason: user.verification.rejectionReason,
        confidence: user.verification.faceMatchConfidence
      }
    });
  } catch (error) {
    console.error('Get verification status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get verification status',
      error: error.message
    });
  }
};

// @desc    Admin: Approve/Reject verification
// @route   PUT /api/verification/admin/:userId
// @access  Private/Admin
exports.adminUpdateVerification = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.verification.status = status;
    if (status === 'verified') {
      user.verification.verifiedAt = Date.now();
    } else if (status === 'rejected') {
      user.verification.rejectionReason = rejectionReason;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: `Verification ${status} successfully`,
      data: user.verification
    });
  } catch (error) {
    console.error('Admin verification update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update verification status',
      error: error.message
    });
  }
};