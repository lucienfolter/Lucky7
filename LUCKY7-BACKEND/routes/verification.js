const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  uploadDocument,
  uploadSelfie,
  verifyFaceMatch,
  getVerificationStatus
} = require("../controllers/verificationController");

router.post("/upload-document", auth, upload.single("document"), uploadDocument);
router.post("/upload-selfie", auth, upload.single("selfie"), uploadSelfie);
router.post("/verify-face", auth, verifyFaceMatch);
router.get("/status", auth, getVerificationStatus);

module.exports = router;
