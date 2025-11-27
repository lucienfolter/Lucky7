import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Sidebar from "../Components/Sidebar";

export default function EmployeeMessages() {
  const { t } = useTranslation();
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const [conversations] = useState([
    {
      id: 1,
      name: "Ramesh Kumar",
      role: "Employer",
      lastMessage: "Can you come tomorrow at 10 AM?",
      time: "2 min ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Employer",
      lastMessage: "Great work! Payment has been sent.",
      time: "1 hour ago",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Employer",
      lastMessage: "What's your availability for next week?",
      time: "5 hours ago",
      unread: 1,
      online: true
    }
  ]);

  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: "them", text: "Hi! I saw your profile. Are you available for plumbing work?", time: "10:30 AM" },
      { id: 2, sender: "me", text: "Hello! Yes, I'm available. What kind of work do you need?", time: "10:32 AM" },
      { id: 3, sender: "them", text: "I need kitchen sink repair and some pipe work.", time: "10:35 AM" },
      { id: 4, sender: "me", text: "I can help with that. When would you like me to come?", time: "10:40 AM" },
      { id: 5, sender: "them", text: "Can you come tomorrow at 10 AM?", time: "10:45 AM" }
    ],
    2: [
      { id: 1, sender: "them", text: "Thank you for completing the work!", time: "Yesterday" },
      { id: 2, sender: "me", text: "You're welcome! Happy to help.", time: "Yesterday" },
      { id: 3, sender: "them", text: "Great work! Payment has been sent.", time: "1 hour ago" }
    ],
    3: [
      { id: 1, sender: "them", text: "Hi, I need furniture assembly work done.", time: "5 hours ago" },
      { id: 2, sender: "me", text: "Sure! I can help. When do you need it done?", time: "4 hours ago" },
      { id: 3, sender: "them", text: "What's your availability for next week?", time: "5 hours ago" }
    ]
  });

  const currentConversation = conversations.find(c => c.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const newMsg = {
        id: currentMessages.length + 1,
        sender: "me",
        text: newMessage,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages({
        ...messages,
        [selectedChat]: [...currentMessages, newMsg]
      });

      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Sidebar />

      <main className="flex-1 flex flex-col p-10">
        <header className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8">
          MESSAGES
        </header>

        <div className="flex-1 flex bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-green-200" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-300 flex flex-col">
            <div className="p-4 border-b border-gray-300">
              <input
                type="text"
                placeholder="🔍 Search conversations..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-all ${
                    selectedChat === conv.id
                      ? "bg-green-50 border-l-4 border-l-green-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center font-bold text-white">
                          {conv.name.charAt(0)}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{conv.name}</h3>
                        <p className="text-xs text-gray-500">{conv.role}</p>
                      </div>
                    </div>
                    {conv.unread > 0 && (
                      <span className="bg-green-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">{conv.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-300 bg-green-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center font-bold text-white">
                      {currentConversation?.name.charAt(0)}
                    </div>
                    {currentConversation?.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{currentConversation?.name}</h3>
                    <p className="text-xs text-gray-500">
                      {currentConversation?.online ? "🟢 Online" : "⚫ Offline"}
                    </p>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50">
              {currentMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.sender === "me"
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                        : "bg-white border-2 border-gray-200 text-gray-800 shadow-sm"
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === "me" ? "text-green-100" : "text-gray-500"
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-300 bg-white">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg"
                >
                  Send 📤
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}