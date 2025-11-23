require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

// Import Routes
const verificationRoutes = require("./routes/verification");
const uploadRoutes = require("./routes/upload");
const jobsRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const messagesRoutes = require("./routes/messages");

// Message Model
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  }
});

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

// Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ⭐ Enable serving uploaded images
app.use("/uploads", express.static("uploads"));
app.use("/api/profile", profileRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/verification", verificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messagesRoutes);

// Health Check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// ===============================
// SOCKET.IO AUTHENTICATION
// ===============================
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) return next(new Error("Authentication error"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

// ===============================
// SOCKET.IO EVENTS
// ===============================
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.userId}`);

  onlineUsers.set(socket.userId, socket.id);

  io.emit("userOnline", { userId: socket.userId });

  socket.join(socket.userId);

  // Send Message
  socket.on("sendMessage", async (data) => {
    try {
      const { receiverId, message } = data;
      const senderId = socket.userId;

      const conversationId = Message.getConversationId(senderId, receiverId);

      const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
        conversationId
      });

      await newMessage.populate("senderId", "fullName profilePicture");

      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", newMessage);
      }

      socket.emit("messageSent", newMessage);

    } catch (err) {
      socket.emit("messageError", { error: err.message });
    }
  });

  // Typing
  socket.on("typing", (data) => {
    const receiverSocketId = onlineUsers.get(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTyping", { senderId: socket.userId });
    }
  });

  socket.on("stopTyping", (data) => {
    const receiverSocketId = onlineUsers.get(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userStoppedTyping", { senderId: socket.userId });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.userId}`);
    onlineUsers.delete(socket.userId);
    io.emit("userOffline", { userId: socket.userId });
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
