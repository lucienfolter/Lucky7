const Message = require('../models/Message');
const User = require('../models/User');

// Get Conversations
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get unique conversation IDs
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$message' },
          lastMessageTime: { $first: '$createdAt' },
          senderId: { $first: '$senderId' },
          receiverId: { $first: '$receiverId' },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $eq: ['$receiverId', userId] },
                  { $eq: ['$read', false] }
                ]},
                1,
                0
              ]
            }
          }
        }
      },
      {
        $sort: { lastMessageTime: -1 }
      }
    ]);

    // Populate user details
    const conversations = await Promise.all(
      messages.map(async (msg) => {
        const otherUserId = msg.senderId.toString() === userId.toString() 
          ? msg.receiverId 
          : msg.senderId;
        
        const otherUser = await User.findById(otherUserId)
          .select('fullName email role profilePicture');

        return {
          conversationId: msg._id,
          otherUser,
          lastMessage: msg.lastMessage,
          lastMessageTime: msg.lastMessageTime,
          unreadCount: msg.unreadCount
        };
      })
    );

    res.json({ success: true, conversations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Messages in a Conversation
exports.getMessages = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const userId = req.user.id;

    const conversationId = Message.getConversationId(userId, otherUserId);

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .limit(100);

    // Mark messages as read
    await Message.updateMany(
      { 
        conversationId,
        receiverId: userId,
        read: false
      },
      { 
        read: true,
        readAt: new Date()
      }
    );

    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Send Message (Called by Socket.IO as well)
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id;

    const conversationId = Message.getConversationId(senderId, receiverId);

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
      conversationId
    });

    // Populate sender info
    await newMessage.populate('senderId', 'fullName profilePicture');

    res.json({ success: true, message: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};