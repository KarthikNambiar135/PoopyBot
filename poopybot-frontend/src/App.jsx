import React, { useState, useEffect, useRef } from "react";

const PoopEmoji = () => (
  <div className="poop-emoji" aria-label="PoopyBot">
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

  //Clearing password when switching away from Karthik or back to Karthik
  useEffect(() => {
    setPassword("");
  }, [sender]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    //Always check password for Karthik(ME
    if (sender === "Karthik" && !password.trim()) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Karthik, you need to enter the password first! 💩" },
      ]);
      return;
    }

    const userMsg = input.trim();

    //Shows user message
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setTyping(true);

    try {
      const bodyData = { message: userMsg, sender };
      
      //Always send password for Karthik (even if empty, backend will handle it)
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
    <div className="app-container">
      <header>
        <h1>
          <PoopEmoji /> PoopyBot
        </h1>
      </header>

      <main className="chat-window">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message ${m.from === "bot" ? "bot-msg" : "user-msg"}`}
          >
            {m.from === "bot" && <PoopEmoji />}
            <div className="message-text">{m.text}</div>
          </div>
        ))}

        {typing && (
          <div className="message bot-msg typing-indicator">
            <PoopEmoji />
            <div className="message-text">PoopyBot is typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer>
        <select
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          style={{
            borderRadius: "25px",
            padding: "0.5rem 1rem",
            border: "2px solid #d5b73f",
            fontSize: "1rem",
            marginRight: "0.5rem",
            backgroundColor: "#fff8e1",
            color: "#5a3e1b",
          }}
        >
          <option value="User">User</option>
          <option value="Karthik">Karthik</option>
          <option value="Kaniha">Kaniha</option>
        </select>

        {sender === "Karthik" && (
          <input
            type="password"
            placeholder="Enter Karthik's password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flexGrow: 1,
              fontSize: "1.1rem",
              padding: "0.5rem 1rem",
              borderRadius: "25px",
              border: "2px solid #d5b73f",
              outline: "none",
              marginRight: "0.5rem",
            }}
          />
        )}

        <input
          type="text"
          placeholder="Ask PoopyBot..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flexGrow: sender === "Karthik" ? 0 : 1,
            fontSize: "1.1rem",
            padding: "0.5rem 1rem",
            borderRadius: "25px",
            border: "2px solid #d5b73f",
            outline: "none",
            marginRight: "0.5rem",
          }}
          disabled={sender === "Karthik" && !password.trim()}
        />
        <button onClick={sendMessage}>💩 Send</button>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root, .app-container {
          height: 100%;
          margin: 0;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          background: #fff8e1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #5a3e1b;
        }
        header {
          text-align: center;
          margin: 1rem 0;
          font-weight: bold;
          font-size: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }
        .poop-emoji {
          font-size: 2.5rem;
          animation: bounce 1s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .chat-window {
          width: 90vw;
          max-width: 600px;
          height: 60vh;
          background: #fceabb;
          border-radius: 12px;
          padding: 1rem;
          overflow-y: auto;
          box-shadow: 0 8px 12px rgb(240 198 78 / 0.5);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          max-width: 80%;
        }
        .bot-msg {
          flex-direction: row;
          background: #fde6b3;
          border: 2px solid #d5b73f;
          padding: 0.5rem 1rem;
          border-radius: 20px 20px 20px 0;
          color: #5a3e1b;
          align-self: flex-start;
        }
        .user-msg {
          flex-direction: row-reverse;
          background: #f3b266;
          border: 2px solid #bb7522;
          padding: 0.5rem 1rem;
          border-radius: 20px 20px 0 20px;
          color: #3a1f00;
          align-self: flex-end;
        }
        .message-text {
          white-space: pre-wrap;
          font-size: 1rem;
          line-height: 1.3;
          max-width: 400px;
        }
        footer {
          width: 90vw;
          max-width: 600px;
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        footer input, footer select {
          transition: border-color 0.3s ease;
        }
        footer input:focus, footer select:focus {
          border-color: #bb7522;
          outline: none;
        }
        footer button {
          background: #bb7522;
          border: none;
          border-radius: 25px;
          padding: 0 1.5rem;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        footer button:hover {
          background: #d5b73f;
        }
        .typing-indicator .poop-emoji {
          animation-duration: 0.5s;
        }
      `}</style>
    </div>
  );
}

export default App;
