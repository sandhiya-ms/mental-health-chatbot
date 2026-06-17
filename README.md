# mental-health-chatbot
AI-powered mental health companion chatbot for students


Problem Statement:
Students face high levels of stress, anxiety, and loneliness but often hesitate to approach professional counselors. MindEase is a safe, AI-driven chatbot that:

*Detects user mood through sentiment analysis
*Generates empathetic, motivational responses
*Provides personalized relaxation tips
*Supports student mental well-being 24/7


🚀 Features:
Feature	Description
💬 AI Chat	Empathetic conversations powered by Claude AI
🎭 Mood Detection	Real-time sentiment analysis (positive / neutral / negative)
🌿 Relaxation Tips	Breathing exercises, mindfulness, journaling prompts
📊 Mood History	Visual chart of your emotional journey
🔒 Private & Safe	No login required, no data stored on servers
📱 Responsive UI	Works on mobile and desktop

🛠️ Tech Stack

Frontend  → React.js + TailwindCSS
Backend   → Python Flask + REST API
AI Model  → Anthropic Claude API (claude-sonnet-4-6)
Sentiment → VADER (NLTK) + TextBlob
Charts    → Recharts
Deploy    → Vercel (Frontend) + Render (Backend)

📁 Project Structure

mental-health-chatbot/
├── frontend/                  # React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx            # Root component
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── MoodTracker.jsx
│   │   │   └── RelaxationTips.jsx
│   │   ├── utils/
│   │   │   └── api.js         # API calls
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
├── backend/                   # Flask API
│   ├── app.py                 # Main Flask app
│   ├── sentiment.py           # Mood detection logic
│   ├── chatbot.py             # Claude API integration
│   ├── tips.py                # Relaxation tips database
│   ├── requirements.txt
│   └── .env.example

⚙️ Installation & Setup
Prerequisites
Python 3.10+
Node.js 18+

