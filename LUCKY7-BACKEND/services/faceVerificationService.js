const axios = require('axios');
const FormData = require('form-data');

/**
 * Face Verification Service
 * Supports multiple providers: AWS Rekognition, Face++, Azure Face API
 */

// Option 1: Using Face++ API (recommended for simplicity)
exports.verifyFaceMatch = async (sourceImageUrl, targetImageUrl) => {
  try {
    const formData = new FormData();
    formData.append('api_key', process.env.FACE_API_KEY);
    formData.append('api_secret', process.env.FACE_API_SECRET);
    formData.append('image_url1', sourceImageUrl);
    formData.append('image_url2', targetImageUrl);

    const response = await axios.post(
      'https://api-us.faceplusplus.com/facepp/v3/compare',
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    const confidence = response.data.confidence || 0;
    const threshold = response.data.thresholds['1e-5'] || 80;

    return {
      isMatch: confidence >= threshold,
      confidence: Math.round(confidence),
      provider: 'FacePlusPlus'
    };
  } catch (error) {
    console.error('Face++ verification error:', error.response?.data || error.message);
    throw new Error('Face verification failed');
  }
};

// Option 2: Using AWS Rekognition
exports.verifyFaceMatchAWS = async (sourceImageUrl, targetImageUrl) => {
  try {
    const AWS = require('aws-sdk');
    
    const rekognition = new AWS.Rekognition({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1'
    });

    // Download images
    const sourceImage = await axios.get(sourceImageUrl, { responseType: 'arraybuffer' });
    const targetImage = await axios.get(targetImageUrl, { responseType: 'arraybuffer' });

    const params = {
      SourceImage: {
        Bytes: Buffer.from(sourceImage.data)
      },
      TargetImage: {
        Bytes: Buffer.from(targetImage.data)
      },
      SimilarityThreshold: 80
    };

    const result = await rekognition.compareFaces(params).promise();

    if (result.FaceMatches && result.FaceMatches.length > 0) {
      const match = result.FaceMatches[0];
      return {
        isMatch: true,
        confidence: Math.round(match.Similarity),
        provider: 'AWS Rekognition'
      };
    }

    return {
      isMatch: false,
      confidence: 0,
      provider: 'AWS Rekognition'
    };
  } catch (error) {
    console.error('AWS Rekognition error:', error);
    throw new Error('Face verification failed');
  }
};

// Option 3: Using Azure Face API
exports.verifyFaceMatchAzure = async (sourceImageUrl, targetImageUrl) => {
  try {
    const endpoint = process.env.AZURE_FACE_ENDPOINT;
    const apiKey = process.env.AZURE_FACE_API_KEY;

    // Detect faces in both images
    const detectFace = async (imageUrl) => {
      const response = await axios.post(
        `${endpoint}/face/v1.0/detect`,
        { url: imageUrl },
        {
          headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
            'Content-Type': 'application/json'
          },
          params: {
            returnFaceId: true
          }
        }
      );
      return response.data[0]?.faceId;
    };

    const sourceFaceId = await detectFace(sourceImageUrl);
    const targetFaceId = await detectFace(targetImageUrl);

    if (!sourceFaceId || !targetFaceId) {
      return {
        isMatch: false,
        confidence: 0,
        provider: 'Azure Face API',
        error: 'Face not detected in one or both images'
      };
    }

    // Verify faces
    const verifyResponse = await axios.post(
      `${endpoint}/face/v1.0/verify`,
      {
        faceId1: sourceFaceId,
        faceId2: targetFaceId
      },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    const confidence = Math.round(verifyResponse.data.confidence * 100);

    return {
      isMatch: verifyResponse.data.isIdentical,
      confidence: confidence,
      provider: 'Azure Face API'
    };
  } catch (error) {
    console.error('Azure Face API error:', error.response?.data || error.message);
    throw new Error('Face verification failed');
  }
};

// Mock verification for development/testing
exports.verifyFaceMatchMock = async (sourceImageUrl, targetImageUrl) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Random confidence between 75-95 for testing
  const confidence = Math.floor(Math.random() * (95 - 75 + 1)) + 75;

  return {
    isMatch: confidence >= 80,
    confidence: confidence,
    provider: 'Mock Service (Development)'
  };
};

// Export the appropriate service based on environment
module.exports = {
  verifyFaceMatch: 
    process.env.NODE_ENV === 'development' 
      ? exports.verifyFaceMatchMock 
      : exports.verifyFaceMatch, // Use Face++ by default
  verifyFaceMatchAWS: exports.verifyFaceMatchAWS,
  verifyFaceMatchAzure: exports.verifyFaceMatchAzure,
  verifyFaceMatchMock: exports.verifyFaceMatchMock
};