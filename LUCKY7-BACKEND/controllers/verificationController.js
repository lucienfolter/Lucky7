const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
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

    const file = req.files.document;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'dailywage/verification/documents',
      resource_type: 'image',
      transformation: [
        { width: 1000, height: 1000, crop: 'limit' },
        { quality: 'auto' }
      ]
    });

    // Update user verification
    const user = await User.findById(req.user.id);
    user.verification.documentType = documentType;
    user.verification.documentImage = {
      url: result.secure_url,
      publicId: result.public_id
    };
    user.verification.status = 'pending';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Document uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id
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

    const file = req.files.selfie;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'dailywage/verification/selfies',
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'fill', gravity: 'face' },
        { quality: 'auto' }
      ]
    });

    // Update user verification
    const user = await User.findById(req.user.id);
    user.verification.selfieImage = {
      url: result.secure_url,
      publicId: result.public_id
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