import React, { useState, useEffect, useRef } from "react";

const PoopEmoji = ({ className = "" }) => (
  <div className={`text-4xl select-none ${className}`} aria-label="PoopyBot">
    💩
  </div>
);

function App() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm PoopyBot 💩! Ask me anything silly!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sender, setSender] = useState("User");
  const [password, setPassword] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    setPassword("");
  }, [sender]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    if (sender === "Karthik" && !password.trim()) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Karthik, you need to enter the password first! 💩" },
      ]);
      return;
    }

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setTyping(true);

    try {
      const bodyData = { message: userMsg, sender };
      
      if (sender === "Karthik") {
        bodyData.password = password;
      }

      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      const data = await res.json();

      setMessages((prev) => [...prev, { from: "bot", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Oops! PoopyBot tripped over a toilet paper roll... Try again?",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex flex-col items-center justify-center p-4 font-sans">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="text-center mb-6 z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <PoopEmoji className="animate-bounce hover:animate-spin transition-all duration-300" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            PoopyBot
          </h1>
        </div>
        <p className="text-amber-700 font-medium opacity-80">Your silly AI companion</p>
      </header>

      {/* Chat Window */}
      <main className="w-full max-w-2xl h-[60vh] bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-amber-200/50 p-6 overflow-hidden flex flex-col z-10 border border-amber-200/50">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 max-w-[85%] animate-fadeInUp ${
                m.from === "bot" ? "self-start" : "self-end flex-row-reverse"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {m.from === "bot" && (
                <PoopEmoji className="flex-shrink-0 animate-wiggle" />
              )}
              <div
                className={`px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 ${
                  m.from === "bot"
                    ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 rounded-tl-sm border-l-4 border-amber-400"
                    : "bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-tr-sm shadow-orange-200"
                }`}
              >
                <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {m.text}
                </div>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex items-start gap-3 max-w-[85%] self-start animate-fadeInUp">
              <PoopEmoji className="flex-shrink-0 animate-pulse" />
              <div className="px-4 py-3 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 rounded-2xl rounded-tl-sm border-l-4 border-amber-400 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm">PoopyBot is typing</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Footer */}
      <footer className="w-full max-w-2xl mt-6 z-10">
        <div className="flex flex-col sm:flex-row gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-amber-200/50 border border-amber-200/50">
          {/* Sender Selection */}
          <select
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-900 font-medium focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 hover:border-amber-400"
          >
            <option value="User">👤 User</option>
            <option value="Karthik">🔐 Karthik</option>
            <option value="Kaniha">👩 Kaniha</option>
          </select>

          {/* Password Input for Karthik */}
          {sender === "Karthik" && (
            <input
              type="password"
              placeholder="🔑 Enter Karthik's password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-900 placeholder-amber-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 hover:border-amber-400"
            />
          )}

          {/* Message Input */}
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="💬 Ask PoopyBot anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              disabled={sender === "Karthik" && !password.trim()}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-900 placeholder-amber-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            
            {/* Send Button */}
            <button
              onClick={sendMessage}
              disabled={!input.trim() || (sender === "Karthik" && !password.trim())}
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:from-orange-500 hover:to-amber-600 focus:ring-4 focus:ring-orange-200 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              💩 Send
            </button>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thumb-amber-300::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-amber-300::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thumb-amber-300::-webkit-scrollbar-thumb {
          background-color: #fcd34d;
          border-radius: 3px;
        }
        
        .scrollbar-thumb-amber-300::-webkit-scrollbar-thumb:hover {
          background-color: #f59e0b;
        }
      `}</style>
    </div>
  );
}

export default App;