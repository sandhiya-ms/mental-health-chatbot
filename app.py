from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from sentiment import analyze_sentiment
from chatbot import get_ai_response
from tips import get_relaxation_tips

load_dotenv()

app = Flask(__name__)
CORS(app)

# ── Health Check ──────────────────────────────────────────
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "MindEase API is running"})


# ── Main Chat Endpoint ────────────────────────────────────
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    if not data or "message" not in data:
        return jsonify({"error": "Message is required"}), 400

    user_message = data["message"].strip()
    if not user_message:
        return jsonify({"error": "Message cannot be empty"}), 400

    # 1. Analyze sentiment
    mood, score = analyze_sentiment(user_message)

    # 2. Get AI response
    ai_response = get_ai_response(user_message, mood)

    # 3. Get tips based on mood
    tips = get_relaxation_tips(mood)

    return jsonify({
        "response": ai_response,
        "mood": mood,
        "sentiment_score": round(score, 3),
        "tips": tips
    })


# ── Tips Endpoint ─────────────────────────────────────────
@app.route("/api/tips/<mood>", methods=["GET"])
def tips(mood):
    valid_moods = ["positive", "neutral", "negative"]
    if mood not in valid_moods:
        return jsonify({"error": f"Mood must be one of {valid_moods}"}), 400
    return jsonify({"mood": mood, "tips": get_relaxation_tips(mood)})


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=os.getenv("FLASK_ENV") == "development", port=port)
