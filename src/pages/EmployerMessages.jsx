import { useState } from "react";
import { useTranslation } from 'react-i18next';
import SidebarEmployer from "../Components/SidebarEmployer";

export default function EmployerMessages() {
  const { t } = useTranslation();
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const [conversations] = useState([
    {
      id: 1,
      name: "Ramesh Kumar",
      role: "Plumber",
      lastMessage: "Yes sir, I can start tomorrow at 10 AM",
      time: "2 min ago",
      unread: 2,
      online: true,
      avatar: "R"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Electrician",
      lastMessage: "Thank you for the payment!",
      time: "1 hour ago",
      unread: 0,
      online: false,
      avatar: "P"
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Carpenter",
      lastMessage: "I'll bring my own tools",
      time: "5 hours ago",
      unread: 1,
      online: true,
      avatar: "A"
    },
    {
      id: 4,
      name: "Sneha Desai",
      role: "Painter",
      lastMessage: "Can you share the exact address?",
      time: "Yesterday",
      unread: 0,
      online: false,
      avatar: "S"
    }
  ]);

  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: "them", text: "Hello sir! I saw your job posting for plumbing work.", time: "10:30 AM" },
      { id: 2, sender: "me", text: "Hi Ramesh! Yes, I need kitchen sink repair. Are you available?", time: "10:32 AM" },
      { id: 3, sender: "them", text: "Yes, I'm available. I have 5 years of experience in plumbing.", time: "10:35 AM" },
      { id: 4, sender: "me", text: "Great! Can you come tomorrow at 10 AM?", time: "10:40 AM" },
      { id: 5, sender: "them", text: "Yes sir, I can start tomorrow at 10 AM", time: "10:45 AM" }
    ],
    2: [
      { id: 1, sender: "them", text: "I've completed the electrical wiring work.", time: "Yesterday" },
      { id: 2, sender: "me", text: "Excellent work! I've sent the payment.", time: "Yesterday" },
      { id: 3, sender: "them", text: "Thank you for the payment!", time: "1 hour ago" }
    ],
    3: [
      { id: 1, sender: "them", text: "I'm interested in the furniture assembly job.", time: "5 hours ago" },
      { id: 2, sender: "me", text: "Great! Do you have your own tools?", time: "4 hours ago" },
      { id: 3, sender: "them", text: "I'll bring my own tools", time: "5 hours ago" }
    ],
    4: [
      { id: 1, sender: "them", text: "I can do the painting work for your 3BHK.", time: "Yesterday" },
      { id: 2, sender: "me", text: "Perfect! When can you start?", time: "Yesterday" },
      { id: 3, sender: "them", text: "Can you share the exact address?", time: "Yesterday" }
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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <SidebarEmployer />

      <main className="flex-1 flex flex-col p-10">
        <header className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
          MESSAGES
        </header>

        <div className="flex-1 flex bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-blue-200" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-300 flex flex-col">
            <div className="p-4 border-b border-gray-300 bg-blue-50">
              <input
                type="text"
                placeholder="🔍 Search conversations..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-all ${
                    selectedChat === conv.id
                      ? "bg-blue-50 border-l-4 border-l-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                          {conv.avatar}
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
                      <span className="bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
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
            <div className="p-4 border-b border-gray-300 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                      {currentConversation?.avatar}
                    </div>
                    {currentConversation?.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{currentConversation?.name}</h3>
                    <p className="text-xs text-gray-500">
                      {currentConversation?.role} • {currentConversation?.online ? "🟢 Online" : "⚫ Offline"}
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
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      msg.sender === "me"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-white border-2 border-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === "me" ? "text-blue-100" : "text-gray-500"
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
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg"
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