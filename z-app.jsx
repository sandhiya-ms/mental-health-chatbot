import { useState, useEffect, useRef } from "react";
import { sendMessage } from "./utils/api";
import MessageBubble from "./components/MessageBubble";
import MoodTracker from "./components/MoodTracker";
import RelaxationTips from "./components/RelaxationTips";

const WELCOME_MSG = {
  id: 0,
  sender: "bot",
  text: "Hi there 💙 I'm MindEase, your mental health companion. How are you feeling today? You can talk to me about anything — I'm here to listen.",
  mood: null,
};

export default function App() {
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [currentTips, setCurrentTips] = useState([]);
  const [activeTab, setActiveTab] = useState("chat");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendMessage(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.response,
        mood: data.mood,
        score: data.sentiment_score,
      };
      setMessages((prev) => [...prev, botMsg]);
      setMoodHistory((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), mood: data.mood, score: data.sentiment_score },
      ]);
      setCurrentTips(data.tips || []);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: "⚠️ Something went wrong. Please try again.", mood: null },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <span className="logo">🧠 MindEase</span>
          <span className="tagline">Your safe space to talk</span>
        </div>
      </header>

      {/* Tabs */}
      <nav className="tabs">
        {["chat", "mood", "tips"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "chat" ? "💬 Chat" : tab === "mood" ? "📊 Mood" : "🌿 Tips"}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <main className="main">
        {activeTab === "chat" && (
          <div className="chat-panel">
            <div className="messages">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {loading && (
                <div className="typing-indicator">
                  <span /><span /><span />
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="input-bar">
              <textarea
                className="chat-input"
                rows={2}
                placeholder="Share what's on your mind..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <button className="send-btn" onClick={handleSend} disabled={loading || !input.trim()}>
                {loading ? "…" : "Send"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "mood" && <MoodTracker history={moodHistory} />}
        {activeTab === "tips" && <RelaxationTips tips={currentTips} />}
      </main>

      {/* Footer */}
      <footer className="footer">
        ⚠️ Not a substitute for professional care. Crisis helpline: <strong>iCall 9152987821</strong>
      </footer>
    </div>
  );
}
