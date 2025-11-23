const router = require("express").Router();
const auth = require("../middleware/auth");
const { 
  getConversations, 
  getMessages, 
  sendMessage 
} = require("../controllers/messagesController");

router.get("/conversations", auth, getConversations);
router.get("/:otherUserId", auth, getMessages);
router.post("/send", auth, sendMessage);

module.exports = router;