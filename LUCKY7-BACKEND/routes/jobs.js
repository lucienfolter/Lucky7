const router = require("express").Router();
const upload = require("../middleware/upload");
const {
  createJob
} = require("../controllers/jobsController");

router.post("/create", upload.single("image"), createJob);

module.exports = router;
