const MOOD_COLORS = {
  positive: "#22c55e",
  neutral: "#f59e0b",
  negative: "#ef4444",
};

const MOOD_EMOJI = {
  positive: "😊",
  neutral: "😐",
  negative: "😔",
};

export default function MessageBubble({ message }) {
  const isBot = message.sender === "bot";

  return (
    <div className={`message-row ${isBot ? "bot-row" : "user-row"}`}>
      {isBot && <div className="avatar">🧠</div>}
      <div className={`bubble ${isBot ? "bot-bubble" : "user-bubble"}`}>
        <p>{message.text}</p>
        {isBot && message.mood && (
          <div className="mood-tag" style={{ color: MOOD_COLORS[message.mood] }}>
            {MOOD_EMOJI[message.mood]} Mood detected: {message.mood}
            {message.score !== undefined && (
              <span className="score"> ({message.score > 0 ? "+" : ""}{message.score})</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const DEFAULT_TIPS = [
  "🌬️ Try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s.",
  "📓 Write 3 things you are grateful for today.",
  "🚶 Take a short walk — even 5 minutes helps reset your mind.",
  "💧 Drink a glass of water and take 3 slow deep breaths.",
];

export default function RelaxationTips({ tips }) {
  const displayTips = tips.length > 0 ? tips : DEFAULT_TIPS;

  return (
    <div className="tips-panel">
      <h2>🌿 Relaxation Tips</h2>
      <p className="subtitle">
        {tips.length > 0
          ? "Tips personalised based on your mood:"
          : "General wellness tips for you:"}
      </p>
      <ul className="tips-list">
        {displayTips.map((tip, i) => (
          <li key={i} className="tip-item">{tip}</li>
        ))}
      </ul>

      <div className="breathing-box">
        <h3>🫁 Quick 4-7-8 Breathing</h3>
        <ol>
          <li>Inhale slowly through your nose for <strong>4 seconds</strong></li>
          <li>Hold your breath for <strong>7 seconds</strong></li>
          <li>Exhale completely through your mouth for <strong>8 seconds</strong></li>
          <li>Repeat 3–4 times</li>
        </ol>
      </div>
    </div>
  );
}
