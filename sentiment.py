"""
Sentiment analysis using VADER (NLTK).
Returns mood label: 'positive' | 'neutral' | 'negative'
and compound score between -1.0 and 1.0
"""

from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

# Download lexicon if not already present
try:
    nltk.data.find("sentiment/vader_lexicon.zip")
except LookupError:
    nltk.download("vader_lexicon", quiet=True)

_analyzer = SentimentIntensityAnalyzer()


def analyze_sentiment(text: str) -> tuple[str, float]:
    """
    Analyze the sentiment of a given text.

    Args:
        text: The user's input message.

    Returns:
        A tuple of (mood_label, compound_score)
        mood_label: 'positive', 'neutral', or 'negative'
        compound_score: float between -1.0 and +1.0
    """
    scores = _analyzer.polarity_scores(text)
    compound = scores["compound"]

    if compound >= 0.05:
        mood = "positive"
    elif compound <= -0.05:
        mood = "negative"
    else:
        mood = "neutral"

    return mood, compound


if __name__ == "__main__":
    # Quick test
    samples = [
        "I am so happy and excited today!",
        "I feel very anxious and stressed about my exams.",
        "Today is an okay day, nothing special.",
    ]
    for s in samples:
        mood, score = analyze_sentiment(s)
        print(f"[{mood:8s}] ({score:+.3f})  →  {s}")
