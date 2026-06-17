"""
AI response generation using Anthropic Claude API.
Produces empathetic, mood-aware responses for students.
"""

import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """You are MindEase, a compassionate mental health companion chatbot designed specifically for students.

Your role:
- Listen actively and respond with empathy and warmth
- Validate the user's feelings without judgment
- Offer gentle encouragement and practical coping strategies
- Suggest professional help when signs of serious distress appear
- Keep responses concise (3–5 sentences) and conversational

Tone guidelines:
- Warm, supportive, non-clinical
- Never dismissive or minimizing
- Avoid generic advice — tailor to what the student shared
- If mood is NEGATIVE: prioritize validation first, then offer one small actionable tip
- If mood is NEUTRAL: be curious and engaging, invite them to share more
- If mood is POSITIVE: celebrate with them and reinforce positive habits

IMPORTANT: You are NOT a replacement for professional mental health care. 
If a student expresses thoughts of self-harm or suicide, 
immediately encourage them to contact a counselor or crisis helpline.
"""


def get_ai_response(user_message: str, mood: str) -> str:
    """
    Generate an empathetic AI response based on user message and detected mood.

    Args:
        user_message: The student's message
        mood: Detected mood ('positive', 'neutral', 'negative')

    Returns:
        AI-generated response string
    """
    mood_context = {
        "positive": "The student seems to be in a positive or happy mood.",
        "neutral": "The student's mood appears calm or neutral.",
        "negative": "The student seems stressed, anxious, sad, or upset. Prioritize empathy.",
    }

    augmented_message = (
        f"[Mood detected: {mood.upper()}] {mood_context[mood]}\n\n"
        f"Student message: {user_message}"
    )

    try:
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=300,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": augmented_message}],
        )
        return message.content[0].text

    except anthropic.APIConnectionError:
        return (
            "I'm having trouble connecting right now. "
            "Please try again in a moment — I'm here for you. 💙"
        )
    except anthropic.RateLimitError:
        return (
            "I'm a bit overwhelmed with requests right now. "
            "Give me a moment and try again. You matter!"
        )
    except Exception as e:
        return (
            "Something went wrong on my end. "
            "Please try again — I genuinely want to help. 🌿"
        )
